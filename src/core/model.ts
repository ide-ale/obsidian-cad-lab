export interface Point {
  x: number;
  y: number;
}
import { LINE_TYPES, LineType } from './linetypes';
export type { LineType } from './linetypes';
export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  color: number;
  lineType: LineType;
  linePattern?: number[];
}
export type LineDiscipline = 'general' | 'piping' | 'single-line';
export type ArrowStyle = 'closed' | 'open' | 'stealth' | 'triangle' | 'dot' | 'slash';
export type ArrowPlacement = 'end' | 'start' | 'both' | 'middle' | 'every_n';
export interface LineArrows {
  style: ArrowStyle;
  placement: ArrowPlacement;
  segments?: number;
  reversed?: boolean;
  size?: number;
}
interface Base {
  id: string;
  layer: string;
  color?: number;
  lineType?: LineType;
  linePattern?: number[];
  lineJump?: 'auto' | 'always' | 'never';
}
export interface Line extends Base {
  type: 'line';
  a: Point;
  b: Point;
  from?: Attachment;
  to?: Attachment;
  arrows?: LineArrows;
  discipline?: LineDiscipline;
  serviceTag?: string;
  pipeSpec?: string;
  lineNotes?: string;
}
export interface Polyline extends Base {
  type: 'polyline';
  points: Point[];
  closed: boolean;
  from?: Attachment;
  to?: Attachment;
  arrows?: LineArrows;
  discipline?: LineDiscipline;
  serviceTag?: string;
  pipeSpec?: string;
  lineNotes?: string;
}
export interface Circle extends Base {
  type: 'circle';
  center: Point;
  radius: number;
}
export interface Arc extends Base {
  type: 'arc';
  center: Point;
  radius: number;
  start: number;
  end: number;
}
export interface TextEntity extends Base {
  type: 'text';
  position: Point;
  text: string;
  height: number;
  rotation: number;
}
export type LabelAnchor =
  | 'default'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export interface LabelStyle {
  anchor?: LabelAnchor;
  textHeight?: number;
  rotateWithBlock?: boolean;
  textRotation?: number;
  scaleWithBlock?: boolean;
  textOffset?: Point;
}
export interface Insert extends Base {
  type: 'insert';
  block: string;
  position: Point;
  rotation: number;
  scale: Point;
  attributes: Record<string, string>;
  labelStyle?: LabelStyle;
}
export interface Attachment {
  insertId: string;
  portId: string;
}
export interface Wire extends Base {
  type: 'wire';
  points: Point[];
  from?: Attachment;
  to?: Attachment;
  arrows?: LineArrows;
  discipline?: LineDiscipline;
  serviceTag?: string;
  pipeSpec?: string;
  lineNotes?: string;
}
export type DimensionKind = 'aligned' | 'horizontal' | 'vertical' | 'diameter' | 'radius';
export interface DimensionEntity extends Base {
  type: 'dimension';
  kind?: DimensionKind;
  a: Point;
  b: Point;
  offset?: number;
  text?: string;
}
export type Entity = Line | Polyline | Circle | Arc | TextEntity | Insert | Wire | DimensionEntity;
export interface Port {
  id: string;
  point: Point;
  direction: Point;
}
export interface Block {
  id: string;
  name: string;
  category: string;
  library?: string;
  group?: string;
  standard?: string;
  entities: Entity[];
  ports: Port[];
  attributes: Record<string, string>;
}
export type SheetSize =
  'A4' | 'A3' | 'A2' | 'A1' | 'A0' | 'ANSI-A' | 'ANSI-B' | 'ANSI-C' | 'ANSI-D';
