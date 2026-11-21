import { Attachment, Drawing, Point } from './model';
import {
  EPS,
  FlatEntity,
  add,
  angle,
  boundsOf,
  distance,
  dot,
  flatBounds,
  flatPoints,
  flatten,
  insertMatrix,
  intersect,
  inverse,
  lineCurveIntersections,
  mul,
  onArc,
  overlaps,
  polar,
  sub,
  transform,
} from './geometry';

export type SnapKind =
  | 'Endpoint'
  | 'Midpoint'
  | 'Center'
  | 'Quadrant'
  | 'Intersection'
  | 'Port'
  | 'Extension'
  | 'Perpendicular'
  | 'Tracking'
  | 'Grid';

export interface Snap {
  point: Point;
  kind: SnapKind;
  owner?: string;
  attachment?: Attachment;
}

export interface AlignmentGuide {
  axis: 'x' | 'y';
  from: Point;
  to: Point;
}

export interface SnapOptions {
  excludeOwners?: Set<string>;
  basePoint?: Point;
  enableExtension?: boolean;
  enableTracking?: boolean;
  gridStep?: number;
}

export interface SnapResult {
  snap?: Snap;
  guides: AlignmentGuide[];
}

interface Segment {
  a: Point;
  b: Point;
  owner: string;
  bounds: ReturnType<typeof boundsOf>;
}

export class SnapIndex {
  private candidates: Snap[] = [];
  private segments: Segment[] = [];
  private curves: FlatEntity[] = [];
  private alignAnchors: { point: Point; owner: string }[] = [];

  rebuild(d: Drawing): void {
    this.candidates = [];
    this.segments = [];
    this.curves = [];
    this.alignAnchors = [];
    const push = (p: Point, kind: SnapKind, f: FlatEntity, anchor = false): void => {
      const pt = transform(p, f.matrix);
      this.candidates.push({ point: pt, kind, owner: f.owner });
      if (anchor) this.alignAnchors.push({ point: pt, owner: f.owner });
    };
    for (const f of flatten(d)) {
      const e = f.entity;
      if (e.type === 'text') continue;
      if (e.type === 'circle' || e.type === 'arc') {
        this.curves.push(f);
        push(e.center, 'Center', f, true);
        if (e.type === 'circle') {
          for (const deg of [0, 90, 180, 270]) {
            push(polar(e.center, e.radius, deg), 'Quadrant', f);
          }
        }
        if (e.type === 'arc') {
          push(polar(e.center, e.radius, e.start), 'Endpoint', f, true);
          push(polar(e.center, e.radius, e.end), 'Endpoint', f, true);
        }
        continue;
      }
      const ps = flatPoints(f);
      ps.forEach((point) => {
        this.candidates.push({ point, kind: 'Endpoint', owner: f.owner });
        this.alignAnchors.push({ point, owner: f.owner });
      });
      ps.slice(1).forEach((b, i) => {
        const a = ps[i];
        this.candidates.push({ point: mul(add(a, b), 0.5), kind: 'Midpoint', owner: f.owner });
        this.segments.push({ a, b, owner: f.owner, bounds: boundsOf([a, b]) });
      });
    }
    for (const e of d.entities) {
      if (e.type === 'insert' && d.layers.find((l) => l.id === e.layer)?.visible) {
        const b = d.blocks.find((b) => b.id === e.block);
        this.alignAnchors.push({ point: e.position, owner: e.id });
        this.candidates.push({ point: e.position, kind: 'Center', owner: e.id });
        for (const p of b?.ports ?? []) {
          const pt = transform(p.point, insertMatrix(e));
          this.candidates.push({
            point: pt,
            kind: 'Port',
            owner: e.id,
            attachment: { insertId: e.id, portId: p.id },
          });
          this.alignAnchors.push({ point: pt, owner: e.id });
        }
      }
    }
  }

  /** Legacy compatibility wrapper returning only the winning OSNAP. */
  find(p: Point, tolerance: number, options: SnapOptions = {}): Snap | undefined {
    return this.findWithGuides(p, tolerance, {
      enableExtension: false,
      enableTracking: false,
      ...options,
    }).snap;
  }

