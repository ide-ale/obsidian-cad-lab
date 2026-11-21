import {
  Arc,
  Attachment,
  DimensionEntity,
  Drawing,
  Entity,
  Insert,
  Line,
  LineArrows,
  Point,
  Polyline,
  Wire,
  clone,
  isEditable,
  uid,
} from './model';
export const EPS = 1e-8;
export const add = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
export const sub = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});
export const mul = (a: Point, s: number): Point => ({ x: a.x * s, y: a.y * s });
export const dot = (a: Point, b: Point): number => a.x * b.x + a.y * b.y;
export const cross = (a: Point, b: Point): number => a.x * b.y - a.y * b.x;
export const distance = (a: Point, b: Point): number => Math.hypot(a.x - b.x, a.y - b.y);
export const angle = (a: Point, b: Point): number =>
  (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
export const polar = (p: Point, r: number, deg: number): Point =>
  add(p, {
    x: r * Math.cos((deg * Math.PI) / 180),
    y: r * Math.sin((deg * Math.PI) / 180),
  });
export const normAngle = (a: number): number => ((a % 360) + 360) % 360;
export const onArc = (a: number, start: number, end: number): boolean =>
  normAngle(a - start) <= normAngle(end - start) + EPS;
export const ortho = (a: Point, b: Point): Point =>
  Math.abs(b.x - a.x) >= Math.abs(b.y - a.y) ? { x: b.x, y: a.y } : { x: a.x, y: b.y };
export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}
export const identity = (): Matrix => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
export const transform = (p: Point, m: Matrix): Point => ({
  x: m.a * p.x + m.c * p.y + m.e,
  y: m.b * p.x + m.d * p.y + m.f,
});
export function compose(m: Matrix, n: Matrix): Matrix {
  return {
    a: m.a * n.a + m.c * n.b,
    b: m.b * n.a + m.d * n.b,
    c: m.a * n.c + m.c * n.d,
    d: m.b * n.c + m.d * n.d,
    e: m.a * n.e + m.c * n.f + m.e,
    f: m.b * n.e + m.d * n.f + m.f,
  };
}
export function insertMatrix(i: Insert): Matrix {
  const a = (i.rotation * Math.PI) / 180,
    c = Math.cos(a),
    s = Math.sin(a);
  return {
    a: c * i.scale.x,
    b: s * i.scale.x,
    c: -s * i.scale.y,
    d: c * i.scale.y,
    e: i.position.x,
    f: i.position.y,
  };
}
export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}
export const boundsOf = (points: Point[]): Bounds =>
  points.reduce(
    (b, p) => ({
      minX: Math.min(b.minX, p.x),
      minY: Math.min(b.minY, p.y),
      maxX: Math.max(b.maxX, p.x),
      maxY: Math.max(b.maxY, p.y),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  );
export const overlaps = (a: Bounds, b: Bounds): boolean =>
  a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
export const contains = (a: Bounds, p: Point): boolean =>
  p.x >= a.minX - EPS && p.x <= a.maxX + EPS && p.y >= a.minY - EPS && p.y <= a.maxY + EPS;
export function intersect(
  a: Point,
  b: Point,
  c: Point,
  d: Point,
  segmentA = true,
  segmentB = true,
): Point | undefined {
  const r = sub(b, a),
    s = sub(d, c),
    den = cross(r, s);
  if (Math.abs(den) < EPS) return;
  const t = cross(sub(c, a), s) / den,
    u = cross(sub(c, a), r) / den;
  if ((segmentA && (t < -EPS || t > 1 + EPS)) || (segmentB && (u < -EPS || u > 1 + EPS))) return;
  return add(a, mul(r, t));
}
export function segmentDistance(p: Point, a: Point, b: Point): number {
  const d = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), d) / (dot(d, d) || 1)));
  return distance(p, add(a, mul(d, t)));
}

/** Computes the formatted millimeter value of a DimensionEntity. */
export function dimensionLabel(e: DimensionEntity): string {
  if (e.text && e.text.trim()) return e.text.trim();
  const val =
    e.kind === 'horizontal'
      ? Math.abs(e.b.x - e.a.x)
      : e.kind === 'vertical'
        ? Math.abs(e.b.y - e.a.y)
        : distance(e.a, e.b);
  const formatted = Number(val.toFixed(2));
  if (e.kind === 'diameter') return `Ø${formatted} mm`;
  if (e.kind === 'radius') return `R${formatted} mm`;
  return `${formatted} mm`;
}

/** Expands a DimensionEntity into pure primitive entities (extension lines, dimension line, arrows, label). */
export function expandDimension(e: DimensionEntity): Exclude<Entity, Insert | DimensionEntity>[] {
  const offset = e.offset ?? 8,
    sign = offset >= 0 ? 1 : -1;
  let da: Point, db: Point;
  if (e.kind === 'horizontal') {
    const refY = (sign >= 0 ? Math.max(e.a.y, e.b.y) : Math.min(e.a.y, e.b.y)) + offset;
    da = { x: e.a.x, y: refY };
    db = { x: e.b.x, y: refY };
  } else if (e.kind === 'vertical') {
    const refX = (sign >= 0 ? Math.max(e.a.x, e.b.x) : Math.min(e.a.x, e.b.x)) + offset;
    da = { x: refX, y: e.a.y };
    db = { x: refX, y: e.b.y };
  } else {
    const len = distance(e.a, e.b),
      nx = len > EPS ? -(e.b.y - e.a.y) / len : 0,
      ny = len > EPS ? (e.b.x - e.a.x) / len : 1;
    da = { x: e.a.x + nx * offset, y: e.a.y + ny * offset };
    db = { x: e.b.x + nx * offset, y: e.b.y + ny * offset };
  }
  const span = distance(da, db),
    ux = span > EPS ? (db.x - da.x) / span : 1,
    uy = span > EPS ? (db.y - da.y) / span : 0,
    nx = -uy,
    ny = ux,
    extOver = 1.5 * sign,
    arrowLen = Math.min(2.5, Math.max(0.8, span * 0.18)),
    arrowW = arrowLen * 0.38;
  const label = dimensionLabel(e),
    textH = 2.6;
  let rot = (Math.atan2(uy, ux) * 180) / Math.PI;
  let upX = nx,
    upY = ny;
  if (rot > 90 || rot <= -90) {
    rot = normAngle(rot + 180);
    if (rot > 180) rot -= 360;
    upX = -nx;
    upY = -ny;
  }
  const mid = { x: (da.x + db.x) / 2, y: (da.y + db.y) / 2 },
    halfTextW = (label.length * textH * 0.6) / 2,
    rad = (rot * Math.PI) / 180,
    textPos = {
      x: mid.x - Math.cos(rad) * halfTextW + upX * 1.1,
      y: mid.y - Math.sin(rad) * halfTextW + upY * 1.1,
    };
  const base = { layer: e.layer, color: e.color, lineType: e.lineType };
  return [
    {
      ...base,
      id: `${e.id}:ext-a`,
      type: 'line',
      a: e.a,
      b: { x: da.x + nx * extOver, y: da.y + ny * extOver },
    },
    {
      ...base,
      id: `${e.id}:ext-b`,
      type: 'line',
      a: e.b,
      b: { x: db.x + nx * extOver, y: db.y + ny * extOver },
    },
    {
      ...base,
      id: `${e.id}:dim-line`,
      type: 'line',
      a: da,
      b: db,
    },
    {
      ...base,
      id: `${e.id}:arr-a`,
      type: 'polyline',
      closed: true,
      points: [
        da,
        {
          x: da.x + ux * arrowLen + nx * arrowW,
          y: da.y + uy * arrowLen + ny * arrowW,
        },
        {
          x: da.x + ux * arrowLen - nx * arrowW,
          y: da.y + uy * arrowLen - ny * arrowW,
        },
      ],
    },
    {
      ...base,
      id: `${e.id}:arr-b`,
      type: 'polyline',
      closed: true,
      points: [
        db,
        {
          x: db.x - ux * arrowLen + nx * arrowW,
          y: db.y - uy * arrowLen + ny * arrowW,
        },
        {
          x: db.x - ux * arrowLen - nx * arrowW,
          y: db.y - uy * arrowLen - ny * arrowW,
        },
      ],
    },
    {
      ...base,
      id: `${e.id}:label`,
      type: 'text',
      position: textPos,
      text: label,
      height: textH,
      rotation: rot,
    },
  ];
}

