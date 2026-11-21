import { dashPattern } from '../core/linetypes';
import { Drawing, Entity, Point } from '../core/model';
import { buildSheetEntities } from '../core/sheet';
import {
  Bounds,
  FlatEntity,
  Grip,
  LineJump,
  add,
  arrowMarkerShape,
  computeLineArrowMarkers,
  computeLineJumps,
  drawingBounds,
  entityBounds,
  flatBounds,
  flatten,
  lineAnnotationPlacement,
  normAngle,
  overlaps,
  polar,
  transform,
} from '../core/geometry';
import { AlignmentGuide, Snap } from '../core/snap';

export type Theme = 'adaptive' | 'dark' | 'light' | 'blueprint';

export const MIN_CAMERA_SCALE = 0.05; // 20 mm per px (~25m viewport)
export const MAX_CAMERA_SCALE = 120; // 120 px per mm (sub-mm precision without infinite void)

export interface Palette {
  background: string;
  foreground: string;
  gridMinor: string;
  gridMajor: string;
  accent: string;
}

export const palettes: Record<Exclude<Theme, 'adaptive'>, Palette> = {
  dark: {
    background: '#16191d',
    foreground: '#eef2f6',
    gridMinor: '#21262d',
    gridMajor: '#2d343e',
    accent: '#4dc4ff',
  },
  light: {
    background: '#ffffff',
    foreground: '#182431',
    gridMinor: '#eef2f6',
    gridMajor: '#d5dde6',
    accent: '#0074ad',
  },
  blueprint: {
    background: '#103254',
    foreground: '#eef8ff',
    gridMinor: '#1b4269',
    gridMajor: '#285582',
    accent: '#ffe68a',
  },
};

function parseRgb(color: string): [number, number, number] | undefined {
  const m = color.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/i);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    if (h.length === 3) {
      return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
    }
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  return undefined;
}

export function palette(theme: Theme, element: HTMLElement): Palette {
  if (theme !== 'adaptive') return palettes[theme];
  const doc = element.ownerDocument;
  const win = doc.defaultView!;
  const hostEl = element.closest<HTMLElement>('.cad-root') ?? element;
  const hostCss = win.getComputedStyle(hostEl);
  const bodyCss = doc.body ? win.getComputedStyle(doc.body) : hostCss;

  const isTransparent = (c: string): boolean =>
    !c || c === 'transparent' || /rgba\([^)]*,\s*0\s*\)/i.test(c);
  const bgVar = hostCss.getPropertyValue('--background-primary').trim();
  const fgVar = hostCss.getPropertyValue('--text-normal').trim();
  const accVar = hostCss.getPropertyValue('--interactive-accent').trim();
  const borderVar = hostCss.getPropertyValue('--background-modifier-border').trim();

  const background =
    (!isTransparent(hostCss.backgroundColor) ? hostCss.backgroundColor : '') ||
    (!isTransparent(bodyCss.backgroundColor) ? bodyCss.backgroundColor : '') ||
    bgVar ||
    (doc.body?.classList.contains('theme-light') ? '#ffffff' : '#1c1f24');

  const foreground =
    hostCss.color ||
    bodyCss.color ||
    fgVar ||
    (doc.body?.classList.contains('theme-light') ? '#1f2328' : '#eeeeee');

  const rgb = parseRgb(background);
  const fgRgb = parseRgb(foreground);
  const isLight = rgb
    ? 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2] > 140
    : !!doc.body?.classList.contains('theme-light');

  const mixRgb = (a: [number, number, number], b: [number, number, number], t: number): string => {
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `rgb(${r}, ${g}, ${bl})`;
  };
  const gridTarget: [number, number, number] = fgRgb ?? (isLight ? [24, 36, 49] : [238, 242, 246]);
  const gridMinor = rgb
    ? mixRgb(rgb, gridTarget, isLight ? 0.06 : 0.05)
    : borderVar || (isLight ? '#e6ebf0' : '#262b33');
  const gridMajor = rgb
    ? mixRgb(rgb, gridTarget, isLight ? 0.14 : 0.12)
    : borderVar || (isLight ? '#cfd8e3' : '#353c47');
  const accent = accVar || (isLight ? '#0074ad' : '#5ca2ff');

  return {
    background,
    foreground,
    gridMinor,
    gridMajor,
    accent,
  };
}