export type SheetOrientation = 'landscape' | 'portrait';
export interface TitleBlockData {
  project: string;
  title: string;
  drawingNumber: string;
  revision: string;
  scale: string;
  units: string;
  standard: string;
  author: string;
  date: string;
  company: string;
  sheet: string;
  notes: string;
}
export type TitleBlockMode = 'none' | 'virtual' | 'real';
export type TitleBlockStandard = 'ISO-7200' | 'ANSI-Y14' | 'MINIMAL';
export interface SheetSetup {
  enabled: boolean;
  titleBlockMode?: TitleBlockMode;
  titleBlockStandard?: TitleBlockStandard;
  size: SheetSize;
  orientation: SheetOrientation;
  scale: string;
  autoScaleInserts?: boolean;
  marginMm?: number;
  center?: Point;
  titleBlock: TitleBlockData;
}
export type LabelOrientation = 'horizontal' | 'vertical' | 'follow';
export type JumpPriority = 'horizontal' | 'vertical';
export type JumpScope = 'all' | 'wires';
export type ConnectorRoutingMode = 'straight_to_polyline' | 'keep_original';
export interface ProjectSettings {
  defaultTextHeight?: number;
  defaultLabelAnchor?: LabelAnchor;
  defaultLabelOrientation?: LabelOrientation;
  defaultLabelScaleWithBlock?: boolean;
  lineJumps?: boolean;
  jumpRadius?: number;
  jumpPriority?: JumpPriority;
  jumpScope?: JumpScope;
  dynamicPortConnectors?: boolean;
  connectorRoutingMode?: ConnectorRoutingMode;
}
export interface DrawingPage {
  id: string;
  name: string;
  entities: Entity[];
  scale?: string;
  sheet?: SheetSetup;
}
export interface Drawing {
  version: 1;
  units: 'mm';
  scale?: string;
  sheet?: SheetSetup;
  projectSettings?: ProjectSettings;
  layers: Layer[];
  blocks: Block[];
  entities: Entity[];
  manualJumpKeys?: string[];
  excludedJumpKeys?: string[];
  jumpDirectionOverrides?: Record<string, 'horizontal' | 'vertical'>;
  pages?: DrawingPage[];
  activePageId?: string;
}
export function defaultProjectSettings(): Required<ProjectSettings> {
  return {
    defaultTextHeight: 3,
    defaultLabelAnchor: 'default',
    defaultLabelOrientation: 'horizontal',
    defaultLabelScaleWithBlock: false,
    lineJumps: false,
    jumpRadius: 2.5,
    jumpPriority: 'horizontal',
    jumpScope: 'all',
    dynamicPortConnectors: false,
    connectorRoutingMode: 'straight_to_polyline',
  };
}
let sequence = 0;
export const uid = (): string =>
  `cad-${Date.now().toString(36)}-${(++sequence).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
export const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
export function emptyDrawing(blocks: Block[] = []): Drawing {
  return {
    version: 1,
    units: 'mm',
    layers: [
      {
        id: '0',
        name: '0',
        visible: true,
        locked: false,
        color: 7,
        lineType: 'CONTINUOUS',
      },
      {
        id: 'PIPES',
        name: 'PIPES',
        visible: true,
        locked: false,
        color: 4,
        lineType: 'CONTINUOUS',
      },
      {
        id: 'SIGNALS',
        name: 'SIGNALS',
        visible: true,
        locked: false,
        color: 3,
        lineType: 'DASHED',
      },
    ],
    blocks,
    entities: [],
  };
}
export function isEditable(drawing: Drawing, entity: Entity): boolean {
  const layer = drawing.layers.find((l) => l.id === entity.layer);
  return !!layer && layer.visible && !layer.locked;
}
const VALID_SHEET_SIZES = new Set<string>([
  'A4',
  'A3',
  'A2',
  'A1',
  'A0',
  'ANSI-A',
  'ANSI-B',
  'ANSI-C',
  'ANSI-D',
]);
const VALID_DIM_KINDS = new Set<string>([
  'aligned',
  'horizontal',
  'vertical',
  'diameter',
  'radius',
]);
const VALID_LABEL_ANCHORS = new Set<string>([
  'default',
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
]);
export function validateDrawing(input: unknown): Drawing {
  const fail = (message: string): never => {
    throw new Error(`Invalid CAD data: ${message}`);
  };
  const obj = (v: unknown): Record<string, unknown> =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : fail('expected an object');
  const num = (v: unknown): number =>
    typeof v === 'number' && Number.isFinite(v) && Math.abs(v) < 1e15
      ? v
      : fail('number out of range');
  const str = (v: unknown): string =>
    typeof v === 'string' && v.length < 1000000 ? v : fail('expected text');
  const arr = (v: unknown): unknown[] =>
    Array.isArray(v) && v.length < 200000 ? v : fail('array missing or too large');
  const pt = (v: unknown): void => {
    const p = obj(v);
    num(p.x);
    num(p.y);
  };
  const attrs = (v: unknown): void => {
    for (const [k, val] of Object.entries(obj(v))) {
      if (['__proto__', 'constructor', 'prototype'].includes(k)) fail('reserved key');
      str(val);
    }
  };
  const unique = (items: unknown[]): void => {
    const ids = items.map((i) => str(obj(i).id));
    if (new Set(ids).size !== ids.length) fail('duplicate identifiers');
  };
  const root = obj(input);
  if (root.version !== 1 || root.units !== 'mm') fail('unsupported version or units');
  if (root.scale !== undefined) str(root.scale);
  if (root.activePageId !== undefined) str(root.activePageId);
  const validateSheet = (rawSheet: unknown): void => {
    const sh = obj(rawSheet);
    if (typeof sh.enabled !== 'boolean') fail('sheet enabled flag');
    if (!VALID_SHEET_SIZES.has(str(sh.size))) fail('sheet size');
    if (sh.orientation !== 'landscape' && sh.orientation !== 'portrait') fail('sheet orientation');
    str(sh.scale);
    if (
      sh.titleBlockMode !== undefined &&
      !['none', 'virtual', 'real'].includes(str(sh.titleBlockMode))
    )
      fail('titleBlockMode');
    if (
      sh.titleBlockStandard !== undefined &&
      !['ISO-7200', 'ANSI-Y14', 'MINIMAL'].includes(str(sh.titleBlockStandard))
    )
      fail('titleBlockStandard');
    if (sh.autoScaleInserts !== undefined && typeof sh.autoScaleInserts !== 'boolean')
      fail('sheet autoScaleInserts');
    if (sh.marginMm !== undefined && (num(sh.marginMm) < 0 || num(sh.marginMm) > 100))
      fail('sheet marginMm');
    if (sh.center !== undefined) pt(sh.center);
    const tb = obj(sh.titleBlock);
    for (const key of [
      'project',
      'title',
      'drawingNumber',
      'revision',
      'scale',
      'units',
      'standard',
      'author',
      'date',
      'company',
      'sheet',
      'notes',
    ])
      if (tb[key] !== undefined) str(tb[key]);
  };
  if (root.sheet !== undefined) validateSheet(root.sheet);
  if (root.projectSettings !== undefined) {
    const ps = obj(root.projectSettings);
    if (ps.defaultTextHeight !== undefined && num(ps.defaultTextHeight) <= 0)
      fail('defaultTextHeight');
    if (ps.defaultLabelAnchor !== undefined && !VALID_LABEL_ANCHORS.has(str(ps.defaultLabelAnchor)))
      fail('defaultLabelAnchor');
    if (
      ps.defaultLabelOrientation !== undefined &&
      !['horizontal', 'vertical', 'follow'].includes(str(ps.defaultLabelOrientation))
    )
      fail('defaultLabelOrientation');
    if (
      ps.defaultLabelScaleWithBlock !== undefined &&
      typeof ps.defaultLabelScaleWithBlock !== 'boolean'
    )
      fail('defaultLabelScaleWithBlock');
    if (ps.lineJumps !== undefined && typeof ps.lineJumps !== 'boolean') fail('lineJumps');
    if (ps.jumpRadius !== undefined && num(ps.jumpRadius) <= 0) fail('jumpRadius');
    if (ps.jumpPriority !== undefined && !['horizontal', 'vertical'].includes(str(ps.jumpPriority)))
      fail('jumpPriority');
    if (ps.jumpScope !== undefined && !['all', 'wires'].includes(str(ps.jumpScope)))
      fail('jumpScope');
    if (ps.dynamicPortConnectors !== undefined && typeof ps.dynamicPortConnectors !== 'boolean')
      fail('dynamicPortConnectors');
    if (
      ps.connectorRoutingMode !== undefined &&
      !['straight_to_polyline', 'keep_original'].includes(str(ps.connectorRoutingMode))
    )
      fail('connectorRoutingMode');
  }
  const layers = arr(root.layers);
  if (!layers.length) fail('no layers');
  unique(layers);
  const layerIds = new Set(layers.map((l) => str(obj(l).id)));
  if (!layerIds.has('0')) fail('missing layer 0');
  for (const v of layers) {
    const l = obj(v);
    str(l.name);
    if (typeof l.visible !== 'boolean' || typeof l.locked !== 'boolean') fail('layer state');
    if (!Number.isInteger(num(l.color)) || Number(l.color) < 1 || Number(l.color) > 255)
      fail('ACI color');
    if (!Object.prototype.hasOwnProperty.call(LINE_TYPES, str(l.lineType))) fail('linetype');
    if (l.linePattern !== undefined) {
      const lp = arr(l.linePattern);
      if (lp.length > 16) fail('linePattern length');
      lp.forEach((v) => num(v));
    }
  }
  const blocks = arr(root.blocks);
  unique(blocks);
  const blockIds = new Set(blocks.map((b) => str(obj(b).id)));
  const entity = (v: unknown): void => {
    const e = obj(v);
    str(e.id);
    if (!layerIds.has(str(e.layer))) fail('unknown layer');
    if (
      e.color !== undefined &&
      (!Number.isInteger(num(e.color)) || Number(e.color) < 0 || Number(e.color) > 256)
    )
      fail('entity color');
    if (
      e.lineType !== undefined &&
      !Object.prototype.hasOwnProperty.call(LINE_TYPES, str(e.lineType))
    )
      fail('entity linetype');
    if (e.linePattern !== undefined) {
      const lp = arr(e.linePattern);
      if (lp.length > 16) fail('entity linePattern length');
      lp.forEach((n) => num(n));
    }
    if (e.lineJump !== undefined && !['auto', 'always', 'never'].includes(str(e.lineJump)))
      fail('entity lineJump');
    if (e.arrows !== undefined) {
      const aw = obj(e.arrows);
      if (!['closed', 'open', 'stealth', 'triangle', 'dot', 'slash'].includes(str(aw.style)))
        fail('arrow style');
      if (!['end', 'start', 'both', 'middle', 'every_n'].includes(str(aw.placement)))
        fail('arrow placement');
      if (aw.segments !== undefined && num(aw.segments) < 1) fail('arrow segments');
      if (aw.size !== undefined && num(aw.size) <= 0) fail('arrow size');
      if (aw.reversed !== undefined && typeof aw.reversed !== 'boolean') fail('arrow reversed');
    }
    if (
      e.discipline !== undefined &&
      !['general', 'piping', 'single-line'].includes(str(e.discipline))
    )
      fail('entity discipline');
    for (const key of ['serviceTag', 'pipeSpec', 'lineNotes']) {
      if (e[key] !== undefined) str(e[key]);
    }
    switch (e.type) {
      case 'line':
        pt(e.a);
        pt(e.b);
        for (const key of ['from', 'to'])
          if (e[key]) {
            const a = obj(e[key]);
            str(a.insertId);
            str(a.portId);
          }
        break;
      case 'wire':
      case 'polyline':
        if (arr(e.points).length < 2) fail('polyline requires two vertices');
        arr(e.points).forEach(pt);
        if (e.type === 'polyline' && typeof e.closed !== 'boolean') fail('closed flag');
        for (const key of ['from', 'to'])
          if (e[key]) {
            const a = obj(e[key]);
            str(a.insertId);
            str(a.portId);
          }
        break;
      case 'circle':
      case 'arc':
        pt(e.center);
        if (num(e.radius) <= 0) fail('radius');
        if (e.type === 'arc') {
          num(e.start);
          num(e.end);
        }
        break;
      case 'text':
        pt(e.position);
        str(e.text);
        if (num(e.height) <= 0) fail('text height');
        num(e.rotation);
        break;
      case 'insert':
        if (!blockIds.has(str(e.block))) fail('unknown block');
        pt(e.position);
        pt(e.scale);
        if (!num(obj(e.scale).x) || !num(obj(e.scale).y)) fail('zero scale');
        num(e.rotation);
        attrs(e.attributes);
        if (e.labelStyle !== undefined) {
          const ls = obj(e.labelStyle);
          if (ls.anchor !== undefined && !VALID_LABEL_ANCHORS.has(str(ls.anchor)))
            fail('label anchor');
          if (ls.textHeight !== undefined && num(ls.textHeight) <= 0) fail('label textHeight');
          if (ls.rotateWithBlock !== undefined && typeof ls.rotateWithBlock !== 'boolean')
            fail('label rotateWithBlock');
          if (ls.textRotation !== undefined) num(ls.textRotation);
          if (ls.scaleWithBlock !== undefined && typeof ls.scaleWithBlock !== 'boolean')
            fail('label scaleWithBlock');
          if (ls.textOffset !== undefined) pt(ls.textOffset);
        }
        break;
      case 'dimension':
        pt(e.a);
        pt(e.b);
        if (e.offset !== undefined) num(e.offset);
        if (e.text !== undefined) str(e.text);
        if (e.kind !== undefined && !VALID_DIM_KINDS.has(str(e.kind))) fail('dimension kind');
        break;
      default:
        fail('unknown entity type');
    }
  };
  for (const v of blocks) {
    const b = obj(v);
    str(b.name);
    str(b.category);
    for (const key of ['library', 'group', 'standard']) if (b[key] !== undefined) str(b[key]);
    attrs(b.attributes);
    const es = arr(b.entities);
    unique(es);
    es.forEach((e) => entity(e));
    const ports = arr(b.ports);
    unique(ports);
    ports.forEach((p) => {
      pt(obj(p).point);
      pt(obj(p).direction);
    });
  }
  if (root.manualJumpKeys !== undefined) arr(root.manualJumpKeys).forEach((k) => str(k));
  if (root.excludedJumpKeys !== undefined) arr(root.excludedJumpKeys).forEach((k) => str(k));
  if (root.jumpDirectionOverrides !== undefined) {
    const jdo = obj(root.jumpDirectionOverrides);
    for (const v of Object.values(jdo)) {
      if (v !== 'horizontal' && v !== 'vertical') fail('jumpDirectionOverrides');
    }
  }
  const es = arr(root.entities);
  unique(es);
  es.forEach((e) => entity(e));
  if (root.pages !== undefined) {
    const pages = arr(root.pages);
    unique(pages);
    for (const p of pages) {
      const page = obj(p);
      str(page.name);
      if (page.scale !== undefined) str(page.scale);
      if (page.sheet !== undefined) validateSheet(page.sheet);
      const pe = arr(page.entities);
      unique(pe);
      pe.forEach((e) => entity(e));
    }
  }
  // Reject recursive INSERT graphs before either renderer walks them.
  const visiting = new Set<string>(),
    done = new Set<string>();
  const visit = (id: string): void => {
    if (visiting.has(id)) fail('recursive blocks');
    if (visiting.size > 32) fail('block nesting is too deep');
    if (done.has(id)) return;
    visiting.add(id);
    const b = blocks.find((b) => obj(b).id === id);
    for (const e of arr(obj(b).entities)) if (obj(e).type === 'insert') visit(str(obj(e).block));
    visiting.delete(id);
    done.add(id);
  };
  blockIds.forEach(visit);
  return clone(input) as Drawing;
}