export function pathPoints(e: Entity): Point[] {
  if (e.type === 'line') return [e.a, e.b];
  if (e.type === 'dimension') return [e.a, e.b];
  if (e.type === 'polyline' || e.type === 'wire')
    return e.type === 'polyline' && e.closed ? [...e.points, e.points[0]] : e.points;
  if (e.type === 'circle' || e.type === 'arc') {
    const start = e.type === 'circle' ? 0 : e.start,
      sweep = e.type === 'circle' ? 360 : normAngle(e.end - e.start);
    const n = Math.max(8, Math.ceil(sweep / 3));
    return Array.from({ length: n + 1 }, (_, i) =>
      polar(e.center, e.radius, start + (sweep * i) / n),
    );
  }
  if (e.type === 'text') {
    const w = Array.from(e.text).length * e.height * 0.65,
      p = e.position;
    return [
      p,
      polar(p, w, e.rotation),
      polar(p, e.height, e.rotation + 90),
      add(polar(p, w, e.rotation), sub(polar(p, e.height, e.rotation + 90), p)),
    ];
  }
  return [e.position];
}
export interface FlatEntity {
  entity: Exclude<Entity, Insert | DimensionEntity>;
  matrix: Matrix;
  owner: string;
  layer: string;
  color?: number;
  lineType?: Entity['lineType'];
  linePattern?: number[];
}
export function flatten(
  d: Drawing,
  entities = d.entities,
  matrix = identity(),
  owner = '',
  inheritedLayer = '0',
  depth = 0,
  inheritedColor?: number,
  inheritedType?: Entity['lineType'],
  inheritedPattern?: number[],
): FlatEntity[] {
  if (depth > 32) return [];
  const result: FlatEntity[] = [];
  for (const e of entities) {
    const layer = e.layer === '0' && owner ? inheritedLayer : e.layer;
    if (d.layers.find((l) => l.id === layer)?.visible === false) continue;
    const color = e.color === 0 ? inheritedColor : e.color;
    const lineType = e.lineType ?? inheritedType;
    const linePattern = e.linePattern ?? inheritedPattern;
    if (e.type === 'dimension') {
      for (const part of expandDimension(e)) {
        result.push({
          entity: part,
          matrix,
          owner: owner || e.id,
          layer,
          color,
          lineType,
          linePattern,
        });
      }
      continue;
    }
    if (e.type !== 'insert') {
      result.push({
        entity: e,
        matrix,
        owner: owner || e.id,
        layer,
        color,
        lineType,
        linePattern,
      });
      continue;
    }
    const b = d.blocks.find((b) => b.id === e.block);
    if (!b) continue;
    const m = compose(matrix, insertMatrix(e));
    const blockFlats = flatten(
      d,
      b.entities,
      m,
      owner || e.id,
      layer,
      depth + 1,
      color ?? d.layers.find((l) => l.id === layer)?.color,
      lineType,
      linePattern,
    );
    result.push(...blockFlats);

    const visibleAttrs = Object.entries(e.attributes).filter(
      ([key, v]) => v && !['NOTES', 'NOTE', 'MANUFACTURER', 'PART_NUMBER'].includes(key),
    );
    if (visibleAttrs.length) {
      const ps = d.projectSettings;
      const ls = e.labelStyle ?? {};
      const baseH =
        ls.textHeight && ls.textHeight > 0
          ? ls.textHeight
          : ps?.defaultTextHeight && ps.defaultTextHeight > 0
            ? ps.defaultTextHeight
            : 3;
      const useScaleWithBlock = ls.scaleWithBlock ?? ps?.defaultLabelScaleWithBlock ?? false;
      const scaleFactor = useScaleWithBlock ? Math.hypot(m.a, m.b) || 1 : 1;
      const textH = baseH * scaleFactor;
      const lineSpacing = textH * 1.35;
      const orient =
        ls.rotateWithBlock !== undefined
          ? ls.rotateWithBlock
            ? 'follow'
            : ls.textRotation !== undefined
              ? 'custom'
              : 'horizontal'
          : ls.textRotation !== undefined
            ? 'custom'
            : (ps?.defaultLabelOrientation ?? 'horizontal');
      let textRot =
        orient === 'follow'
          ? (Math.atan2(m.b, m.a) * 180) / Math.PI
          : orient === 'custom'
            ? (ls.textRotation ?? 0)
            : orient === 'vertical'
              ? 90
              : 0;
      // Keep text upright/readable (never upside-down) unless user explicitly set an exact custom angle
      if (ls.textRotation === undefined && orient === 'follow') {
        textRot = ((textRot % 360) + 360) % 360;
        if (textRot > 90 && textRot <= 270) textRot -= 180;
        if (textRot > 270) textRot -= 360;
      }

      const worldOrigin = transform({ x: 0, y: 0 }, m);
      const blockBox = blockFlats.length
        ? unionBounds(blockFlats.map(flatBounds))
        : {
            minX: worldOrigin.x - 6,
            minY: worldOrigin.y - 6,
            maxX: worldOrigin.x + 6,
            maxY: worldOrigin.y + 6,
          };
      const anchor = ls.anchor ?? ps?.defaultLabelAnchor ?? 'default';
      const count = visibleAttrs.length;
      const totalH = (count - 1) * lineSpacing;
      const cx = (blockBox.minX + blockBox.maxX) / 2;
      const cy = (blockBox.minY + blockBox.maxY) / 2;

      visibleAttrs.forEach(([key, value], n) => {
        const estW = Array.from(value).length * textH * 0.6;
        let x = blockBox.maxX + 1.5;
        let y = blockBox.maxY - textH - n * lineSpacing;
        switch (anchor) {
          case 'center':
            x = cx - estW / 2;
            y = cy + totalH / 2 - textH * 0.35 - n * lineSpacing;
            break;
          case 'top':
            x = cx - estW / 2;
            y = blockBox.maxY + 1.8 + (count - 1 - n) * lineSpacing;
            break;
          case 'bottom':
            x = cx - estW / 2;
            y = blockBox.minY - textH - 1.8 - n * lineSpacing;
            break;
          case 'left':
            x = blockBox.minX - estW - 2;
            y = cy + totalH / 2 - textH * 0.35 - n * lineSpacing;
            break;
          case 'right':
            x = blockBox.maxX + 2;
            y = cy + totalH / 2 - textH * 0.35 - n * lineSpacing;
            break;
          case 'top-left':
            x = blockBox.minX - estW - 1.5;
            y = blockBox.maxY + 1.5 + (count - 1 - n) * lineSpacing;
            break;
          case 'top-right':
            x = blockBox.maxX + 1.5;
            y = blockBox.maxY + 1.5 + (count - 1 - n) * lineSpacing;
            break;
          case 'bottom-left':
            x = blockBox.minX - estW - 1.5;
            y = blockBox.minY - textH - 1.5 - n * lineSpacing;
            break;
          case 'bottom-right':
            x = blockBox.maxX + 1.5;
            y = blockBox.minY - textH - 1.5 - n * lineSpacing;
            break;
          default:
            x = blockBox.maxX + 1.5;
            y = Math.max(cy + totalH / 2 - textH * 0.35, blockBox.maxY - textH) - n * lineSpacing;
            break;
        }
        const dx = ls.textOffset?.x ?? 0;
        const dy = ls.textOffset?.y ?? 0;
        result.push({
          entity: {
            id: `${e.id}:${key}`,
            type: 'text',
            layer,
            position: { x: x + dx, y: y + dy },
            text: value,
            height: textH,
            rotation: textRot,
          },
          matrix: identity(),
          owner: owner || e.id,
          layer,
          color,
          lineType,
        });
      });
    }
  }
  return result;
}
export const flatPoints = (f: FlatEntity): Point[] =>
  pathPoints(f.entity).map((p) => transform(p, f.matrix));
export function inverse(m: Matrix): Matrix {
  const det = m.a * m.d - m.b * m.c;
  if (Math.abs(det) < 1e-20) throw new Error('Singular transform');
  return {
    a: m.d / det,
    b: -m.b / det,
    c: -m.c / det,
    d: m.a / det,
    e: (m.c * m.f - m.d * m.e) / det,
    f: (m.b * m.e - m.a * m.f) / det,
  };
}
export function flatBounds(f: FlatEntity): Bounds {
  const e = f.entity,
    m = f.matrix;
  if (e.type !== 'circle' && e.type !== 'arc') return boundsOf(flatPoints(f));
  const angles = [(Math.atan2(m.c, m.a) * 180) / Math.PI, (Math.atan2(m.d, m.b) * 180) / Math.PI];
  angles.push(angles[0] + 180, angles[1] + 180);
  const extrema = angles.filter((a) => e.type === 'circle' || onArc(a, e.start, e.end));
  if (e.type === 'arc') extrema.push(e.start, e.end);
  return boundsOf(extrema.map((a) => transform(polar(e.center, e.radius, a), m)));
}
export function lineCurveIntersections(a: Point, b: Point, f: FlatEntity): Point[] {
  const e = f.entity;
  if (e.type !== 'circle' && e.type !== 'arc') return [];
  const inv = inverse(f.matrix),
    p = transform(a, inv),
    q = transform(b, inv),
    v = sub(q, p),
    delta = sub(p, e.center),
    A = dot(v, v),
    B = 2 * dot(delta, v),
    C = dot(delta, delta) - e.radius * e.radius,
    disc = B * B - 4 * A * C;
  if (A < EPS * EPS || disc < -EPS) return [];
  const ts = [
    (-B - Math.sqrt(Math.max(0, disc))) / (2 * A),
    (-B + Math.sqrt(Math.max(0, disc))) / (2 * A),
  ];
  return ts
    .filter((t) => t >= -EPS && t <= 1 + EPS)
    .map((t) => add(p, mul(v, t)))
    .filter((p) => e.type === 'circle' || onArc(angle(e.center, p), e.start, e.end))
    .map((p) => transform(p, f.matrix));
}
export function unionBounds(bs: Bounds[]): Bounds {
  return boundsOf(
    bs.flatMap((b) => [
      { x: b.minX, y: b.minY },
      { x: b.maxX, y: b.maxY },
    ]),
  );
}
export function entityBounds(d: Drawing, e: Entity): Bounds {
  return unionBounds(flatten(d, [e]).map(flatBounds));
}
export function drawingBounds(d: Drawing): Bounds {
  const b = unionBounds(flatten(d).map(flatBounds));
  return Number.isFinite(b.minX) ? b : { minX: -50, minY: -50, maxX: 50, maxY: 50 };
}
export function hitTest(d: Drawing, p: Point, tolerance: number): Entity | undefined {
  const flats = flatten(d);
  for (let i = flats.length - 1; i >= 0; i--) {
    const f = flats[i],
      e = f.entity;
    let hit = false;
    if (e.type === 'text') hit = contains(boundsOf(pathPoints(e)), transform(p, inverse(f.matrix)));
    else if (e.type === 'circle' || e.type === 'arc') {
      const local = transform(p, inverse(f.matrix)),
        a = angle(e.center, local),
        nearest = transform(polar(e.center, e.radius, a), f.matrix);
      hit = distance(nearest, p) <= tolerance && (e.type === 'circle' || onArc(a, e.start, e.end));
      if (!hit && e.type === 'arc')
        hit = [e.start, e.end].some(
          (a) => distance(p, transform(polar(e.center, e.radius, a), f.matrix)) <= tolerance,
        );
    } else {
      const points = flatPoints(f);
      hit = points.slice(1).some((q, j) => segmentDistance(p, points[j], q) <= tolerance);
    }
    if (hit) return d.entities.find((e) => e.id === f.owner);
  }
  return undefined;
}
export function selectBox(d: Drawing, box: Bounds, crossing: boolean): string[] {
  const corners = [
    { x: box.minX, y: box.minY },
    { x: box.maxX, y: box.minY },
    { x: box.maxX, y: box.maxY },
    { x: box.minX, y: box.maxY },
    { x: box.minX, y: box.minY },
  ];
  return d.entities
    .filter((e) => {
      const flats = flatten(d, [e]);
      if (!flats.length) return false;
      if (!crossing)
        return flats.every((f) => {
          const b = flatBounds(f);
          return contains(box, { x: b.minX, y: b.minY }) && contains(box, { x: b.maxX, y: b.maxY });
        });
      return flats.some((f) => {
        const ps = flatPoints(f);
        if (ps.some((p) => contains(box, p))) return true;
        if (f.entity.type === 'circle' || f.entity.type === 'arc')
          return corners
            .slice(1)
            .some((q, j) => lineCurveIntersections(corners[j], q, f).length > 0);
        if (
          f.entity.type === 'text' &&
          corners.some((p) =>
            contains(boundsOf(pathPoints(f.entity)), transform(p, inverse(f.matrix))),
          )
        )
          return true;
        return ps
          .slice(1)
          .some((p, i) => corners.slice(1).some((q, j) => !!intersect(ps[i], p, corners[j], q)));
      });
    })
    .map((e) => e.id);
}
export function portPosition(d: Drawing, a?: Attachment): Point | undefined {
  if (!a) return;
  const i = d.entities.find((e) => e.id === a.insertId);
  if (i?.type !== 'insert') return;
  const p = d.blocks.find((b) => b.id === i.block)?.ports.find((p) => p.id === a.portId);
  return p ? transform(p.point, insertMatrix(i)) : undefined;
}
function portDirection(d: Drawing, a?: Attachment): Point | undefined {
  if (!a) return;
  const i = d.entities.find((e) => e.id === a.insertId);
  if (i?.type !== 'insert') return;
  const p = d.blocks.find((b) => b.id === i.block)?.ports.find((p) => p.id === a.portId);
  if (!p) return;
  const m = insertMatrix(i);
  return sub(transform(p.direction, m), transform({ x: 0, y: 0 }, m));
}
function routeOrthogonalPoints(
  d: Drawing,
  start: Point,
  end: Point,
  from?: Attachment,
  to?: Attachment,
): Point[] {
  const axis = (v?: Point): Point =>
    !v
      ? { x: 0, y: 0 }
      : Math.abs(v.x) >= Math.abs(v.y)
        ? { x: Math.sign(v.x) * 5, y: 0 }
        : { x: 0, y: Math.sign(v.y) * 5 };
  const sa = axis(portDirection(d, from)),
    ea = axis(portDirection(d, to)),
    a = add(start, sa),
    b = add(end, ea);
  const middle =
    Math.abs(sa.y) > 0
      ? [
          { x: a.x, y: (a.y + b.y) / 2 },
          { x: b.x, y: (a.y + b.y) / 2 },
        ]
      : [
          { x: (a.x + b.x) / 2, y: a.y },
          { x: (a.x + b.x) / 2, y: b.y },
        ];
  const pts = [start, a, ...middle, b, end].filter(
    (p, i, ps) => i === 0 || distance(p, ps[i - 1]) > EPS,
  );
  if (pts.length === 1) pts.push({ ...start });
  return pts;
}
export function routeWire(d: Drawing, w: Wire): void {
  const start = portPosition(d, w.from) ?? w.points[0],
    end = portPosition(d, w.to) ?? w.points[w.points.length - 1];
  if (w.from && !portPosition(d, w.from)) delete w.from;
  if (w.to && !portPosition(d, w.to)) delete w.to;
  w.points = routeOrthogonalPoints(d, start, end, w.from, w.to);
}
export function updateWires(d: Drawing): void {
  const mode = d.projectSettings?.connectorRoutingMode ?? 'straight_to_polyline';
  for (let i = 0; i < d.entities.length; i++) {
    const e = d.entities[i];
    if (e.type === 'wire' && (e.from || e.to)) {
      routeWire(d, e);
    } else if (e.type === 'line' && (e.from || e.to)) {
      const pFrom = portPosition(d, e.from);
      const pTo = portPosition(d, e.to);
      if (e.from && !pFrom) delete e.from;
      if (e.to && !pTo) delete e.to;
      if (!e.from && !e.to) continue;
      const wasAxisAligned = Math.abs(e.a.x - e.b.x) < 1e-3 || Math.abs(e.a.y - e.b.y) < 1e-3;
      const nextA = pFrom ?? e.a;
      const nextB = pTo ?? e.b;
      const isDiagonal = Math.abs(nextA.x - nextB.x) > 1e-3 && Math.abs(nextA.y - nextB.y) > 1e-3;
      if (mode === 'straight_to_polyline' && wasAxisAligned && isDiagonal) {
        const { a: _a, b: _b, type: _t, ...rest } = e;
        const poly: Polyline = {
          ...rest,
          type: 'polyline',
          closed: false,
          points: routeOrthogonalPoints(d, nextA, nextB, e.from, e.to),
        };
        d.entities[i] = poly;
      } else {
        e.a = nextA;
        e.b = nextB;
      }
    } else if (e.type === 'polyline' && (e.from || e.to)) {
      const pFrom = portPosition(d, e.from);
      const pTo = portPosition(d, e.to);
      if (e.from && !pFrom) delete e.from;
      if (e.to && !pTo) delete e.to;
      if (!e.from && !e.to) continue;
      const nextStart = pFrom ?? e.points[0];
      const nextEnd = pTo ?? e.points[e.points.length - 1];
      if (mode === 'straight_to_polyline') {
        e.points = routeOrthogonalPoints(d, nextStart, nextEnd, e.from, e.to);
      } else {
        e.points[0] = nextStart;
        e.points[e.points.length - 1] = nextEnd;
      }
    }
  }
}
export function transformEntity(e: Entity, m: Matrix): void {
  const det = m.a * m.d - m.b * m.c,
    rot = (Math.atan2(m.b, m.a) * 180) / Math.PI;
  switch (e.type) {
    case 'line':
    case 'dimension':
      e.a = transform(e.a, m);
      e.b = transform(e.b, m);
      if (e.type === 'dimension' && e.offset !== undefined) {
        e.offset *= Math.hypot(m.a, m.b) * (det < 0 ? -1 : 1);
      }
      break;
    case 'polyline':
    case 'wire':
      e.points = e.points.map((p) => transform(p, m));
      break;
    case 'circle':
    case 'arc': {
      const old = { ...e.center };
      e.center = transform(old, m);
      if (e.type === 'arc') {
        const s = angle(e.center, transform(polar(old, e.radius, e.start), m)),
          end = angle(e.center, transform(polar(old, e.radius, e.end), m));
        e.start = det < 0 ? end : s;
        e.end = det < 0 ? s : end;
      }
      e.radius *= Math.hypot(m.a, m.b);
      break;
    }
    case 'text':
      e.position = transform(e.position, m);
      e.rotation = det < 0 ? rot - e.rotation : rot + e.rotation;
      break;
    case 'insert':
      e.position = transform(e.position, m);
      e.rotation = det < 0 ? rot - e.rotation : rot + e.rotation;
      if (det < 0) e.scale.y *= -1;
      break;
  }
}
export function around(p: Point, degrees: number, mirror = false): Matrix {
  const a = (degrees * Math.PI) / 180,
    c = Math.cos(a),
    s = Math.sin(a);
  const m = { a: c, b: s, c: mirror ? s : -s, d: mirror ? -c : c, e: 0, f: 0 };
  const q = transform(p, m);
  m.e = p.x - q.x;
  m.f = p.y - q.y;
  return m;
}
/** Computes the next sequential BOM TAG after the highest existing number for the same stem. */
export function nextIncrementedTag(entities: Entity[], currentTag: string): string {
  const trimmed = currentTag.trim();
  const match = trimmed.match(/^(.*?)(\d+)$/);
  const stem = match ? match[1] : `${trimmed}-`;
  const padLen = match && match[2].length > 1 && match[2].startsWith('0') ? match[2].length : 0;
  let maxNum = match ? Number(match[2]) : 0;
  for (const e of entities) {
    if (e.type !== 'insert') continue;
    const tag = e.attributes?.TAG?.trim();
    if (!tag || !tag.startsWith(stem)) continue;
    const suffix = tag.slice(stem.length);
    if (/^\d+$/.test(suffix)) {
      maxNum = Math.max(maxNum, Number(suffix));
    }
  }
  const next = String(maxNum + 1);
  return `${stem}${padLen ? next.padStart(padLen, '0') : next}`;
}