export function aciColor(index: number, foreground = '#eeeeee'): string {
  if (index === 7 || index === 0 || index === 256) return foreground;
  const basic = [
    '',
    '#ff4848',
    '#e6c800',
    '#21bd53',
    '#00b9cc',
    '#5588ff',
    '#c963e5',
    foreground,
    '#808080',
    '#b0b0b0',
  ];
  if (index < 10) return basic[index] || foreground;
  if (index >= 250) {
    const v = [51, 80, 105, 130, 190, 255][Math.min(5, index - 250)];
    return `rgb(${v},${v},${v})`;
  }
  const hue = Math.floor((index - 10) / 10) * 15,
    shade = (index - 10) % 10,
    light = [50, 75, 40, 60, 30, 45, 20, 30, 10, 15][shade];
  return `hsl(${hue} ${shade % 2 ? 50 : 100}% ${light}%)`;
}

export class Camera {
  center: Point = { x: 0, y: 0 };
  scale = 4;
  width = 800;
  height = 600;

  world(p: Point): Point {
    return {
      x: (p.x - this.width / 2) / this.scale + this.center.x,
      y: -(p.y - this.height / 2) / this.scale + this.center.y,
    };
  }

  screen(p: Point): Point {
    return {
      x: (p.x - this.center.x) * this.scale + this.width / 2,
      y: -(p.y - this.center.y) * this.scale + this.height / 2,
    };
  }

  pan(dx: number, dy: number): void {
    this.center.x -= dx / this.scale;
    this.center.y += dy / this.scale;
  }

  zoom(factor: number, anchor: Point): void {
    const old = this.world(anchor);
    this.scale = Math.max(MIN_CAMERA_SCALE, Math.min(MAX_CAMERA_SCALE, this.scale * factor));
    const after = this.world(anchor);
    this.center.x += old.x - after.x;
    this.center.y += old.y - after.y;
  }

  fit(bounds: Bounds): void {
    this.center = {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2,
    };
    this.scale = Math.max(
      MIN_CAMERA_SCALE,
      Math.min(
        MAX_CAMERA_SCALE,
        Math.min(
          this.width / Math.max(20, bounds.maxX - bounds.minX + 20),
          this.height / Math.max(20, bounds.maxY - bounds.minY + 20),
        ) * 0.85,
      ),
    );
  }

  get bounds(): Bounds {
    const a = this.world({ x: 0, y: this.height }),
      b = this.world({ x: this.width, y: 0 });
    return { minX: a.x, minY: a.y, maxX: b.x, maxY: b.y };
  }

  /**
   * Computes a calm, non-chaotic 2-tier visual grid (minor + major) locked to exact multiples of `baseStep`.
   */
  visualGridStep(baseStep = 5): number {
    const validBase = baseStep > 0 && Number.isFinite(baseStep) ? baseStep : 5;
    const minPx = 14;
    if (validBase * this.scale >= minPx) return validBase;
    const multipliers = [2, 5, 10, 20, 50, 100, 200, 500];
    for (const m of multipliers) {
      if (validBase * m * this.scale >= minPx) return validBase * m;
    }
    return validBase * 500;
  }
}

export interface Overlay {
  selected: Set<string>;
  preview: Entity[];
  cursor?: Point;
  snap?: Snap;
  pen: boolean;
  penLoupe?: boolean;
  box?: { a: Point; b: Point; crossing: boolean };
  guides?: AlignmentGuide[];
  polarRay?: { origin: Point; angle: number };
  grips?: Grip[];
  activeGripId?: string;
  highlightId?: string;
  crossingHighlight?: Point;
}