  /**
   * Resolves OSNAP, Snap Extension, Perpendicular, and Object Alignment Tracking Guides.
   * Excludes any entities currently being moved/dragged (`excludeOwners`) so objects never snap to themselves.
   */
  findWithGuides(p: Point, tolerance: number, options: SnapOptions = {}): SnapResult {
    const excluded = options.excludeOwners;
    const allowed = (owner?: string): boolean => !excluded || !owner || !excluded.has(owner);

    const near = this.candidates.filter(
      (s) => allowed(s.owner) && distance(s.point, p) <= tolerance,
    );
    const box = {
      minX: p.x - tolerance,
      minY: p.y - tolerance,
      maxX: p.x + tolerance,
      maxY: p.y + tolerance,
    };
    const push = (q: Point, kind: SnapKind = 'Intersection'): void => {
      if (distance(p, q) <= tolerance) near.push({ point: q, kind });
    };

    const lines = this.segments.filter((s) => allowed(s.owner) && overlaps(s.bounds, box));
    const curves = this.curves.filter((f) => allowed(f.owner) && overlaps(flatBounds(f), box));

    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        const a = lines[i],
          b = lines[j],
          q = intersect(a.a, a.b, b.a, b.b);
        if (q) push(q, 'Intersection');
      }
    }
    for (const f of curves) {
      for (const l of lines) lineCurveIntersections(l.a, l.b, f).forEach((q) => push(q));
    }

    const accepts = (f: FlatEntity, q: Point): boolean => {
      const e = f.entity;
      return (
        e.type === 'circle' ||
        (e.type === 'arc' &&
          onArc(angle(e.center, transform(q, inverse(f.matrix))), e.start, e.end))
      );
    };
    const circles = curves.flatMap((f) => {
      const e = f.entity;
      if (e.type !== 'circle' && e.type !== 'arc') return [];
      const m = f.matrix,
        sx = Math.hypot(m.a, m.b),
        sy = Math.hypot(m.c, m.d);
      if (Math.abs(sx - sy) > 1e-7 || Math.abs(m.a * m.c + m.b * m.d) > 1e-7) return [];
      return [{ f, center: transform(e.center, m), r: e.radius * sx }];
    });
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        const a = circles[i],
          b = circles[j],
          d = distance(a.center, b.center);
        if (d < 1e-8 || d > a.r + b.r + 1e-8 || d < Math.abs(a.r - b.r) - 1e-8) continue;
        const x = (a.r * a.r - b.r * b.r + d * d) / (2 * d),
          h = Math.sqrt(Math.max(0, a.r * a.r - x * x)),
          dx = (b.center.x - a.center.x) / d,
          dy = (b.center.y - a.center.y) / d,
          base = { x: a.center.x + x * dx, y: a.center.y + x * dy };
        for (const sign of [-1, 1]) {
          const q = { x: base.x - sign * h * dy, y: base.y + sign * h * dx };
          if (accepts(a.f, q) && accepts(b.f, q)) push(q, 'Intersection');
        }
      }
    }

    // Perpendicular snap from basePoint onto nearby segments (avoid pulling off-grid when gridStep is enforced)
    if (options.basePoint) {
      const bp = options.basePoint;
      const perpTol = options.gridStep ? Math.min(tolerance, options.gridStep * 0.25) : tolerance;
      for (const s of lines) {
        const v = sub(s.b, s.a),
          vv = dot(v, v);
        if (vv < EPS) continue;
        const t = dot(sub(bp, s.a), v) / vv;
        if (t >= 0 && t <= 1) {
          const foot = add(s.a, mul(v, t));
          const footOnGrid =
            !options.gridStep ||
            (Math.abs(foot.x - Math.round(foot.x / options.gridStep) * options.gridStep) < 1e-4 &&
              Math.abs(foot.y - Math.round(foot.y / options.gridStep) * options.gridStep) < 1e-4);
          if (distance(foot, p) <= (footOnGrid ? tolerance : perpTol) && distance(bp, foot) > EPS) {
            near.push({ point: foot, kind: 'Perpendicular', owner: s.owner });
          }
        }
      }
    }

    // Snap Extension: collinear ray projection beyond endpoints of segments
    const guides: AlignmentGuide[] = [];
    if (options.enableExtension !== false && near.length === 0) {
      let bestExtDist = tolerance;
      let bestExt: { point: Point; from: Point; owner: string } | undefined;
      for (const s of this.segments) {
        if (!allowed(s.owner)) continue;
        const v = sub(s.b, s.a),
          len = Math.hypot(v.x, v.y);
        if (len < EPS) continue;
        const u = { x: v.x / len, y: v.y / len };
        const proj = dot(sub(p, s.a), u);
        if (proj >= 0 && proj <= len) continue; // Inside segment, not an extension
        const foot = add(s.a, mul(u, proj));
        const perpDist = distance(p, foot);
        const footOnGrid =
          !options.gridStep ||
          (Math.abs(foot.x - Math.round(foot.x / options.gridStep) * options.gridStep) < 1e-4 &&
            Math.abs(foot.y - Math.round(foot.y / options.gridStep) * options.gridStep) < 1e-4);
        if (!footOnGrid) continue;
        if (perpDist <= bestExtDist && Math.abs(proj) < len + 10000) {
          const origin = proj < 0 ? s.a : s.b;
          if (distance(origin, foot) > tolerance * 0.5) {
            bestExtDist = perpDist;
            bestExt = { point: foot, from: origin, owner: s.owner };
          }
        }
      }
      if (bestExt) {
        near.push({ point: bestExt.point, kind: 'Extension', owner: bestExt.owner });
        guides.push({ axis: 'x', from: bestExt.from, to: bestExt.point });
      }
    }

    const priority: Record<SnapKind, number> = {
      Port: 0,
      Endpoint: 1,
      Intersection: 2,
      Midpoint: 3,
      Center: 4,
      Quadrant: 5,
      Perpendicular: 6,
      Extension: 7,
      Tracking: 8,
      Grid: 9,
    };

    const isPointOnGrid = (pt: Point): boolean =>
      !options.gridStep ||
      (Math.abs(pt.x - Math.round(pt.x / options.gridStep) * options.gridStep) < 1e-4 &&
        Math.abs(pt.y - Math.round(pt.y / options.gridStep) * options.gridStep) < 1e-4);

    const eligibleNear = options.gridStep
      ? near.filter((s) => {
          if (s.kind === 'Port' || isPointOnGrid(s.point)) return true;
          return (
            (s.kind === 'Endpoint' || s.kind === 'Center' || s.kind === 'Intersection') &&
            distance(s.point, p) <= Math.min(options.gridStep! * 0.25, tolerance * 0.25)
          );
        })
      : near;

    const bestOsnap = eligibleNear.sort((a, b) => {
      if (a.kind === 'Port' && b.kind !== 'Port') return -1;
      if (b.kind === 'Port' && a.kind !== 'Port') return 1;
      const delta = distance(a.point, p) - distance(b.point, p);
      return Math.abs(delta) < 1e-7 ? priority[a.kind] - priority[b.kind] : delta;
    })[0];

    if (bestOsnap) {
      return { snap: bestOsnap, guides };
    }

    // Object Alignment Tracking (Smart Guides X / Y relative to existing objects)
    if (options.enableTracking !== false) {
      const trackTol = tolerance * 0.75;
      const isOnGrid = (v: number): boolean =>
        !options.gridStep ||
        Math.abs(v - Math.round(v / options.gridStep) * options.gridStep) < 1e-4;
      let bestX: { anchor: Point; dx: number } | undefined;
      let bestY: { anchor: Point; dy: number } | undefined;

      for (const anchor of this.alignAnchors) {
        if (!allowed(anchor.owner)) continue;
        const dx = Math.abs(anchor.point.x - p.x),
          dy = Math.abs(anchor.point.y - p.y);
        if (dx <= trackTol && isOnGrid(anchor.point.x) && (!bestX || dx < bestX.dx)) {
          bestX = { anchor: anchor.point, dx };
        }
        if (dy <= trackTol && isOnGrid(anchor.point.y) && (!bestY || dy < bestY.dy)) {
          bestY = { anchor: anchor.point, dy };
        }
      }

      if (bestX || bestY) {
        let snappedX = bestX ? bestX.anchor.x : p.x;
        let snappedY = bestY ? bestY.anchor.y : p.y;
        // If only one axis is aligned and gridSnap is active, snap the free axis cleanly to the grid
        if (options.gridStep) {
          if (!bestX) snappedX = Math.round(snappedX / options.gridStep) * options.gridStep;
          if (!bestY) snappedY = Math.round(snappedY / options.gridStep) * options.gridStep;
        }
        const snappedPoint = { x: snappedX, y: snappedY };
        if (bestX) guides.push({ axis: 'y', from: bestX.anchor, to: snappedPoint });
        if (bestY) guides.push({ axis: 'x', from: bestY.anchor, to: snappedPoint });
        return {
          snap: { point: snappedPoint, kind: 'Tracking' },
          guides,
        };
      }
    }

    return { snap: undefined, guides };
  }
}