export function copyEntities(d: Drawing, ids: Set<string>, m: Matrix): void {
  const copies = d.entities.filter((e) => ids.has(e.id)).map(clone),
    map = new Map<string, string>();
  copies.forEach((e) => {
    const id = uid();
    map.set(e.id, id);
    e.id = id;
  });
  copies.forEach((e) => {
    transformEntity(e, m);
    if (e.type === 'insert' && e.attributes?.TAG) {
      e.attributes.TAG = nextIncrementedTag(d.entities, e.attributes.TAG);
    }
    if (e.type === 'wire' || e.type === 'line' || e.type === 'polyline')
      for (const key of ['from', 'to'] as const) {
        const a = e[key];
        if (a) {
          const id = map.get(a.insertId);
          if (id) a.insertId = id;
          else delete e[key];
        }
      }
    d.entities.push(e);
  });
}
/** Base TR/EX: one selected straight segment is the finite boundary; clicked line is the target. */
export function trimExtend(
  target: Entity,
  boundary: Entity,
  click: Point,
  extend: boolean,
): boolean {
  if (target.type !== 'line' || boundary.type !== 'line' || target.id === boundary.id) return false;
  const p = intersect(target.a, target.b, boundary.a, boundary.b, !extend, true);
  if (!p) return false;
  if (extend) {
    const v = sub(target.b, target.a),
      t = dot(sub(p, target.a), v) / (dot(v, v) || 1);
    if (t >= 0 && t <= 1) return false;
    if (t < 0) target.a = p;
    else target.b = p;
  } else {
    if (distance(p, target.a) < EPS || distance(p, target.b) < EPS) return false;
    if (distance(click, target.a) < distance(click, target.b)) target.a = p;
    else target.b = p;
  }
  return true;
}

function boundaryIntersectionsWithSegment(
  d: Drawing,
  a: Point,
  b: Point,
  excludeId: string,
  boundaryIds?: Set<string>,
  segmentTarget = true,
): Point[] {
  const hits: Point[] = [];
  const flats = flatten(d).filter((f) => {
    if (f.owner === excludeId) return false;
    if (boundaryIds && boundaryIds.size > 0 && !boundaryIds.has(f.owner)) return false;
    return true;
  });
  for (const f of flats) {
    const e = f.entity;
    if (e.type === 'circle' || e.type === 'arc') {
      if (segmentTarget) {
        hits.push(...lineCurveIntersections(a, b, f));
      } else {
        // Extend segment as long ray along a->b for intersection with curve
        const dir = sub(b, a),
          len = Math.hypot(dir.x, dir.y);
        if (len > EPS) {
          const farA = sub(a, mul(dir, 1e4 / len)),
            farB = add(b, mul(dir, 1e4 / len));
          hits.push(...lineCurveIntersections(farA, farB, f));
        }
      }
      continue;
    }
    if (e.type === 'text') continue;
    const ps = flatPoints(f);
    for (let i = 1; i < ps.length; i++) {
      const p = intersect(a, b, ps[i - 1], ps[i], segmentTarget, true);
      if (p) hits.push(p);
    }
  }
  return hits;
}

/**
 * Smart One-Click Trim (TR): trims the clicked portion of a LINE, POLYLINE, CIRCLE, or ARC
 * against all intersecting geometry (or specified `boundaryIds`).
 */