export class CanvasRenderer {
  readonly camera = new Camera();
  theme: Theme = 'adaptive';
  grid = true;
  /** Unified reference grid step in millimeters. Toggling gridSnap never creates a second grid. */
  gridStep = 1;
  private context: CanvasRenderingContext2D;
  private cache: FlatEntity[] = [];
  private jumpCache = new Map<string, LineJump[]>();
  private cached?: Drawing;

  constructor(readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D is not available');
    this.context = context;
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect(),
      ratio = this.canvas.ownerDocument.defaultView!.devicePixelRatio || 1;
    this.camera.width = Math.max(1, rect.width);
    this.camera.height = Math.max(1, rect.height);
    const w = Math.round(rect.width * ratio),
      h = Math.round(rect.height * ratio);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  fit(d: Drawing): void {
    this.resize();
    const sheetEntities = d.sheet?.enabled ? buildSheetEntities(d.sheet) : [];
    if (sheetEntities.length) {
      const all = { ...d, entities: [...d.entities, ...sheetEntities] };
      this.camera.fit(drawingBounds(all));
    } else {
      this.camera.fit(drawingBounds(d));
    }
  }

  render(d: Drawing, o: Overlay): void {
    this.resize();
    const ctx = this.context,
      c = this.camera,
      p = palette(this.theme, this.canvas),
      ratio = this.canvas.width / c.width;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = p.background;
    ctx.fillRect(0, 0, c.width, c.height);

    if (this.grid) {
      const minor = c.visualGridStep(this.gridStep),
        major = minor * 5,
        b = c.bounds;

      const drawGridTier = (step: number, color: string, alpha: number): void => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const startIndexX = Math.ceil(b.minX / step),
          startIndexY = Math.ceil(b.minY / step),
          countX = Math.min(250, Math.ceil(c.width / (step * c.scale)) + 1),
          countY = Math.min(250, Math.ceil(c.height / (step * c.scale)) + 1);
        for (let i = 0; i < countX; i++) {
          const x = (startIndexX + i) * step,
            s = c.screen({ x, y: 0 });
          ctx.moveTo(Math.round(s.x) + 0.5, 0);
          ctx.lineTo(Math.round(s.x) + 0.5, c.height);
        }
        for (let i = 0; i < countY; i++) {
          const y = (startIndexY + i) * step,
            s = c.screen({ x: 0, y });
          ctx.moveTo(0, Math.round(s.y) + 0.5);
          ctx.lineTo(c.width, Math.round(s.y) + 0.5);
        }
        ctx.stroke();
        ctx.restore();
      };

      drawGridTier(minor, p.gridMinor, this.theme === 'adaptive' ? 0.25 : 0.75);
      drawGridTier(major, p.gridMajor, this.theme === 'adaptive' ? 0.55 : 0.95);

      const origin = c.screen({ x: 0, y: 0 });
      ctx.save();
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.45;
      // Subtle X (coral) and Y (emerald) CAD origin axes
      ctx.strokeStyle = '#e06c75';
      ctx.beginPath();
      ctx.moveTo(0, Math.round(origin.y) + 0.5);
      ctx.lineTo(c.width, Math.round(origin.y) + 0.5);
      ctx.stroke();

      ctx.strokeStyle = '#4ec9b0';
      ctx.beginPath();
      ctx.moveTo(Math.round(origin.x) + 0.5, 0);
      ctx.lineTo(Math.round(origin.x) + 0.5, c.height);
      ctx.stroke();
      ctx.restore();
    }

    if (d.sheet?.enabled) {
      const sheetFlats = flatten(d, buildSheetEntities(d.sheet));
      for (const f of sheetFlats) {
        if (!overlaps(flatBounds(f), c.bounds)) continue;
        this.draw(f, d, p, false, ratio);
      }
    }

    if (this.cached !== d) {
      this.cached = d;
      this.cache = flatten(d);
      this.jumpCache = computeLineJumps(d);
    }
    for (const f of this.cache) {
      if (!overlaps(flatBounds(f), c.bounds)) continue;
      this.draw(f, d, p, o.selected.has(f.owner), ratio, this.jumpCache);
    }
    for (const f of flatten(d, o.preview)) this.draw(f, d, p, true, ratio);

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.setLineDash([]);
    ctx.lineWidth = 1;

    // Render Polar Tracking ray
    if (o.polarRay) {
      const s0 = c.screen(o.polarRay.origin);
      const rad = (o.polarRay.angle * Math.PI) / 180;
      const dx = Math.cos(rad) * 4000,
        dy = -Math.sin(rad) * 4000;
      ctx.save();
      ctx.strokeStyle = '#37cf84';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(s0.x - dx, s0.y - dy);
      ctx.lineTo(s0.x + dx, s0.y + dy);
      ctx.stroke();
      ctx.restore();
    }

    // Render Smart Alignment / Object Snap Tracking guides
    if (o.guides?.length) {
      ctx.save();
      ctx.strokeStyle = '#38d9f5';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.85;
      for (const g of o.guides) {
        const a = c.screen(g.from),
          b = c.screen(g.to);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // Acquisition cross on source anchor
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(a.x - 4, a.y);
        ctx.lineTo(a.x + 4, a.y);
        ctx.moveTo(a.x, a.y - 4);
        ctx.lineTo(a.x, a.y + 4);
        ctx.stroke();
        ctx.setLineDash([4, 4]);
      }
      ctx.restore();
    }

    // Render Multifunctional Grips on selected objects
    if (o.grips?.length) {
      ctx.save();
      for (const g of o.grips) {
        const s = c.screen(g.point);
        const active = g.id === o.activeGripId;
        const size = active ? 6 : 4.5;
        ctx.fillStyle = active
          ? '#ff7a45'
          : g.kind === 'rotate'
            ? '#f4c24e'
            : g.kind === 'scale'
              ? '#c963e5'
              : g.kind === 'label'
                ? '#2ec486'
                : '#4dc4ff';
        ctx.strokeStyle = p.background;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (g.kind === 'center' || g.kind === 'rotate') {
          ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        } else if (g.kind === 'midpoint' || g.kind === 'offset' || g.kind === 'label') {
          ctx.moveTo(s.x, s.y - size - 1);
          ctx.lineTo(s.x + size + 1, s.y);
          ctx.lineTo(s.x, s.y + size + 1);
          ctx.lineTo(s.x - size - 1, s.y);
          ctx.closePath();
        } else {
          ctx.rect(s.x - size, s.y - size, size * 2, size * 2);
        }
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    if (o.highlightId) {
      const target = d.entities.find((ent) => ent.id === o.highlightId);
      if (target) {
        const b = entityBounds(d, target);
        const sa = c.screen({ x: b.minX, y: b.maxY }),
          sb = c.screen({ x: b.maxX, y: b.minY });
        ctx.save();
        ctx.strokeStyle = '#ffaa2b';
        ctx.fillStyle = 'rgba(255, 170, 43, 0.14)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        const x = sa.x - 8,
          y = sa.y - 8,
          w = Math.max(18, sb.x - sa.x + 16),
          h = Math.max(18, sb.y - sa.y + 16);
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
        ctx.restore();
      }
    }

    if (o.crossingHighlight) {
      const sp = c.screen(o.crossingHighlight);
      ctx.save();
      ctx.strokeStyle = '#ff9d2b';
      ctx.fillStyle = 'rgba(255, 157, 43, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (o.box) {
      const a = c.screen(o.box.a),
        b = c.screen(o.box.b);
      ctx.strokeStyle = o.box.crossing ? '#37cf84' : '#55aaff';
      ctx.fillStyle = o.box.crossing ? 'rgba(55,207,132,.13)' : 'rgba(85,170,255,.13)';
      ctx.setLineDash(o.box.crossing ? [5, 4] : []);
      ctx.fillRect(a.x, a.y, b.x - a.x, b.y - a.y);
      ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
      ctx.setLineDash([]);
    }

    if (o.cursor) {
      const q = c.screen(o.cursor);
      ctx.strokeStyle = p.foreground;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(q.x - 10, q.y);
      ctx.lineTo(q.x + 10, q.y);
      ctx.moveTo(q.x, q.y - 10);
      ctx.lineTo(q.x, q.y + 10);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (o.penLoupe && o.cursor) {
      const q = c.screen(o.cursor),
        size = 76,
        target = {
          x: Math.max(size / 2 + 6, Math.min(c.width - size / 2 - 6, q.x)),
          y: Math.max(size / 2 + 6, q.y - 102),
        };
      ctx.save();
      ctx.beginPath();
      ctx.arc(target.x, target.y, size / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = p.background;
      ctx.fillRect(target.x - size / 2, target.y - size / 2, size, size);
      ctx.drawImage(
        this.canvas,
        (q.x - size / 4) * ratio,
        (q.y - size / 4) * ratio,
        (size / 2) * ratio,
        (size / 2) * ratio,
        target.x - size / 2,
        target.y - size / 2,
        size,
        size,
      );
      ctx.restore();
      ctx.strokeStyle = p.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(target.x, target.y, size / 2, 0, Math.PI * 2);
      ctx.moveTo(target.x - 7, target.y);
      ctx.lineTo(target.x + 7, target.y);
      ctx.moveTo(target.x, target.y - 7);
      ctx.lineTo(target.x, target.y + 7);
      ctx.stroke();
    }

    if (o.snap) {
      const q = c.screen(o.snap.point),
        v = { x: q.x, y: q.y - (o.pen ? 44 : 0) };
      ctx.strokeStyle =
        o.snap.kind === 'Tracking' || o.snap.kind === 'Extension' ? '#38d9f5' : '#f4c24e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (o.pen) {
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(v.x, v.y + 8);
      }
      switch (o.snap.kind) {
        case 'Endpoint':
          ctx.rect(v.x - 6, v.y - 6, 12, 12);
          break;
        case 'Midpoint':
          ctx.moveTo(v.x, v.y - 7);
          ctx.lineTo(v.x + 7, v.y + 6);
          ctx.lineTo(v.x - 7, v.y + 6);
          ctx.closePath();
          break;
        case 'Center':
          ctx.moveTo(v.x + 7, v.y);
          ctx.arc(v.x, v.y, 7, 0, Math.PI * 2);
          break;
        case 'Quadrant':
          ctx.moveTo(v.x, v.y - 7);
          ctx.lineTo(v.x + 7, v.y);
          ctx.lineTo(v.x, v.y + 7);
          ctx.lineTo(v.x - 7, v.y);
          ctx.closePath();
          break;
        case 'Intersection':
          ctx.moveTo(v.x - 6, v.y - 6);
          ctx.lineTo(v.x + 6, v.y + 6);
          ctx.moveTo(v.x - 6, v.y + 6);
          ctx.lineTo(v.x + 6, v.y - 6);
          break;
        case 'Perpendicular':
          ctx.moveTo(v.x - 6, v.y + 6);
          ctx.lineTo(v.x - 6, v.y - 6);
          ctx.moveTo(v.x - 6, v.y + 6);
          ctx.lineTo(v.x + 6, v.y + 6);
          ctx.rect(v.x - 6, v.y, 6, 6);
          break;
        case 'Extension':
        case 'Tracking':
        case 'Grid':
          ctx.moveTo(v.x - 5, v.y);
          ctx.lineTo(v.x + 5, v.y);
          ctx.moveTo(v.x, v.y - 5);
          ctx.lineTo(v.x, v.y + 5);
          break;
        case 'Port':
          ctx.moveTo(v.x, v.y - 8);
          ctx.lineTo(v.x + 8, v.y);
          ctx.lineTo(v.x, v.y + 8);
          ctx.lineTo(v.x - 8, v.y);
          ctx.closePath();
          break;
      }
      ctx.stroke();
      ctx.font = '11px sans-serif';
      ctx.fillStyle = p.foreground;
      ctx.fillText(o.snap.kind, v.x + 12, v.y - 10);
    }
  }

  private draw(
    f: FlatEntity,
    d: Drawing,
    p: Palette,
    selected: boolean,
    ratio: number,
    jumps?: Map<string, LineJump[]>,
  ): void {
    const ctx = this.context,
      c = this.camera,
      m = f.matrix,
      e = f.entity,
      l = d.layers.find((l) => l.id === f.layer);
    ctx.setTransform(
      ratio * c.scale,
      0,
      0,
      -ratio * c.scale,
      ratio * (c.width / 2 - c.center.x * c.scale),
      ratio * (c.height / 2 + c.center.y * c.scale),
    );
    ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
    const localScale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1;
    ctx.lineWidth = (selected ? 2.3 : 1.3) / c.scale / localScale;
    ctx.strokeStyle = ctx.fillStyle = selected
      ? p.accent
      : aciColor(f.color && f.color !== 256 ? f.color : (l?.color ?? 7), p.foreground);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const lt = f.lineType ?? l?.lineType;
    const lp = f.linePattern ?? l?.linePattern;
    ctx.setLineDash(dashPattern(lt ?? 'CONTINUOUS', lp));
    ctx.beginPath();
    const isTopLevel = e.id === f.owner;
    const drawSegWithJumps = (a: Point, b: Point, segIdx: number, moveStart: boolean): void => {
      if (moveStart) ctx.moveTo(a.x, a.y);
      const list = isTopLevel ? jumps?.get(`${e.id}:${segIdx}`) : undefined;
      if (list?.length) {
        for (const j of list) {
          ctx.lineTo(j.enter.x, j.enter.y);
          ctx.arc(
            j.center.x,
            j.center.y,
            j.radius,
            (j.startAngleDeg * Math.PI) / 180,
            (j.endAngleDeg * Math.PI) / 180,
            !j.ccw,
          );
        }
      }
      ctx.lineTo(b.x, b.y);
    };
    switch (e.type) {
      case 'line':
        drawSegWithJumps(e.a, e.b, 0, true);
        break;
      case 'polyline':
      case 'wire':
        {
          const pts = e.points;
          if (pts.length) {
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 0; i < pts.length - 1; i++) {
              drawSegWithJumps(pts[i], pts[i + 1], i, false);
            }
            if (e.type === 'polyline' && e.closed && pts.length > 2) {
              drawSegWithJumps(pts[pts.length - 1], pts[0], pts.length - 1, false);
              ctx.closePath();
            }
          }
          break;
        }
        break;
      case 'circle':
        ctx.arc(e.center.x, e.center.y, e.radius, 0, 2 * Math.PI);
        break;
      case 'arc':
        ctx.arc(
          e.center.x,
          e.center.y,
          e.radius,
          (e.start * Math.PI) / 180,
          ((e.start + normAngle(e.end - e.start)) * Math.PI) / 180,
        );
        break;
      case 'text': {
        const det = m.a * m.d - m.b * m.c;
        const worldPos = transform(e.position, m);
        const worldUnitX = transform(add(e.position, polar({ x: 0, y: 0 }, 1, e.rotation)), m);
        const vx = worldUnitX.x - worldPos.x;
        const vy = worldUnitX.y - worldPos.y;
        let screenRad = Math.atan2(-vy, vx);
        const fontPx = Math.max(0.5, e.height * localScale * c.scale);
        ctx.save();
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.font = `${fontPx}px monospace`;
        if (det < 0) {
          // Keep internal block text readable and un-mirrored even after mirroring
          const estW = Array.from(e.text).length * e.height * 0.6;
          const worldCenter = transform(
            add(e.position, polar({ x: 0, y: 0 }, estW * 0.5, e.rotation)),
            m,
          );
          const sc = c.screen(worldCenter);
          if (screenRad > Math.PI / 2) screenRad -= Math.PI;
          else if (screenRad < -Math.PI / 2) screenRad += Math.PI;
          ctx.translate(sc.x, sc.y);
          ctx.rotate(screenRad);
          ctx.textAlign = 'center';
          ctx.fillText(e.text, 0, 0);
        } else {
          const sp = c.screen(worldPos);
          ctx.translate(sp.x, sp.y);
          ctx.rotate(screenRad);
          ctx.fillText(e.text, 0, 0);
        }
        ctx.restore();
        return;
      }
    }
    ctx.stroke();
    if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && e.arrows) {
      const pathPts = e.type === 'line' ? [e.a, e.b] : e.points;
      const closed = e.type === 'polyline' && e.closed;
      const markers = computeLineArrowMarkers(pathPts, closed, e.arrows);
      if (markers.length) {
        ctx.save();
        ctx.setLineDash([]);
        for (const mk of markers) {
          const shp = arrowMarkerShape(mk);
          ctx.beginPath();
          if (shp.kind === 'circle') {
            ctx.arc(shp.points[0].x, shp.points[0].y, shp.radius ?? 1, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            shp.points.forEach((pt, idx) =>
              idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y),
            );
            if (shp.kind === 'polygon') ctx.closePath();
            if (shp.filled) ctx.fill();
            else if (shp.kind === 'polygon') {
              ctx.save();
              ctx.fillStyle = p.background;
              ctx.fill();
              ctx.restore();
            }
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    }
    if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && isTopLevel) {
      const anno = lineAnnotationPlacement(e);
      if (anno) {
        const textH = Math.max(2.0, (d.projectSettings?.defaultTextHeight ?? 2.6) * 0.85);
        const fontPx = Math.max(8, textH * c.scale);
        const sc = c.screen(transform(anno.position, m));
        ctx.save();
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.font = `${fontPx}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(sc.x, sc.y);
        ctx.rotate((-anno.angleDeg * Math.PI) / 180);
        ctx.fillText(anno.text, 0, 0);
        ctx.restore();
      }
    }
  }
}

const xml = (s: string): string =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  );
const n = (v: number): string => String(v);

export function toSvg(
  d: Drawing,
  foreground = '#243447',
  background = 'transparent',
  strokeWidth = 0.25,
): string {
  const sheetEntities = d.sheet?.enabled ? buildSheetEntities(d.sheet) : [];
  const fullDrawing = sheetEntities.length
    ? { ...d, entities: [...sheetEntities, ...d.entities] }
    : d;
  const b = drawingBounds(fullDrawing),
    pad = 10,
    width = Math.max(20, b.maxX - b.minX + pad * 2),
    height = Math.max(20, b.maxY - b.minY + pad * 2),
    jumps = computeLineJumps(d);
  const svgSegPath = (
    id: string,
    isTopLevel: boolean,
    a: Point,
    b: Point,
    segIdx: number,
  ): string => {
    const list = isTopLevel ? jumps.get(`${id}:${segIdx}`) : undefined;
    if (!list?.length) return ` L ${n(b.x)} ${n(b.y)}`;
    return (
      list
        .map(
          (j) =>
            ` L ${n(j.enter.x)} ${n(j.enter.y)} A ${n(j.radius)} ${n(j.radius)} 0 0 ${j.ccw ? 1 : 0} ${n(j.exit.x)} ${n(j.exit.y)}`,
        )
        .join('') + ` L ${n(b.x)} ${n(b.y)}`
    );
  };
  const elements = flatten(fullDrawing).map((f) => {
    const e = f.entity,
      m = f.matrix,
      isTopLevel = e.id === f.owner,
      l = d.layers.find((l) => l.id === f.layer),
      color = aciColor(f.color && f.color !== 256 ? f.color : (l?.color ?? 7), foreground),
      type = f.lineType ?? l?.lineType,
      lp = f.linePattern ?? l?.linePattern,
      dash = dashPattern(type ?? 'CONTINUOUS', lp).join(' ');
    let shape = '';
    let arrowMarkup = '';
    if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && e.arrows) {
      const pathPts = e.type === 'line' ? [e.a, e.b] : e.points;
      const closed = e.type === 'polyline' && e.closed;
      arrowMarkup = computeLineArrowMarkers(pathPts, closed, e.arrows)
        .map((mk) => {
          const shp = arrowMarkerShape(mk);
          if (shp.kind === 'circle') {
            return `<circle cx="${n(shp.points[0].x)}" cy="${n(shp.points[0].y)}" r="${n(shp.radius ?? 1)}" fill="${xml(color)}" stroke="none"/>`;
          }
          const dAttr =
            shp.points
              .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${n(pt.x)} ${n(pt.y)}`)
              .join(' ') + (shp.kind === 'polygon' ? ' Z' : '');
          return `<path d="${dAttr}" fill="${shp.filled ? xml(color) : 'none'}" stroke-dasharray="none"/>`;
        })
        .join('');
    }
    switch (e.type) {
      case 'line':
        shape = `<path d="M ${n(e.a.x)} ${n(e.a.y)}${svgSegPath(e.id, isTopLevel, e.a, e.b, 0)}"/>`;
        break;
      case 'polyline':
      case 'wire': {
        const pts = e.points;
        if (pts.length) {
          let dStr = `M ${n(pts[0].x)} ${n(pts[0].y)}`;
          for (let i = 0; i < pts.length - 1; i++) {
            dStr += svgSegPath(e.id, isTopLevel, pts[i], pts[i + 1], i);
          }
          if (e.type === 'polyline' && e.closed && pts.length > 2) {
            dStr +=
              svgSegPath(e.id, isTopLevel, pts[pts.length - 1], pts[0], pts.length - 1) + ' Z';
          }
          shape = `<path d="${dStr}"/>`;
        }
        break;
      }
      case 'circle':
        shape = `<circle cx="${n(e.center.x)}" cy="${n(e.center.y)}" r="${n(e.radius)}"/>`;
        break;
      case 'arc': {
        const a = polar(e.center, e.radius, e.start),
          end = polar(e.center, e.radius, e.end);
        shape = `<path d="M ${n(a.x)} ${n(a.y)} A ${n(e.radius)} ${n(e.radius)} 0 ${normAngle(e.end - e.start) > 180 ? 1 : 0} 1 ${n(end.x)} ${n(end.y)}"/>`;
        break;
      }
      case 'text':
        shape = `<text transform="translate(${n(e.position.x)} ${n(e.position.y)}) rotate(${n(e.rotation)}) scale(1 -1)" font-size="${n(e.height)}" font-family="monospace" fill="${xml(color)}" stroke="none">${xml(e.text)}</text>`;
        break;
    }
    let lineAnnoMarkup = '';
    if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && isTopLevel) {
      const anno = lineAnnotationPlacement(e);
      if (anno) {
        const textH = Math.max(2.0, (d.projectSettings?.defaultTextHeight ?? 2.6) * 0.85);
        lineAnnoMarkup = `<text transform="translate(${n(anno.position.x)} ${n(anno.position.y)}) rotate(${n(anno.angleDeg)}) scale(1 -1)" text-anchor="middle" font-size="${n(textH)}" font-family="monospace" fill="${xml(color)}" stroke="none">${xml(anno.text)}</text>`;
      }
    }
    return `<g transform="matrix(${[m.a, m.b, m.c, m.d, m.e, m.f].map(n).join(' ')})" fill="none" stroke="${xml(color)}" stroke-width="${n(strokeWidth)}" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}>${shape}${arrowMarkup}${lineAnnoMarkup}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n(b.minX - pad)} ${n(-b.maxY - pad)} ${n(width)} ${n(height)}" role="img" aria-label="CAD drawing in millimeters"><rect x="${n(b.minX - pad)}" y="${n(-b.maxY - pad)}" width="${n(width)}" height="${n(height)}" fill="${xml(background)}"/><g transform="scale(1 -1)">${elements.join('')}</g></svg>`;
}