export function autoTrim(
  d: Drawing,
  targetId: string,
  click: Point,
  boundaryIds?: Set<string>,
): boolean {
  const idx = d.entities.findIndex((e) => e.id === targetId);
  if (idx < 0) return false;
  const target = d.entities[idx];

  if (target.type === 'line') {
    const v = sub(target.b, target.a),
      vv = dot(v, v);
    if (vv < EPS) return false;
    const rawHits = boundaryIntersectionsWithSegment(
      d,
      target.a,
      target.b,
      target.id,
      boundaryIds,
      true,
    );
    const ts = rawHits
      .map((p) => dot(sub(p, target.a), v) / vv)
      .filter((t) => t > 1e-6 && t < 1 - 1e-6)
      .sort((x, y) => x - y);
    const uniqueTs: number[] = [0];
    for (const t of ts) {
      if (t - uniqueTs[uniqueTs.length - 1] > 1e-5) uniqueTs.push(t);
    }
    if (1 - uniqueTs[uniqueTs.length - 1] > 1e-5) uniqueTs.push(1);
    if (uniqueTs.length < 3) return false;

    const clickT = Math.max(0, Math.min(1, dot(sub(click, target.a), v) / vv));
    let segIndex = -1;
    for (let i = 0; i < uniqueTs.length - 1; i++) {
      if (clickT >= uniqueTs[i] - 1e-6 && clickT <= uniqueTs[i + 1] + 1e-6) {
        segIndex = i;
        break;
      }
    }
    if (segIndex < 0) return false;

    const replacement: Entity[] = [];
    const ptAt = (t: number): Point => add(target.a, mul(v, t));
    if (segIndex === 0) {
      target.a = ptAt(uniqueTs[1]);
      return true;
    }
    if (segIndex === uniqueTs.length - 2) {
      target.b = ptAt(uniqueTs[uniqueTs.length - 2]);
      return true;
    }
    // Middle segment trimmed: split into two separate LINEs
    replacement.push(
      { ...clone(target), a: target.a, b: ptAt(uniqueTs[segIndex]) },
      { ...clone(target), id: uid(), a: ptAt(uniqueTs[segIndex + 1]), b: target.b },
    );
    d.entities.splice(idx, 1, ...replacement);
    return true;
  }

  if (target.type === 'polyline') {
    const pts = target.closed ? [...target.points, target.points[0]] : target.points;
    if (pts.length < 2) return false;
    let bestSeg = -1,
      bestDist = Infinity;
    for (let i = 0; i < pts.length - 1; i++) {
      const dist = segmentDistance(click, pts[i], pts[i + 1]);
      if (dist < bestDist) {
        bestDist = dist;
        bestSeg = i;
      }
    }
    if (bestSeg < 0) return false;
    const a = pts[bestSeg],
      b = pts[bestSeg + 1],
      v = sub(b, a),
      vv = dot(v, v);
    if (vv < EPS) return false;
    const hits = boundaryIntersectionsWithSegment(d, a, b, target.id, boundaryIds, true);
    const ts = hits
      .map((p) => dot(sub(p, a), v) / vv)
      .filter((t) => t > 1e-6 && t < 1 - 1e-6)
      .sort((x, y) => x - y);
    if (!ts.length) return false;
    const clickT = dot(sub(click, a), v) / vv;
    const ptAt = (t: number): Point => add(a, mul(v, t));

    if (!target.closed && bestSeg === 0 && clickT <= ts[0]) {
      target.points[0] = ptAt(ts[0]);
      return true;
    }
    if (!target.closed && bestSeg === pts.length - 2 && clickT >= ts[ts.length - 1]) {
      target.points[target.points.length - 1] = ptAt(ts[ts.length - 1]);
      return true;
    }
    // Explode polyline segments and trim the selected sub-segment
    const segments: Line[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      if (i !== bestSeg) {
        segments.push({
          id: i === 0 ? target.id : uid(),
          layer: target.layer,
          color: target.color,
          lineType: target.lineType,
          type: 'line',
          a: { ...pts[i] },
          b: { ...pts[i + 1] },
        });
      } else {
        const breaks = [0, ...ts, 1];
        for (let k = 0; k < breaks.length - 1; k++) {
          if (clickT >= breaks[k] - 1e-6 && clickT <= breaks[k + 1] + 1e-6) continue;
          segments.push({
            id: uid(),
            layer: target.layer,
            color: target.color,
            lineType: target.lineType,
            type: 'line',
            a: ptAt(breaks[k]),
            b: ptAt(breaks[k + 1]),
          });
        }
      }
    }
    d.entities.splice(idx, 1, ...segments);
    return true;
  }

  if (target.type === 'circle' || target.type === 'arc') {
    const flats = flatten(d).filter((f) => {
      if (f.owner === target.id) return false;
      if (boundaryIds && boundaryIds.size > 0 && !boundaryIds.has(f.owner)) return false;
      return true;
    });
    const curveFlat: FlatEntity = {
      entity: target,
      matrix: identity(),
      owner: target.id,
      layer: target.layer,
    };
    const hitAngles: number[] = [];
    for (const f of flats) {
      const e = f.entity;
      if (e.type === 'text') continue;
      if (e.type === 'circle' || e.type === 'arc') {
        const m = f.matrix,
          sx = Math.hypot(m.a, m.b);
        const c2 = transform(e.center, m),
          r2 = e.radius * sx,
          dist = distance(target.center, c2);
        if (
          dist > EPS &&
          dist <= target.radius + r2 + EPS &&
          dist >= Math.abs(target.radius - r2) - EPS
        ) {
          const x = (target.radius * target.radius - r2 * r2 + dist * dist) / (2 * dist),
            h = Math.sqrt(Math.max(0, target.radius * target.radius - x * x)),
            dx = (c2.x - target.center.x) / dist,
            dy = (c2.y - target.center.y) / dist,
            base = { x: target.center.x + x * dx, y: target.center.y + yOrZero(x, dy) };
          for (const sign of [-1, 1]) {
            const q = { x: base.x - sign * h * dy, y: base.y + sign * h * dx };
            const ang = normAngle(angle(target.center, q));
            if (target.type === 'circle' || onArc(ang, target.start, target.end)) {
              hitAngles.push(ang);
            }
          }
        }
      } else {
        const ps = flatPoints(f);
        for (let i = 1; i < ps.length; i++) {
          for (const q of lineCurveIntersections(ps[i - 1], ps[i], curveFlat)) {
            hitAngles.push(normAngle(angle(target.center, q)));
          }
        }
      }
    }
    const sorted = [...new Set(hitAngles.map((a) => Number(a.toFixed(6))))].sort((a, b) => a - b);
    if (sorted.length < 2) return false;
    const clickA = normAngle(angle(target.center, click));
    if (target.type === 'circle') {
      let seg = sorted.length - 1;
      for (let i = 0; i < sorted.length - 1; i++) {
        if (clickA >= sorted[i] && clickA <= sorted[i + 1]) {
          seg = i;
          break;
        }
      }
      const nextIdx = (seg + 1) % sorted.length;
      const arc: Arc = {
        id: target.id,
        layer: target.layer,
        color: target.color,
        lineType: target.lineType,
        type: 'arc',
        center: target.center,
        radius: target.radius,
        start: sorted[nextIdx],
        end: sorted[seg],
      };
      d.entities.splice(idx, 1, arc);
      return true;
    } else {
      const start = normAngle(target.start),
        sweep = normAngle(target.end - target.start),
        rel = (a: number) => normAngle(a - start);
      const inner = sorted
        .map(rel)
        .filter((r) => r > 1e-4 && r < sweep - 1e-4)
        .sort((a, b) => a - b);
      if (!inner.length) return false;
      const breaks = [0, ...inner, sweep],
        clickRel = rel(clickA);
      let seg = breaks.length - 2;
      for (let i = 0; i < breaks.length - 1; i++) {
        if (clickRel >= breaks[i] - 1e-4 && clickRel <= breaks[i + 1] + 1e-4) {
          seg = i;
          break;
        }
      }
      if (seg === 0) {
        target.start = normAngle(start + breaks[1]);
        return true;
      }
      if (seg === breaks.length - 2) {
        target.end = normAngle(start + breaks[breaks.length - 2]);
        return true;
      }
      const left: Arc = { ...clone(target), start, end: normAngle(start + breaks[seg]) },
        right: Arc = {
          ...clone(target),
          id: uid(),
          start: normAngle(start + breaks[seg + 1]),
          end: target.end,
        };
      d.entities.splice(idx, 1, left, right);
      return true;
    }
  }
  return false;
}

function yOrZero(x: number, dy: number): number {
  return x * dy;
}

/**
 * Smart One-Click Extend (EX): extends the clicked end of a LINE or open POLYLINE
 * to the nearest intersecting boundary entity in the drawing (or `boundaryIds`).
 */
export function autoExtend(
  d: Drawing,
  targetId: string,
  click: Point,
  boundaryIds?: Set<string>,
): boolean {
  const target = d.entities.find((e) => e.id === targetId);
  if (!target) return false;

  const extendEndpoint = (pStart: Point, pEnd: Point): Point | undefined => {
    const v = sub(pEnd, pStart),
      vv = dot(v, v);
    if (vv < EPS) return undefined;
    const hits = boundaryIntersectionsWithSegment(d, pStart, pEnd, target.id, boundaryIds, false);
    let bestT = Infinity,
      bestPoint: Point | undefined;
    for (const h of hits) {
      const t = dot(sub(h, pStart), v) / vv;
      if (t > 1 + 1e-6 && t < bestT) {
        bestT = t;
        bestPoint = h;
      }
    }
    return bestPoint;
  };

  if (target.type === 'line') {
    const nearB = distance(click, target.b) <= distance(click, target.a);
    const next = nearB ? extendEndpoint(target.a, target.b) : extendEndpoint(target.b, target.a);
    if (!next) return false;
    if (nearB) target.b = next;
    else target.a = next;
    return true;
  }

  if (target.type === 'polyline' && !target.closed && target.points.length >= 2) {
    const first = target.points[0],
      second = target.points[1],
      penultimate = target.points[target.points.length - 2],
      last = target.points[target.points.length - 1];
    const nearEnd = distance(click, last) <= distance(click, first);
    if (nearEnd) {
      const next = extendEndpoint(penultimate, last);
      if (!next) return false;
      target.points[target.points.length - 1] = next;
      return true;
    } else {
      const next = extendEndpoint(second, first);
      if (!next) return false;
      target.points[0] = next;
      return true;
    }
  }
  return false;
}

export type OffsetSideMode = 'pointer' | 'inside' | 'outside' | 'both';

export function polygonSignedArea(pts: Point[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i],
      b = pts[(i + 1) % pts.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area * 0.5;
}

export function pointInPolygon(p: Point, pts: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x,
      yi = pts[i].y,
      xj = pts[j].x,
      yj = pts[j].y;
    const hit = yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi || EPS) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

/** Offsets a LINE, POLYLINE, CIRCLE, or ARC by `dist` mm using cursor side or explicit inside/outside mode. */
export function offsetEntity(
  entity: Entity,
  dist: number,
  sidePoint: Point = { x: 0, y: 0 },
  sideMode: Exclude<OffsetSideMode, 'both'> = 'pointer',
): Entity | undefined {
  if (!(dist > 0 && Number.isFinite(dist))) return undefined;
  const copy = clone(entity);
  copy.id = uid();
  if (copy.type === 'line') {
    const dx = copy.b.x - copy.a.x,
      dy = copy.b.y - copy.a.y,
      len = Math.hypot(dx, dy);
    if (len < EPS) return undefined;
    const nx = -dy / len,
      ny = dx / len,
      side =
        sideMode === 'outside'
          ? 1
          : sideMode === 'inside'
            ? -1
            : cross({ x: dx, y: dy }, sub(sidePoint, copy.a)) >= 0
              ? 1
              : -1;
    copy.a = { x: copy.a.x + nx * dist * side, y: copy.a.y + ny * dist * side };
    copy.b = { x: copy.b.x + nx * dist * side, y: copy.b.y + ny * dist * side };
    return copy;
  }
  if (copy.type === 'circle' || copy.type === 'arc') {
    const dCenter = distance(copy.center, sidePoint);
    const goOutside =
      sideMode === 'outside' ? true : sideMode === 'inside' ? false : dCenter >= copy.radius;
    const nextR = goOutside ? copy.radius + dist : copy.radius - dist;
    if (nextR <= EPS) return undefined;
    copy.radius = nextR;
    return copy;
  }
  if (copy.type === 'polyline' && copy.points.length >= 2) {
    const pts = copy.closed ? [...copy.points, copy.points[0]] : copy.points;
    let sideSign = 1;
    let origArea = 0;
    if (copy.closed && copy.points.length >= 3) {
      origArea = polygonSignedArea(copy.points);
      const outwardSign = origArea >= 0 ? -1 : 1;
      if (sideMode === 'outside') sideSign = outwardSign;
      else if (sideMode === 'inside') sideSign = -outwardSign;
      else {
        sideSign = pointInPolygon(sidePoint, copy.points) ? -outwardSign : outwardSign;
      }
    } else if (sideMode === 'outside') {
      sideSign = 1;
    } else if (sideMode === 'inside') {
      sideSign = -1;
    } else {
      let bestIdx = 0,
        bestDist = Infinity;
      for (let i = 0; i < pts.length - 1; i++) {
        const sd = segmentDistance(sidePoint, pts[i], pts[i + 1]);
        if (sd < bestDist) {
          bestDist = sd;
          bestIdx = i;
        }
      }
      const segVec = sub(pts[bestIdx + 1], pts[bestIdx]);
      sideSign = cross(segVec, sub(sidePoint, pts[bestIdx])) >= 0 ? 1 : -1;
    }
    const offsetSeg = (p1: Point, p2: Point): [Point, Point] => {
      const v = sub(p2, p1),
        len = Math.hypot(v.x, v.y) || 1,
        nx = (-v.y / len) * dist * sideSign,
        ny = (v.x / len) * dist * sideSign;
      return [
        { x: p1.x + nx, y: p1.y + ny },
        { x: p2.x + nx, y: p2.y + ny },
      ];
    };
    const segs: [Point, Point][] = [];
    for (let i = 0; i < pts.length - 1; i++) segs.push(offsetSeg(pts[i], pts[i + 1]));
    const nextPts: Point[] = [];
    if (!copy.closed) nextPts.push(segs[0][0]);
    for (let i = 0; i < segs.length - 1; i++) {
      const hit = intersect(segs[i][0], segs[i][1], segs[i + 1][0], segs[i + 1][1], false, false);
      nextPts.push(hit ?? segs[i][1]);
    }
    if (!copy.closed) nextPts.push(segs[segs.length - 1][1]);
    else {
      const hit = intersect(
        segs[segs.length - 1][0],
        segs[segs.length - 1][1],
        segs[0][0],
        segs[0][1],
        false,
        false,
      );
      nextPts.unshift(hit ?? segs[0][0]);
      if (Math.abs(origArea) > EPS && polygonSignedArea(nextPts) * origArea <= EPS) {
        return undefined;
      }
    }
    copy.points = nextPts;
    return copy;
  }
  return undefined;
}

/** Creates both inward/negative and outward/positive offsets when valid. */
export function offsetBothSides(entity: Entity, dist: number): Entity[] {
  const out: Entity[] = [];
  const ext = offsetEntity(entity, dist, { x: 0, y: 0 }, 'outside');
  const intl = offsetEntity(entity, dist, { x: 0, y: 0 }, 'inside');
  if (ext) out.push(ext);
  if (intl) out.push(intl);
  return out;
}

/** Fillets two non-parallel LINEs with `radius` mm (0 = sharp corner). Returns created Arc if radius > 0. */
export function filletLines(a: Line, b: Line, radius = 0): Arc | undefined {
  const corner = intersect(a.a, a.b, b.a, b.b, false, false);
  if (!corner) return undefined;
  const trimEnd = (l: Line, targetPt: Point): void => {
    if (distance(l.a, corner) <= distance(l.b, corner)) l.a = targetPt;
    else l.b = targetPt;
  };
  if (radius <= EPS) {
    trimEnd(a, corner);
    trimEnd(b, corner);
    return undefined;
  }
  const farA = distance(a.a, corner) >= distance(a.b, corner) ? a.a : a.b,
    farB = distance(b.a, corner) >= distance(b.b, corner) ? b.a : b.b,
    uA = mul(sub(farA, corner), 1 / (distance(farA, corner) || 1)),
    uB = mul(sub(farB, corner), 1 / (distance(farB, corner) || 1)),
    cosTheta = Math.max(-1, Math.min(1, dot(uA, uB))),
    theta = Math.acos(cosTheta);
  if (theta < 1e-4 || Math.PI - theta < 1e-4) return undefined;
  const tangentDist = radius / Math.tan(theta / 2),
    tA = add(corner, mul(uA, tangentDist)),
    tB = add(corner, mul(uB, tangentDist)),
    bisector = add(uA, uB),
    bLen = Math.hypot(bisector.x, bisector.y) || 1,
    centerDist = radius / Math.sin(theta / 2),
    center = add(corner, mul(bisector, centerDist / bLen));
  trimEnd(a, tA);
  trimEnd(b, tB);
  const angA = normAngle(angle(center, tA)),
    angB = normAngle(angle(center, tB)),
    ccwSweep = normAngle(angB - angA);
  return {
    id: uid(),
    type: 'arc',
    layer: a.layer,
    color: a.color,
    lineType: a.lineType,
    center,
    radius,
    start: ccwSweep <= 180 ? angA : angB,
    end: ccwSweep <= 180 ? angB : angA,
  };
}

/** Explodes an INSERT or POLYLINE into independent primitive entities. */
export function explodeEntity(d: Drawing, entityId: string): boolean {
  const idx = d.entities.findIndex((e) => e.id === entityId);
  if (idx < 0) return false;
  const target = d.entities[idx];
  if (target.type === 'polyline') {
    const pts = target.closed ? [...target.points, target.points[0]] : target.points;
    const lines: Entity[] = [];
    for (let i = 1; i < pts.length; i++) {
      lines.push({
        id: uid(),
        type: 'line',
        layer: target.layer,
        color: target.color,
        lineType: target.lineType,
        a: { ...pts[i - 1] },
        b: { ...pts[i] },
      });
    }
    d.entities.splice(idx, 1, ...lines);
    return true;
  }
  if (target.type === 'insert') {
    const flats = flatten(d, [target]);
    const exploded: Entity[] = flats.map((f) => {
      const copy = clone(f.entity) as Entity;
      copy.id = uid();
      copy.layer = f.layer === '0' ? target.layer : f.layer;
      if (f.color !== undefined) copy.color = f.color;
      if (f.lineType !== undefined) copy.lineType = f.lineType;
      transformEntity(copy, f.matrix);
      return copy;
    });
    d.entities.splice(idx, 1, ...exploded);
    return true;
  }
  return false;
}

/** Groups selected entities into a reusable local block insert centered on their bounding box. */
export function groupEntities(
  d: Drawing,
  selectedIds: Set<string>,
  name?: string,
): Insert | undefined {
  const targets = d.entities.filter((e) => selectedIds.has(e.id));
  if (!targets.length) return undefined;
  const b = unionBounds(flatten(d, targets).map(flatBounds));
  const center: Point = Number.isFinite(b.minX)
    ? { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 }
    : { x: 0, y: 0 };
  const shift: Matrix = { ...identity(), e: -center.x, f: -center.y };
  const localEntities = targets.map((t) => {
    const copy = clone(t);
    copy.id = uid();
    transformEntity(copy, shift);
    return copy;
  });
  const blockIndex = d.blocks.filter((blk) => blk.category === 'Groups').length + 1;
  const blockId = uid();
  d.blocks.push({
    id: blockId,
    name: name?.trim() || `Group ${blockIndex}`,
    category: 'Groups',
    library: 'General',
    group: 'User Groups',
    standard: 'ISO 128',
    entities: localEntities,
    ports: [],
    attributes: {},
  });
  const groupInsert: Insert = {
    id: uid(),
    type: 'insert',
    layer: targets[0].layer,
    block: blockId,
    position: center,
    rotation: 0,
    scale: { x: 1, y: 1 },
    attributes: {},
  };
  d.entities = d.entities.filter((e) => !selectedIds.has(e.id));
  d.entities.push(groupInsert);
  return groupInsert;
}

/** Ungroups an INSERT (group or library symbol) or POLYLINE into editable primitive entities. */
export const ungroupEntity = (d: Drawing, entityId: string): boolean => explodeEntity(d, entityId);

/** Joins connected LINE entities into a POLYLINE. */
export function joinEntities(d: Drawing, selectedIds: Set<string>): boolean {
  const lines = d.entities.filter((e): e is Line => selectedIds.has(e.id) && e.type === 'line');
  if (lines.length < 2) return false;
  const remaining = [...lines];
  const chain: Point[] = [remaining[0].a, remaining[0].b];
  const usedIds = new Set<string>([remaining[0].id]);
  const template = remaining[0];
  remaining.shift();

  let progressed = true;
  while (progressed && remaining.length) {
    progressed = false;
    for (let i = 0; i < remaining.length; i++) {
      const l = remaining[i],
        head = chain[0],
        tail = chain[chain.length - 1];
      if (distance(l.a, tail) < 1e-4) {
        chain.push(l.b);
        usedIds.add(l.id);
        remaining.splice(i, 1);
        progressed = true;
        break;
      } else if (distance(l.b, tail) < 1e-4) {
        chain.push(l.a);
        usedIds.add(l.id);
        remaining.splice(i, 1);
        progressed = true;
        break;
      } else if (distance(l.b, head) < 1e-4) {
        chain.unshift(l.a);
        usedIds.add(l.id);
        remaining.splice(i, 1);
        progressed = true;
        break;
      } else if (distance(l.a, head) < 1e-4) {
        chain.unshift(l.b);
        usedIds.add(l.id);
        remaining.splice(i, 1);
        progressed = true;
        break;
      }
    }
  }
  if (usedIds.size < 2) return false;
  const closed = distance(chain[0], chain[chain.length - 1]) < 1e-4;
  if (closed) chain.pop();
  const poly: Polyline = {
    id: uid(),
    type: 'polyline',
    layer: template.layer,
    color: template.color,
    lineType: template.lineType,
    points: chain,
    closed,
  };
  d.entities = d.entities.filter((e) => !usedIds.has(e.id));
  d.entities.push(poly);
  return true;
}

export type GripKind =
  | 'endpoint'
  | 'midpoint'
  | 'center'
  | 'quadrant'
  | 'rotate'
  | 'scale'
  | 'offset'
  | 'vertex'
  | 'label';

export type GripMode = 'stretch' | 'move' | 'rotate' | 'scale';

export interface Grip {
  id: string;
  entityId: string;
  kind: GripKind;
  point: Point;
  index?: number;
  label: string;
}

/** Computes multifunctional interactive grips for an entity. */
export function entityGrips(d: Drawing, e: Entity, includeLabelGrip = false): Grip[] {
  switch (e.type) {
    case 'line':
      return [
        {
          id: `${e.id}:a`,
          entityId: e.id,
          kind: 'endpoint',
          point: e.a,
          index: 0,
          label: 'Start point',
        },
        {
          id: `${e.id}:mid`,
          entityId: e.id,
          kind: 'midpoint',
          point: mul(add(e.a, e.b), 0.5),
          label: 'Move line',
        },
        {
          id: `${e.id}:b`,
          entityId: e.id,
          kind: 'endpoint',
          point: e.b,
          index: 1,
          label: 'End point',
        },
      ];
    case 'polyline':
    case 'wire': {
      const grips: Grip[] = e.points.map((pt, i) => ({
        id: `${e.id}:v:${i}`,
        entityId: e.id,
        kind: 'vertex',
        point: pt,
        index: i,
        label: `Vertex ${i + 1}`,
      }));
      if (e.type === 'polyline') {
        const count = e.closed ? e.points.length : e.points.length - 1;
        for (let i = 0; i < count; i++) {
          const a = e.points[i],
            b = e.points[(i + 1) % e.points.length];
          grips.push({
            id: `${e.id}:m:${i}`,
            entityId: e.id,
            kind: 'midpoint',
            point: mul(add(a, b), 0.5),
            index: i,
            label: `Segment ${i + 1}`,
          });
        }
      }
      return grips;
    }
    case 'circle':
      return [
        { id: `${e.id}:c`, entityId: e.id, kind: 'center', point: e.center, label: 'Move center' },
        {
          id: `${e.id}:q0`,
          entityId: e.id,
          kind: 'quadrant',
          point: { x: e.center.x + e.radius, y: e.center.y },
          label: 'Radius',
        },
        {
          id: `${e.id}:q90`,
          entityId: e.id,
          kind: 'quadrant',
          point: { x: e.center.x, y: e.center.y + e.radius },
          label: 'Radius',
        },
        {
          id: `${e.id}:q180`,
          entityId: e.id,
          kind: 'quadrant',
          point: { x: e.center.x - e.radius, y: e.center.y },
          label: 'Radius',
        },
        {
          id: `${e.id}:q270`,
          entityId: e.id,
          kind: 'quadrant',
          point: { x: e.center.x, y: e.center.y - e.radius },
          label: 'Radius',
        },
      ];
    case 'arc': {
      const midAngle = e.start + normAngle(e.end - e.start) / 2;
      return [
        { id: `${e.id}:c`, entityId: e.id, kind: 'center', point: e.center, label: 'Move center' },
        {
          id: `${e.id}:sa`,
          entityId: e.id,
          kind: 'endpoint',
          point: polar(e.center, e.radius, e.start),
          index: 0,
          label: 'Start angle',
        },
        {
          id: `${e.id}:ma`,
          entityId: e.id,
          kind: 'quadrant',
          point: polar(e.center, e.radius, midAngle),
          label: 'Radius',
        },
        {
          id: `${e.id}:ea`,
          entityId: e.id,
          kind: 'endpoint',
          point: polar(e.center, e.radius, e.end),
          index: 1,
          label: 'End angle',
        },
      ];
    }
    case 'dimension': {
      const len = distance(e.a, e.b),
        nx = len > EPS ? -(e.b.y - e.a.y) / len : 0,
        ny = len > EPS ? (e.b.x - e.a.x) / len : 1,
        off = e.offset ?? 8,
        mid = mul(add(e.a, e.b), 0.5);
      return [
        {
          id: `${e.id}:a`,
          entityId: e.id,
          kind: 'endpoint',
          point: e.a,
          index: 0,
          label: 'Point A',
        },
        {
          id: `${e.id}:b`,
          entityId: e.id,
          kind: 'endpoint',
          point: e.b,
          index: 1,
          label: 'Point B',
        },
        {
          id: `${e.id}:off`,
          entityId: e.id,
          kind: 'offset',
          point: { x: mid.x + nx * off, y: mid.y + ny * off },
          label: 'Dimension offset',
        },
      ];
    }
    case 'text':
      return [
        {
          id: `${e.id}:pos`,
          entityId: e.id,
          kind: 'center',
          point: e.position,
          label: 'Move text',
        },
        {
          id: `${e.id}:rot`,
          entityId: e.id,
          kind: 'rotate',
          point: polar(e.position, Math.max(8, e.height * 2.5), e.rotation),
          label: 'Rotate text',
        },
      ];
    case 'insert': {
      const b = entityBounds(d, e);
      const span = Math.max(12, Math.hypot(b.maxX - b.minX, b.maxY - b.minY) * 0.55);
      const out: Grip[] = [
        {
          id: `${e.id}:pos`,
          entityId: e.id,
          kind: 'center',
          point: e.position,
          label: 'Move symbol',
        },
        {
          id: `${e.id}:rot`,
          entityId: e.id,
          kind: 'rotate',
          point: polar(e.position, span, e.rotation),
          label: 'Rotate symbol',
        },
        {
          id: `${e.id}:scl`,
          entityId: e.id,
          kind: 'scale',
          point: polar(e.position, span, e.rotation + 45),
          label: 'Scale symbol',
        },
      ];
      if (includeLabelGrip || e.labelStyle?.textOffset) {
        const lblFlat = flatten(d, [e]).find(
          (f) => f.entity.type === 'text' && f.owner === e.id && f.entity.id.startsWith(`${e.id}:`),
        );
        const lblPt =
          lblFlat && lblFlat.entity.type === 'text'
            ? lblFlat.entity.position
            : {
                x: b.maxX + 1.5 + (e.labelStyle?.textOffset?.x ?? 0),
                y: b.maxY + (e.labelStyle?.textOffset?.y ?? 0),
              };
        out.push({
          id: `${e.id}:lbl`,
          entityId: e.id,
          kind: 'label',
          point: lblPt,
          label: 'Move label text',
        });
      }
      return out;
    }
  }
}

/** Applies a multifunctional grip drag onto a target entity. */
export function applyGripDrag(
  e: Entity,
  grip: Grip,
  target: Point,
  mode: GripMode = 'stretch',
): void {
  if (grip.kind === 'label' && e.type === 'insert') {
    const delta = sub(target, grip.point);
    const cur = e.labelStyle?.textOffset ?? { x: 0, y: 0 };
    e.labelStyle = {
      ...(e.labelStyle ?? {}),
      textOffset: { x: cur.x + delta.x, y: cur.y + delta.y },
    };
    return;
  }
  if (
    mode === 'move' ||
    grip.kind === 'center' ||
    (grip.kind === 'midpoint' && e.type === 'line')
  ) {
    const delta = sub(target, grip.point);
    transformEntity(e, { ...identity(), e: delta.x, f: delta.y });
    return;
  }
  if (mode === 'rotate' || grip.kind === 'rotate') {
    const origin =
      e.type === 'insert' || e.type === 'text'
        ? e.position
        : e.type === 'circle' || e.type === 'arc'
          ? e.center
          : grip.point;
    const nextAngle = angle(origin, target);
    if (e.type === 'insert' || e.type === 'text') {
      e.rotation = nextAngle;
    } else {
      const oldAngle = angle(origin, grip.point);
      transformEntity(e, around(origin, nextAngle - oldAngle));
    }
    return;
  }
  if (mode === 'scale' || grip.kind === 'scale') {
    if (e.type === 'insert') {
      const baseDist = Math.max(1, distance(e.position, grip.point)),
        newDist = Math.max(1, distance(e.position, target)),
        ratio = newDist / baseDist;
      e.scale = {
        x: Math.max(0.05, Math.abs(e.scale.x) * ratio) * Math.sign(e.scale.x || 1),
        y: Math.max(0.05, Math.abs(e.scale.y) * ratio) * Math.sign(e.scale.y || 1),
      };
    }
    return;
  }
  switch (e.type) {
    case 'line':
      if (grip.index === 0) {
        e.a = target;
        delete e.from;
      } else if (grip.index === 1) {
        e.b = target;
        delete e.to;
      }
      break;
    case 'polyline':
    case 'wire':
      if (grip.kind === 'vertex' && grip.index !== undefined) {
        e.points[grip.index] = target;
        if (grip.index === 0) delete e.from;
        if (grip.index === e.points.length - 1) delete e.to;
      } else if (grip.kind === 'midpoint' && grip.index !== undefined && e.type === 'polyline') {
        const delta = sub(target, grip.point),
          i1 = grip.index,
          i2 = (i1 + 1) % e.points.length;
        e.points[i1] = add(e.points[i1], delta);
        e.points[i2] = add(e.points[i2], delta);
      }
      break;
    case 'circle':
      if (grip.kind === 'quadrant') e.radius = Math.max(0.1, distance(e.center, target));
      break;
    case 'arc':
      if (grip.kind === 'quadrant') e.radius = Math.max(0.1, distance(e.center, target));
      else if (grip.index === 0) e.start = normAngle(angle(e.center, target));
      else if (grip.index === 1) e.end = normAngle(angle(e.center, target));
      break;
    case 'dimension':
      if (grip.index === 0) e.a = target;
      else if (grip.index === 1) e.b = target;
      else if (grip.kind === 'offset') {
        const len = distance(e.a, e.b),
          nx = len > EPS ? -(e.b.y - e.a.y) / len : 0,
          ny = len > EPS ? (e.b.x - e.a.x) / len : 1,
          mid = mul(add(e.a, e.b), 0.5);
        e.offset = dot(sub(target, mid), { x: nx, y: ny });
      }
      break;
  }
}

export interface LineJump {
  enter: Point;
  exit: Point;
  center: Point;
  radius: number;
  startAngleDeg: number;
  endAngleDeg: number;
  ccw: boolean;
  distAlong: number;
}

interface JumpSegment {
  entityId: string;
  entityOrder: number;
  segIndex: number;
  entityType: 'line' | 'polyline' | 'wire';
  a: Point;
  b: Point;
  length: number;
  bounds: Bounds;
}

export interface LineCrossing {
  key: string;
  point: Point;
  winnerId: string;
  winnerSegIndex: number;
  loserId: string;
  loserSegIndex: number;
  axis: 'horizontal' | 'vertical';
  active: boolean;
}

export function crossingKey(idA: string, segA: number, idB: string, segB: number): string {
  const k1 = `${idA}:${segA}`;
  const k2 = `${idB}:${segB}`;
  return k1 <= k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
}

function collectCrossings(d: Drawing): {
  crossings: LineCrossing[];
  byWinnerSeg: Map<string, LineJump[]>;
} {
  const result = new Map<string, LineJump[]>();
  const crossings: LineCrossing[] = [];
  const ps = d.projectSettings;
  const r = Math.max(0.5, ps?.jumpRadius ?? 2.5);
  const priority = ps?.jumpPriority ?? 'horizontal';
  const scope = ps?.jumpScope ?? 'all';
  const defaultOn = !!ps?.lineJumps;
  const manualSet = new Set(d.manualJumpKeys ?? []);
  const excludedSet = new Set(d.excludedJumpKeys ?? []);
  const dirOverrides = d.jumpDirectionOverrides ?? {};
  const visibleLayers = new Set(d.layers.filter((l) => l.visible).map((l) => l.id));
  const entityMap = new Map(d.entities.map((e) => [e.id, e]));

  const segs: JumpSegment[] = [];
  d.entities.forEach((e, idx) => {
    if (!visibleLayers.has(e.layer)) return;
    if (e.layer === 'TITLE_BLOCK' || e.id.startsWith('sheet-')) return;
    if (e.type === 'line') {
      const len = distance(e.a, e.b);
      if (len > r * 2.2) {
        segs.push({
          entityId: e.id,
          entityOrder: idx,
          segIndex: 0,
          entityType: 'line',
          a: e.a,
          b: e.b,
          length: len,
          bounds: boundsOf([e.a, e.b]),
        });
      }
    } else if (e.type === 'polyline' || e.type === 'wire') {
      const pts = e.points;
      const segCount = e.type === 'polyline' && e.closed ? pts.length : pts.length - 1;
      for (let i = 0; i < segCount; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const len = distance(a, b);
        if (len > r * 2.2) {
          segs.push({
            entityId: e.id,
            entityOrder: idx,
            segIndex: i,
            entityType: e.type,
            a,
            b,
            length: len,
            bounds: boundsOf([a, b]),
          });
        }
      }
    }
  });

  const isMoreHorizontal = (s: JumpSegment): boolean =>
    Math.abs(s.b.x - s.a.x) >= Math.abs(s.b.y - s.a.y);

  const pickWinner = (
    s1: JumpSegment,
    s2: JumpSegment,
    axisPref: 'horizontal' | 'vertical',
    respectScope = true,
  ): JumpSegment => {
    if (respectScope && scope === 'wires') {
      if (s1.entityType === 'wire' && s2.entityType !== 'wire') return s1;
      if (s2.entityType === 'wire' && s1.entityType !== 'wire') return s2;
    }
    const h1 = isMoreHorizontal(s1);
    const h2 = isMoreHorizontal(s2);
    if (h1 !== h2) {
      return axisPref === 'horizontal' ? (h1 ? s1 : s2) : h1 ? s2 : s1;
    }
    return s1.entityOrder >= s2.entityOrder ? s1 : s2;
  };

  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      const s1 = segs[i];
      const s2 = segs[j];
      if (s1.entityId === s2.entityId) continue;
      if (!overlaps(s1.bounds, s2.bounds)) continue;
      const d1 = sub(s1.b, s1.a);
      const d2 = sub(s2.b, s2.a);
      const denom = cross(d1, d2);
      if (Math.abs(denom) / (s1.length * s2.length) < 0.05) continue;
      const hit = intersect(s1.a, s1.b, s2.a, s2.b);
      if (!hit) continue;

      const ckey = crossingKey(s1.entityId, s1.segIndex, s2.entityId, s2.segIndex);
      const overrideAxis = dirOverrides[ckey];
      const winner = overrideAxis
        ? pickWinner(s1, s2, overrideAxis, false)
        : pickWinner(s1, s2, priority, true);
      const loser = winner === s1 ? s2 : s1;
      const dWinA = distance(winner.a, hit);
      const dWinB = distance(winner.b, hit);
      const dLoseA = distance(loser.a, hit);
      const dLoseB = distance(loser.b, hit);
      if (dWinA < r + 0.6 || dWinB < r + 0.6 || dLoseA < 0.6 || dLoseB < 0.6) continue;

      const winEnt = entityMap.get(winner.entityId);
      const loseEnt = entityMap.get(loser.entityId);
      const forceNever = winEnt?.lineJump === 'never' || loseEnt?.lineJump === 'never';
      const forceAlways = winEnt?.lineJump === 'always' || loseEnt?.lineJump === 'always';
      const scopeMatch = scope !== 'wires' || winner.entityType === 'wire' || !!overrideAxis;

      const active =
        !forceNever &&
        (manualSet.has(ckey) ||
          ((defaultOn || forceAlways) && scopeMatch && !excludedSet.has(ckey)));

      crossings.push({
        key: ckey,
        point: hit,
        winnerId: winner.entityId,
        winnerSegIndex: winner.segIndex,
        loserId: loser.entityId,
        loserSegIndex: loser.segIndex,
        axis: overrideAxis ?? (isMoreHorizontal(winner) ? 'horizontal' : 'vertical'),
        active,
      });

      if (!active) continue;

      const u = {
        x: (winner.b.x - winner.a.x) / winner.length,
        y: (winner.b.y - winner.a.y) / winner.length,
      };
      const enter = { x: hit.x - u.x * r, y: hit.y - u.y * r };
      const exit = { x: hit.x + u.x * r, y: hit.y + u.y * r };

      const baseAngle = angle(hit, enter);
      const endAngle = angle(hit, exit);
      const midRad = ((baseAngle + 90) * Math.PI) / 180;
      const ccwTestPt = { x: hit.x + r * Math.cos(midRad), y: hit.y + r * Math.sin(midRad) };
      const ccwNormalY = ccwTestPt.y - hit.y;
      const ccwNormalX = ccwTestPt.x - hit.x;
      const wantCcw = Math.abs(u.x) >= 0.25 ? ccwNormalY > 0 : ccwNormalX < 0;

      const key = `${winner.entityId}:${winner.segIndex}`;
      const list = result.get(key) ?? [];
      list.push({
        enter,
        exit,
        center: hit,
        radius: r,
        startAngleDeg: baseAngle,
        endAngleDeg: endAngle,
        ccw: wantCcw,
        distAlong: dWinA,
      });
      result.set(key, list);
    }
  }

  for (const [key, list] of result) {
    list.sort((a, b) => a.distAlong - b.distAlong);
    const deduped: LineJump[] = [];
    for (const jump of list) {
      const prev = deduped[deduped.length - 1];
      if (!prev || jump.distAlong - prev.distAlong >= jump.radius * 2.15) {
        deduped.push(jump);
      }
    }
    result.set(key, deduped);
  }
  return { crossings, byWinnerSeg: result };
}

/**
 * Computes Visio-style semicircular cross-over humps (bridges) at line intersections,
 * honoring project defaults plus manual per-intersection toggles and exclusions.
 */
export function computeLineJumps(d: Drawing): Map<string, LineJump[]> {
  return collectCrossings(d).byWinnerSeg;
}

/** Finds all eligible line/polyline/wire intersections and whether each currently has a bridge jump. */
export function findAllLineCrossings(d: Drawing): LineCrossing[] {
  return collectCrossings(d).crossings;
}

/** Toggles a bridge hump at a specific crossing `key`, returning the new active state. */
export function toggleLineCrossingJump(d: Drawing, key: string): boolean {
  const c = findAllLineCrossings(d).find((x) => x.key === key);
  const currentlyActive = c ? c.active : (d.manualJumpKeys ?? []).includes(key);
  d.manualJumpKeys = (d.manualJumpKeys ?? []).filter((k) => k !== key);
  d.excludedJumpKeys = (d.excludedJumpKeys ?? []).filter((k) => k !== key);
  if (currentlyActive) {
    d.excludedJumpKeys.push(key);
    return false;
  }
  d.manualJumpKeys.push(key);
  return true;
}

/** Explicitly sets active state and/or jump axis ('horizontal' | 'vertical') for one crossing key. */
export function setLineCrossingJump(
  d: Drawing,
  key: string,
  opts: { active?: boolean; axis?: 'horizontal' | 'vertical' },
): void {
  if (opts.axis !== undefined) {
    d.jumpDirectionOverrides = { ...(d.jumpDirectionOverrides ?? {}), [key]: opts.axis };
  }
  if (opts.active !== undefined) {
    d.manualJumpKeys = (d.manualJumpKeys ?? []).filter((k) => k !== key);
    d.excludedJumpKeys = (d.excludedJumpKeys ?? []).filter((k) => k !== key);
    if (opts.active) d.manualJumpKeys.push(key);
    else d.excludedJumpKeys.push(key);
  }
}

export interface ArrowMarker {
  position: Point;
  angleDeg: number;
  style: LineArrows['style'];
  size: number;
}

/** Computes world positions and tangent orientations for arrowheads placed along a path. */
export function computeLineArrowMarkers(
  pts: Point[],
  closed: boolean,
  arrows?: LineArrows,
): ArrowMarker[] {
  if (!arrows || pts.length < 2) return [];
  const segPts = closed ? [...pts, pts[0]] : pts;
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < segPts.length - 1; i++) {
    const len = distance(segPts[i], segPts[i + 1]);
    segLens.push(len);
    total += len;
  }
  if (total <= EPS) return [];

  const sampleAt = (targetDist: number): { pos: Point; deg: number } => {
    const clamped = Math.max(0, Math.min(total, targetDist));
    let acc = 0;
    for (let i = 0; i < segLens.length; i++) {
      const len = segLens[i];
      if (acc + len >= clamped || i === segLens.length - 1) {
        const t = len > EPS ? Math.max(0, Math.min(1, (clamped - acc) / len)) : 0;
        const a = segPts[i],
          b = segPts[i + 1];
        return {
          pos: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t },
          deg: angle(a, b),
        };
      }
      acc += len;
    }
    return { pos: segPts[0], deg: 0 };
  };

  const out: ArrowMarker[] = [];
  const size = Math.max(0.8, arrows.size ?? 3.5);
  const flip = arrows.reversed ? 180 : 0;
  const pushMarker = (distAlong: number, extraDeg = 0): void => {
    const { pos, deg } = sampleAt(distAlong);
    out.push({
      position: pos,
      angleDeg: normAngle(deg + flip + extraDeg),
      style: arrows.style,
      size,
    });
  };

  switch (arrows.placement) {
    case 'end':
      pushMarker(total, 0);
      break;
    case 'start':
      pushMarker(0, 0);
      break;
    case 'both':
      pushMarker(0, 180);
      pushMarker(total, 0);
      break;
    case 'middle':
      pushMarker(total * 0.5, 0);
      break;
    case 'every_n': {
      const n = Math.max(1, Math.min(100, Math.round(arrows.segments ?? 2)));
      if (n === 1) {
        pushMarker(total * 0.5, 0);
      } else {
        for (let k = 1; k < n; k++) {
          pushMarker((total * k) / n, 0);
        }
      }
      break;
    }
  }
  return out;
}

/** Returns polygon/stroke geometry in local coordinates for a computed ArrowMarker. */
export function arrowMarkerShape(m: ArrowMarker): {
  kind: 'polygon' | 'open' | 'circle';
  filled: boolean;
  points: Point[];
  radius?: number;
} {
  const s = m.size;
  if (m.style === 'dot') {
    return { kind: 'circle', filled: true, points: [m.position], radius: s * 0.35 };
  }
  if (m.style === 'slash') {
    return {
      kind: 'open',
      filled: false,
      points: [
        polar(m.position, s * 0.55, m.angleDeg + 45),
        polar(m.position, s * 0.55, m.angleDeg - 135),
      ],
    };
  }
  const back = polar(m.position, s, m.angleDeg + 180);
  const w1 = polar(back, s * 0.42, m.angleDeg + 90);
  const w2 = polar(back, s * 0.42, m.angleDeg - 90);
  if (m.style === 'open') {
    return { kind: 'open', filled: false, points: [w1, m.position, w2] };
  }
  if (m.style === 'stealth') {
    const notch = polar(m.position, s * 0.65, m.angleDeg + 180);
    return { kind: 'polygon', filled: true, points: [m.position, w1, notch, w2] };
  }
  return {
    kind: 'polygon',
    filled: m.style === 'closed',
    points: [m.position, w1, w2],
  };
}

/** Samples points along a LineJump semicircle (excluding enter, including exit) for polyline renderers/PDF. */
export function sampleLineJumpArc(jump: LineJump, steps = 12): Point[] {
  const start = jump.startAngleDeg;
  const sweep = jump.ccw ? 180 : -180;
  const pts: Point[] = [];
  for (let i = 1; i <= steps; i++) {
    pts.push(polar(jump.center, jump.radius, start + (sweep * i) / steps));
  }
  return pts;
}

/** Uniformly scales an entity in world coordinates about `origin` by positive `factor`. */
export function scaleEntity(e: Entity, origin: Point, factor: number): void {
  if (!(factor > EPS && Number.isFinite(factor))) return;
  const scalePt = (p: Point): Point => ({
    x: origin.x + (p.x - origin.x) * factor,
    y: origin.y + (p.y - origin.y) * factor,
  });
  switch (e.type) {
    case 'line':
    case 'dimension':
      e.a = scalePt(e.a);
      e.b = scalePt(e.b);
      if (e.type === 'dimension' && e.offset !== undefined) e.offset *= factor;
      break;
    case 'polyline':
    case 'wire':
      e.points = e.points.map(scalePt);
      break;
    case 'circle':
    case 'arc':
      e.center = scalePt(e.center);
      e.radius = Math.max(EPS, e.radius * factor);
      break;
    case 'text':
      e.position = scalePt(e.position);
      e.height = Math.max(0.2, e.height * factor);
      break;
    case 'insert':
      e.position = scalePt(e.position);
      e.scale = { x: e.scale.x * factor, y: e.scale.y * factor };
      break;
  }
}

/** Copies CAD visual & style properties (layer, color, linetype, pattern, and type-specific style) from `source` to `target`. */
export function matchProperties(source: Entity, target: Entity): void {
  target.layer = source.layer;
  if (source.color !== undefined) target.color = source.color;
  else delete target.color;
  if (source.lineType !== undefined) target.lineType = source.lineType;
  else delete target.lineType;
  if (source.linePattern !== undefined) target.linePattern = [...source.linePattern];
  else delete target.linePattern;
  if (source.lineJump !== undefined) target.lineJump = source.lineJump;
  else delete target.lineJump;
  if (
    (source.type === 'line' || source.type === 'polyline' || source.type === 'wire') &&
    (target.type === 'line' || target.type === 'polyline' || target.type === 'wire')
  ) {
    if (source.arrows) target.arrows = clone(source.arrows);
    else delete target.arrows;
    if (source.discipline) target.discipline = source.discipline;
    else delete target.discipline;
    if (source.serviceTag) target.serviceTag = source.serviceTag;
    else delete target.serviceTag;
    if (source.pipeSpec) target.pipeSpec = source.pipeSpec;
    else delete target.pipeSpec;
    if (source.lineNotes) target.lineNotes = source.lineNotes;
    else delete target.lineNotes;
  }
  if (source.type === 'text' && target.type === 'text') {
    target.height = source.height;
  } else if (source.type === 'dimension' && target.type === 'dimension') {
    if (source.offset !== undefined) target.offset = source.offset;
  } else if (source.type === 'insert' && target.type === 'insert') {
    if (source.labelStyle) target.labelStyle = clone(source.labelStyle);
  }
}

export interface SearchMatch {
  pageId: string;
  pageName: string;
  entityId: string;
  entityType: Entity['type'];
  summary: string;
  matchedField: string;
  layerId: string;
  layerName: string;
  layerColor: number;
  layerVisible: boolean;
  layerLocked: boolean;
}

/** Searches entities across one or all pages and returns matches with explicit Layer metadata. */
export function searchDrawing(d: Drawing, query: string, layerFilter?: string): SearchMatch[] {
  const q = query.trim().toLocaleLowerCase();
  const layerMap = new Map(d.layers.map((l) => [l.id, l]));
  const blockMap = new Map(d.blocks.map((b) => [b.id, b]));
  const pages = d.pages?.length
    ? d.pages.map((p) =>
        p.id === d.activePageId ? { id: p.id, name: p.name, entities: d.entities } : p,
      )
    : [{ id: 'page-1', name: 'Page 1', entities: d.entities }];

  const matches: SearchMatch[] = [];
  for (const page of pages) {
    for (const e of page.entities) {
      if (layerFilter && layerFilter !== 'ALL' && e.layer !== layerFilter) continue;
      const layer = layerMap.get(e.layer) ?? d.layers[0];
      const layerName = layer?.name ?? e.layer;
      let summary = `${e.type.toUpperCase()}`;
      let haystack = `${e.id} ${e.type} ${layerName}`;
      let matchedField = 'Entity';

      if (e.type === 'text') {
        summary = `Text: "${e.text}"`;
        haystack += ` ${e.text}`;
        if (q && e.text.toLocaleLowerCase().includes(q)) matchedField = 'Text';
      } else if (e.type === 'insert') {
        const blk = blockMap.get(e.block);
        const tag = e.attributes.TAG || e.attributes.VALUE || e.attributes.VALORE || '';
        summary = `${tag ? `[${tag}] ` : ''}${blk?.name ?? e.block}`;
        const attrVals = Object.entries(e.attributes)
          .map(([k, v]) => `${k}:${v}`)
          .join(' ');
        haystack += ` ${blk?.name ?? ''} ${blk?.standard ?? ''} ${blk?.category ?? ''} ${attrVals}`;
        if (q && attrVals.toLocaleLowerCase().includes(q)) matchedField = 'Attribute / TAG';
        else if (q && (blk?.name ?? '').toLocaleLowerCase().includes(q)) matchedField = 'Symbol';
      } else if (e.type === 'dimension') {
        const label = e.text || `${distance(e.a, e.b).toFixed(2)} mm`;
        summary = `Dim: ${label}`;
        haystack += ` ${label}`;
        if (q && label.toLocaleLowerCase().includes(q)) matchedField = 'Dimension';
      } else if (e.type === 'line' || e.type === 'polyline' || e.type === 'wire') {
        const meta = [e.serviceTag, e.pipeSpec, e.lineNotes].filter(Boolean).join(' · ');
        const metaSuffix = meta ? ` — ${meta}` : '';
        if (e.type === 'line') {
          summary = `Line (${distance(e.a, e.b).toFixed(1)} mm)${metaSuffix}`;
        } else if (e.type === 'polyline') {
          summary = `Polyline (${e.points.length} pts${e.closed ? ', closed' : ''})${metaSuffix}`;
        } else {
          summary = `Wire (${e.points.length} pts)${metaSuffix}`;
        }
        const noteStr = `${e.discipline ?? ''} ${e.serviceTag ?? ''} ${e.pipeSpec ?? ''} ${e.lineNotes ?? ''}`;
        haystack += ` ${noteStr}`;
        if (q && noteStr.toLocaleLowerCase().includes(q)) matchedField = 'Line Note / Spec';
      } else if (e.type === 'circle') {
        summary = `Circle (R=${e.radius.toFixed(1)} mm)`;
      }
      if (q && layerName.toLocaleLowerCase().includes(q) && matchedField === 'Entity') {
        matchedField = 'Layer';
      }
      if (!q || haystack.toLocaleLowerCase().includes(q)) {
        matches.push({
          pageId: page.id,
          pageName: page.name,
          entityId: e.id,
          entityType: e.type,
          summary,
          matchedField,
          layerId: e.layer,
          layerName,
          layerColor: layer?.color ?? 7,
          layerVisible: layer?.visible ?? true,
          layerLocked: layer?.locked ?? false,
        });
      }
    }
  }
  return matches;
}

/**
 * Aligns selected editable entities to their common bounding-box center along X ('center-x',
 * vertical axis alignment) or Y ('center-y', horizontal axis alignment). When 1 entity is
 * selected, aligns its center to world axis 0.
 */
export function alignEntities(
  d: Drawing,
  ids: Set<string>,
  mode: 'center-x' | 'center-y',
): boolean {
  const targets = d.entities.filter((e) => ids.has(e.id) && isEditable(d, e));
  if (!targets.length) return false;
  const boxes = targets.map((e) => ({ entity: e, bounds: entityBounds(d, e) }));
  let targetCoord = 0;
  if (boxes.length >= 2) {
    const overall = unionBounds(boxes.map((b) => b.bounds));
    targetCoord =
      mode === 'center-x' ? (overall.minX + overall.maxX) / 2 : (overall.minY + overall.maxY) / 2;
  }
  let changed = false;
  for (const { entity, bounds } of boxes) {
    const curCoord =
      mode === 'center-x' ? (bounds.minX + bounds.maxX) / 2 : (bounds.minY + bounds.maxY) / 2;
    const delta = targetCoord - curCoord;
    if (Math.abs(delta) > 1e-6) {
      transformEntity(entity, {
        ...identity(),
        e: mode === 'center-x' ? delta : 0,
        f: mode === 'center-y' ? delta : 0,
      });
      changed = true;
    }
  }
  if (changed) updateWires(d);
  return changed;
}

/**
 * Merges `sourceLayerId` into `targetLayerId`, reassigning all entities across pages and block
 * definitions to `targetLayerId` and removing `sourceLayerId` (cannot remove default layer `'0'`).
 */
export function mergeLayers(d: Drawing, sourceLayerId: string, targetLayerId: string): boolean {
  if (!sourceLayerId || !targetLayerId || sourceLayerId === targetLayerId) return false;
  if (sourceLayerId === '0') return false;
  if (
    !d.layers.some((l) => l.id === sourceLayerId) ||
    !d.layers.some((l) => l.id === targetLayerId)
  )
    return false;
  for (const e of d.entities) if (e.layer === sourceLayerId) e.layer = targetLayerId;
  for (const page of d.pages ?? []) {
    for (const e of page.entities) if (e.layer === sourceLayerId) e.layer = targetLayerId;
  }
  for (const blk of d.blocks) {
    for (const e of blk.entities) if (e.layer === sourceLayerId) e.layer = targetLayerId;
  }
  d.layers = d.layers.filter((l) => l.id !== sourceLayerId);
  return true;
}

/** Builds a clean single-line text annotation string for Piping (P&ID) or Single-Line lines. */
export function formatLineAnnotation(e: Line | Polyline | Wire): string {
  return [e.serviceTag, e.pipeSpec, e.lineNotes]
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(' · ');
}

/** Computes midpoint & upright readable angle for rendering a line's Piping/Single-Line annotation. */
export function lineAnnotationPlacement(
  e: Line | Polyline | Wire,
): { position: Point; angleDeg: number; text: string } | undefined {
  const text = formatLineAnnotation(e);
  if (!text) return undefined;
  let bestA: Point | undefined;
  let bestB: Point | undefined;
  let bestLen = -1;
  if (e.type === 'line') {
    bestA = e.a;
    bestB = e.b;
    bestLen = distance(e.a, e.b);
  } else {
    const pts = e.type === 'polyline' && e.closed ? [...e.points, e.points[0]] : e.points;
    for (let i = 0; i < pts.length - 1; i++) {
      const len = distance(pts[i], pts[i + 1]);
      if (len > bestLen) {
        bestLen = len;
        bestA = pts[i];
        bestB = pts[i + 1];
      }
    }
  }
  if (!bestA || !bestB || bestLen < 1) return undefined;
  let deg = normAngle(angle(bestA, bestB));
  if (deg > 90 && deg <= 270) deg = normAngle(deg - 180);
  if (deg > 270) deg -= 360;
  const rad = (deg * Math.PI) / 180;
  const nx = -Math.sin(rad);
  const ny = Math.cos(rad);
  const mid = { x: (bestA.x + bestB.x) / 2, y: (bestA.y + bestB.y) / 2 };
  return {
    text,
    angleDeg: deg,
    position: { x: mid.x + nx * 2.2, y: mid.y + ny * 2.2 },
  };
}
