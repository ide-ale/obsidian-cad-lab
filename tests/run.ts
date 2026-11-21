import {
  defaultInputBindings,
  matchesKeyCombo,
  normalizeKeyCombo,
  sanitizeInputBindings,
} from '../src/core/bindings';
import { englishBuiltinLabel } from '../src/core/legacy-labels';
import { LINE_TYPES, customDashPattern, importedLineType } from '../src/core/linetypes';
import { gridPoint, constrainedPoint, polarTrackPoint } from '../src/core/precision';
import { supplementLibrary } from '../src/core/catalog';
import { externalDxf } from './external-dxf';
import { parse, stringify } from 'yaml';
import { fixture } from './fixture';
import {
  Drawing,
  Entity,
  Insert,
  Point,
  clone,
  defaultProjectSettings,
  emptyDrawing,
  validateDrawing,
} from '../src/core/model';
import { builtinLibrary } from '../src/core/library';
import { CommandStack } from '../src/core/history';
import { SnapIndex } from '../src/core/snap';
import {
  alignEntities,
  angle,
  around,
  applyGripDrag,
  autoExtend,
  autoTrim,
  computeLineArrowMarkers,
  computeLineJumps,
  copyEntities,
  distance,
  entityBounds,
  entityGrips,
  explodeEntity,
  filletLines,
  findAllLineCrossings,
  flatten,
  formatLineAnnotation,
  groupEntities,
  hitTest,
  identity,
  insertMatrix,
  intersect,
  joinEntities,
  lineAnnotationPlacement,
  matchProperties,
  mergeLayers,
  offsetBothSides,
  offsetEntity,
  portPosition,
  routeWire,
  scaleEntity,
  searchDrawing,
  selectBox,
  setLineCrossingJump,
  toggleLineCrossingJump,
  transform,
  transformEntity,
  trimExtend,
  ungroupEntity,
  updateWires,
} from '../src/core/geometry';
import { DxfExporter, DxfImporter, mergeLibrary } from '../src/io/dxf';
import { decodeDwgOrDxfText, inspectDwgBinary } from '../src/io/dwg';
import {
  componentTags,
  extractBom,
  formatBomMarkdown,
  readMarkdown,
  writeMarkdown,
} from '../src/io/markdown';
import { PdfExporter } from '../src/io/pdf';
import {
  buildLibraryTree,
  createCustomBlock,
  deleteFromLibrary,
} from '../src/core/library-manager';
import {
  addDrawingPage,
  bestPrintFit,
  buildSheetEntities,
  deleteDrawingPage,
  ensurePages,
  ensureSheetSetup,
  fitSheetToDrawing,
  moveDrawingPage,
  parseScaleRatio,
  renameDrawingPage,
  rescaleDrawingElements,
  stampSheetToEntities,
  switchDrawingPage,
} from '../src/core/sheet';
import { Camera, MAX_CAMERA_SCALE, MIN_CAMERA_SCALE, toSvg } from '../src/render/renderer';
let tests = 0;
const failures: string[] = [];
function assert(value: unknown, message = 'Assertion failed'): asserts value {
  if (!value) throw new Error(message);
}
function equal<T>(a: T, b: T): void {
  assert(JSON.stringify(a) === JSON.stringify(b), `${JSON.stringify(a)} != ${JSON.stringify(b)}`);
}
function near(a: number, b: number, tolerance = 1e-7): void {
  assert(Math.abs(a - b) < tolerance, `${a} != ${b}`);
}
function rejects(action: () => unknown): void {
  let threw = false;
  try {
    action();
  } catch {
    threw = true;
  }
  assert(threw, 'Expected rejection');
}
function test(name: string, action: () => void): void {
  tests++;
  try {
    action();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.error(`FAIL ${name}: ${error instanceof Error ? error.message : error}`);
  }
}
const line = (id: string, a: Point, b: Point): Entity => ({
  id,
  layer: '0',
  type: 'line',
  a,
  b,
});
test('Built-in libraries validate, have categories and electrical/process ports', () => {
  const d = emptyDrawing(builtinLibrary());
  validateDrawing(d);
  assert(d.blocks.length >= 120);
  assert(d.blocks.every((b) => b.entities.length && b.library && b.group));
  assert(d.blocks.filter((b) => b.library !== 'General').every((b) => b.ports.length));
});
test('World ↔ screen and anchored zoom at fractional DPI-independent coordinates', () => {
  const c = new Camera();
  c.center = { x: 12.345, y: -56.789 };
  c.scale = 7.4;
  const p = { x: 123.456789, y: -88.2244 };
  const round = c.world(c.screen(p));
  near(round.x, p.x);
  near(round.y, p.y);
  const anchor = { x: 175, y: 223 },
    before = c.world(anchor);
  c.zoom(3.4, anchor);
  near(c.world(anchor).x, before.x);
  near(c.world(anchor).y, before.y);
});
test('Finite and extended intersections', () => {
  equal(intersect({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: -5 }, { x: 5, y: 5 }), {
    x: 5,
    y: 0,
  });
  assert(!intersect({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 5, y: -1 }, { x: 5, y: 1 }));
  equal(intersect({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 5, y: -1 }, { x: 5, y: 1 }, false), {
    x: 5,
    y: 0,
  });
});
test('Window includes only fully enclosed objects; crossing tests real segments', () => {
  const d = emptyDrawing();
  d.entities = [
    line('inside', { x: 1, y: 1 }, { x: 2, y: 2 }),
    line('crossing', { x: -2, y: 2 }, { x: 5, y: 2 }),
    line('bbox-only', { x: -2, y: 1 }, { x: 1, y: 4 }),
  ];
  equal(selectBox(d, { minX: 0, minY: 0, maxX: 3, maxY: 3 }, false), ['inside']);
  equal(selectBox(d, { minX: 0, minY: 0, maxX: 3, maxY: 3 }, true), [
    'inside',
    'crossing',
    'bbox-only',
  ]);
  equal(selectBox(d, { minX: 0, minY: 0, maxX: 0.1, maxY: 0.1 }, true), []);
});
test('Rotated/mirrored ports follow INSERT matrix', () => {
  const d = fixture(),
    i = d.entities[0] as Insert;
  i.rotation = 90;
  i.scale.y = -1;
  const p = portPosition(d, { insertId: i.id, portId: 'OUT' })!;
  near(p.x, -30);
  near(p.y, 10);
});
test('Intelligent wires reroute orthogonally when block moves or rotates', () => {
  const d = fixture(),
    i = d.entities[1] as Insert;
  i.position = { x: 45, y: 30 };
  i.rotation = 90;
  updateWires(d);
  const w = d.entities.find((e) => e.type === 'wire')!;
  assert(w.type === 'wire');
  equal(w.points[w.points.length - 1], portPosition(d, w.to)!);
  for (let n = 1; n < w.points.length; n++)
    assert(
      Math.abs(w.points[n].x - w.points[n - 1].x) < 1e-7 ||
        Math.abs(w.points[n].y - w.points[n - 1].y) < 1e-7,
    );
});
test('Delete disconnects wire attachment without losing endpoint', () => {
  const d = fixture(),
    w = d.entities.find((e) => e.type === 'wire')!;
  assert(w.type === 'wire');
  const start = clone(w.points[0]);
  d.entities = d.entities.filter((e) => e.id !== 'pump');
  updateWires(d);
  assert(!w.from);
  equal(w.points[0], start);
});
test('Copy remaps connections only for copied blocks', () => {
  const d = fixture();
  copyEntities(d, new Set(['pump', 'wire']), { ...identity(), e: 100 });
  const copies = d.entities.slice(8),
    wire = copies.find((e) => e.type === 'wire');
  assert(wire?.type === 'wire');
  assert(wire.from?.insertId === copies.find((e) => e.type === 'insert')?.id);
  assert(!wire.to);
});
test('Mirror preserves arc locus and reverses CCW orientation', () => {
  const e: Entity = {
    id: 'a',
    type: 'arc',
    layer: '0',
    center: { x: 0, y: 0 },
    radius: 5,
    start: 0,
    end: 90,
  };
  transformEntity(e, around({ x: 0, y: 0 }, 0, true));
  near(e.start, -90);
  near(e.end, 0);
});
test('TR trims clicked side; EX extends nearest external endpoint', () => {
  const target = line('t', { x: 0, y: 0 }, { x: 10, y: 0 }),
    boundary = line('b', { x: 5, y: -5 }, { x: 5, y: 5 });
  assert(trimExtend(target, boundary, { x: 1, y: 0 }, false));
  assert(target.type === 'line');
  equal(target.a, { x: 5, y: 0 });
  const ext = line('e', { x: 0, y: 0 }, { x: 2, y: 0 });
  assert(trimExtend(ext, boundary, { x: 2, y: 0 }, true));
  assert(ext.type === 'line');
  equal(ext.b, { x: 5, y: 0 });
});
test('Transactional history: undo/redo restores wires, layers, tags; failed mutation isolated', () => {
  const d = fixture();
  let calls = 0;
  const h = new CommandStack(d, () => calls++);
  h.execute('move', (draft) => {
    const i = draft.entities[0] as Insert;
    i.position.x = 100;
    i.attributes.TAG = 'P-102';
    draft.layers[0].locked = true;
  });
  assert(componentTags(h.drawing).includes('P-102'));
  h.undo();
  equal(h.drawing, d);
  h.redo();
  assert(componentTags(h.drawing).includes('P-102'));
  assert(calls === 3);
  const before = clone(h.drawing);
  rejects(() =>
    h.execute('bad', (draft) => {
      draft.layers = [];
    }),
  );
  equal(h.drawing, before);
});
test('New transaction after undo clears redo branch', () => {
  const h = new CommandStack(emptyDrawing());
  h.execute('add', (d) => d.entities.push(line('a', { x: 0, y: 0 }, { x: 1, y: 1 })));
  h.undo();
  h.execute('add other', (d) => d.entities.push(line('b', { x: 0, y: 0 }, { x: 1, y: 2 })));
  assert(!h.canRedo);
});
test('OSNAP endpoint, midpoint, center, intersection and port', () => {
  const d = fixture();
  d.entities.push(line('vertical', { x: 2, y: -25 }, { x: 2, y: -15 }));
  const snap = new SnapIndex();
  snap.rebuild(d);
  equal(snap.find({ x: 2, y: -20 }, 0.2)?.kind, 'Intersection');
  equal(snap.find({ x: 70, y: 0 }, 0.2)?.kind, 'Center');
  equal(snap.find({ x: 50, y: -20 }, 0.2)?.kind, 'Endpoint');
  equal(snap.find({ x: 15, y: -20 }, 0.2)?.kind, 'Midpoint');
  equal(snap.find({ x: -20, y: 0 }, 0.2)?.kind, 'Port');
});
test('Line/circle analytic OSNAP intersection', () => {
  const d = emptyDrawing();
  d.entities = [
    { id: 'c', layer: '0', type: 'circle', center: { x: 0, y: 0 }, radius: 5 },
    line('l', { x: -10, y: 3 }, { x: 10, y: 3 }),
  ];
  const s = new SnapIndex();
  s.rebuild(d);
  const p = s.find({ x: 4, y: 3 }, 0.1);
  assert(p?.kind === 'Intersection');
  near(p.point.x, 4);
});
test('Hidden layers excluded from selection and snapping', () => {
  const d = fixture();
  d.layers[0].visible = false;
  const s = new SnapIndex();
  s.rebuild(d);
  assert(!s.find({ x: 70, y: 0 }, 0.1));
  assert(!hitTest(d, { x: 70, y: 5 }, 0.1));
});
test('Markdown round trip keeps prose, escapes fence injection, syncs component tags', () => {
  const d = fixture();
  const e = d.entities.find((e) => e.type === 'text');
  assert(e?.type === 'text');
  e.text = '```\n<img onerror="alert(1)">';
  const text = writeMarkdown(d, '# My P&ID\n\nUser notes.');
  assert(text.includes('# My P&ID'));
  assert(text.includes('P-101'));
  equal(readMarkdown(text).drawing, d);
  assert((text.match(/^```/gm) ?? []).length === 2);
});
test('Malformed CAD rejects missing blocks, NaN, cyclic blocks, duplicate IDs', () => {
  rejects(() => readMarkdown('no data'));
  const d = fixture();
  (d.entities[0] as Insert).block = 'missing';
  rejects(() => validateDrawing(d));
  const b = fixture();
  b.entities.push(clone(b.entities[0]));
  rejects(() => validateDrawing(b));
  const c = fixture();
  c.blocks[0].entities.push({
    id: 'loop',
    layer: '0',
    type: 'insert',
    block: c.blocks[0].id,
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
    rotation: 0,
    attributes: {},
  });
  rejects(() => validateDrawing(c));
});
test('SVG contains real vector geometry and escaped text, no executable markup', () => {
  const d = fixture();
  d.entities.push({
    id: 'evil',
    layer: '0',
    type: 'text',
    position: { x: 0, y: 0 },
    rotation: 0,
    height: 3,
    text: '<script>alert(1)</script>',
  });
  const svg = toSvg(d);
  assert(svg.includes('<circle'));
  assert(svg.includes('<path'));
  assert(svg.includes('&lt;script&gt;'));
  assert(!svg.includes('<script>'));
  assert(!svg.includes('NaN'));
});
test('R2010 export contains required sections, handles, tables, blocks and attributes', () => {
  const result = new DxfExporter().export(fixture());
  for (const text of [
    'AC1024',
    'BLOCK_RECORD',
    'LTYPE',
    'APPID',
    'BLOCK',
    'INSERT',
    'ATTRIB',
    'SEQEND',
    'ENDSEC',
    'EOF',
  ])
    assert(result.includes(text), text);
  const rows = result.trim().split(/\r?\n/);
  assert(rows.length % 2 === 0);
  const handles: string[] = [];
  for (let i = 0; i < rows.length; i += 2)
    if (rows[i] === '5' && rows[i - 1] !== '$HANDSEED') handles.push(rows[i + 1]);
  assert(new Set(handles).size === handles.length, 'duplicate handles');
});
test('DXF round trip preserves primitives, layers, block ports, tags and wire references', () => {
  const original = fixture();
  original.layers[2].locked = true;
  original.layers[2].visible = false;
  const result = new DxfImporter().import(new DxfExporter().export(original));
  equal(result.warnings, []);
  assert(result.drawing.entities.length === original.entities.length);
  assert(result.drawing.blocks.length === original.blocks.length);
  equal(componentTags(result.drawing), componentTags(original));
  const w = result.drawing.entities.find((e) => e.type === 'wire');
  assert(w?.type === 'wire');
  equal(w.from, { insertId: 'pump', portId: 'OUT' });
  equal(
    result.drawing.blocks.find((b) => b.id === 'pid-pump')?.ports,
    original.blocks.find((b) => b.id === 'pid-pump')?.ports,
  );
  const text = result.drawing.entities.find((e) => e.id === 'text');
  assert(text?.type === 'text');
  equal(text.text, 'Diagram Δ – Ø25');
  assert(result.drawing.layers.find((l) => l.name === 'SIGNALS')?.locked);
});
const dxf = (entities: string, header = ''): string =>
  `0\nSECTION\n2\nHEADER\n${header}0\nENDSEC\n0\nSECTION\n2\nENTITIES\n${entities}0\nENDSEC\n0\nEOF\n`;
test('External DXF inches convert to millimetres', () => {
  const d = new DxfImporter().import(
    dxf('0\nLINE\n8\n0\n10\n0\n20\n0\n11\n1\n21\n2\n', '9\n$INSUNITS\n70\n1\n'),
  ).drawing;
  const e = d.entities[0];
  assert(e.type === 'line');
  near(e.b.x, 25.4);
  near(e.b.y, 50.8);
});
test('Bulged LWPOLYLINE converts to exact ARC', () => {
  const d = new DxfImporter().import(
    dxf('0\nLWPOLYLINE\n90\n2\n70\n0\n10\n0\n20\n0\n42\n1\n10\n10\n20\n0\n'),
  ).drawing;
  const a = d.entities[0];
  assert(a.type === 'arc');
  near(a.radius, 5);
  near(a.center.x, 5);
  near(a.center.y, 0);
});
test('Legacy POLYLINE vertices and closure import', () => {
  const d = new DxfImporter().import(
    dxf(
      '0\nPOLYLINE\n70\n1\n0\nVERTEX\n10\n0\n20\n0\n0\nVERTEX\n10\n10\n20\n0\n0\nVERTEX\n10\n10\n20\n10\n0\nSEQEND\n',
    ),
  ).drawing;
  const p = d.entities[0];
  assert(p.type === 'polyline' && p.closed && p.points.length === 3);
});
test('Binary, truncated DXF rejected; unsupported entities reported', () => {
  rejects(() => new DxfImporter().import('AutoCAD Binary DXF'));
  rejects(() => new DxfImporter().import('0\nSECTION\n2'));
  const result = new DxfImporter().import(dxf('0\nSPLINE\n70\n0\n'));
  assert(result.warnings.some((w) => w.includes('SPLINE')));
});
test('Library merge avoids identifier collisions and preserves source document', () => {
  const d = fixture(),
    before = clone(d);
  const n = mergeLibrary(d, before);
  assert(n === before.blocks.length);
  assert(d.blocks.length === before.blocks.length * 2);
  validateDrawing(d);
  equal(before, fixture());
});
test('YAML round trip preserves user metadata without polluting frontmatter; opt-in preset syncs component tags', () => {
  const d = fixture();
  const source =
    '---\nproject: Alpha\nrevision: 12\nowner:\n  name: Alice\ntags: [engineering, cad, OLD-1]\ncad-component-tags: [OLD-1]\n---\n# Notes\nKeep this paragraph.\n';
  // Default writeMarkdown leaves user YAML untouched and omits unsolicited cad-* spam
  const outputClean = writeMarkdown(d, source, { parse, stringify });
  const fmClean = parse(outputClean.split('---')[1]);
  equal(fmClean.owner, { name: 'Alice' });
  assert(fmClean.revision === 12);
  equal(fmClean.tags, ['engineering', 'cad', 'OLD-1']);
  assert(
    fmClean['cad-lab'] === true &&
      fmClean['cad-scale'] === undefined &&
      fmClean['cad-units'] === undefined,
  );
  assert(outputClean.includes('Keep this paragraph.'));
  equal(readMarkdown(outputClean).drawing, d);

  // Explicit opt-in includePresetProperties writes optional sheet metadata WITHOUT tags, cad-component-tags, cad-scale or cad-units
  const outputPreset = writeMarkdown(
    d,
    source,
    { parse, stringify },
    { includePresetProperties: true },
  );
  const fmPreset = parse(outputPreset.split('---')[1]);
  equal(fmPreset.tags, ['engineering', 'cad', 'OLD-1']);
  assert(
    fmPreset['cad-scale'] === undefined &&
      fmPreset['cad-units'] === undefined &&
      fmPreset['cad-lab'] === true,
    'Preset YAML excludes scale/units/component tags cleanly',
  );
  equal(readMarkdown(outputPreset).drawing, d);
});
test('Broken YAML does not overwrite the source', () => {
  rejects(() =>
    writeMarkdown(fixture(), '---\nbad: [unterminated\n---\n', {
      parse,
      stringify,
    }),
  );
});
test('Circle-circle OSNAP intersections are analytic', () => {
  const d = emptyDrawing();
  d.entities = [
    { id: 'a', type: 'circle', layer: '0', center: { x: 0, y: 0 }, radius: 5 },
    { id: 'b', type: 'circle', layer: '0', center: { x: 6, y: 0 }, radius: 5 },
  ];
  const s = new SnapIndex();
  s.rebuild(d);
  const snap = s.find({ x: 3, y: 4 }, 0.01);
  assert(snap?.kind === 'Intersection');
  near(snap.point.x, 3);
  near(snap.point.y, 4);
});
test('Arc extents use exact extrema and high-zoom hits do not depend on tessellation', () => {
  const d = emptyDrawing(),
    arc: Entity = {
      id: 'a',
      layer: '0',
      type: 'arc',
      center: { x: 0, y: 0 },
      radius: 10000,
      start: 2.1,
      end: 179.3,
    };
  d.entities = [arc];
  near(entityBounds(d, arc).maxY, 10000);
  const p = {
    x: 10000 * Math.cos((47.123 * Math.PI) / 180),
    y: 10000 * Math.sin((47.123 * Math.PI) / 180),
  };
  assert(hitTest(d, p, 0.0001)?.id === 'a');
});
test('DXF preserves technical text whitespace and literal backslashes', () => {
  const d = emptyDrawing();
  d.entities = [
    {
      id: 'txt',
      layer: '0',
      type: 'text',
      position: { x: 0, y: 0 },
      text: '  C:\\Pump\\P  ',
      height: 3,
      rotation: 0,
    },
  ];
  const imported = new DxfImporter().import(new DxfExporter().export(d)).drawing;
  const e = imported.entities[0];
  assert(e.type === 'text');
  equal(e.text, '  C:\\Pump\\P  ');
});
test('DXF deduplicates colliding normalized block names', () => {
  const d = fixture();
  d.blocks[0].name = 'A/B';
  d.blocks[1].name = 'A:B';
  const imported = new DxfImporter().import(new DxfExporter().export(d)).drawing;
  assert(new Set(imported.blocks.map((b) => b.name)).size === d.blocks.length);
});
test('Independent DXF fixture: inch units, base point, nested blocks, ATTRIB and bulges', () => {
  const result = new DxfImporter().import(externalDxf),
    d = result.drawing;
  equal(result.warnings, []);
  assert(d.blocks.length === 2);
  assert(d.entities.length === 4);
  const top = d.entities.find((e) => e.type === 'insert' && e.attributes.TAG === 'Q1');
  assert(top?.type === 'insert');
  near(top.position.x, 254);
  near(top.position.y, 508);
  assert(d.layers.find((l) => l.name === 'CONTROL')?.locked);
  const b = d.blocks.find((b) => b.id === top.block)!;
  const l = b.entities.find((e) => e.type === 'line');
  assert(l?.type === 'line');
  equal(l.a, { x: 0, y: 0 });
  near(l.b.x, 25.4);
  const end = transform(l.b, insertMatrix(top));
  near(end.x, 254);
  near(end.y, 533.4);
  assert(d.entities.some((e) => e.type === 'arc' && Math.abs(e.radius - 25.4) < 1e-7));
  assert(d.entities.some((e) => e.type === 'text' && e.text === 'MOTORE Ø Δ'));
  validateDrawing(d);
  const back = new DxfImporter().import(new DxfExporter().export(d));
  equal(back.warnings, []);
});
test('DXF preserves all significant float64 digits and UTF-8 XDATA boundaries', () => {
  const d = fixture();
  const a = d.entities.find((e) => e.type === 'line');
  assert(a?.type === 'line');
  a.a.x = 123.12345678901234;
  d.blocks[0].category = '⚙️ 工程 '.repeat(100);
  const text = new DxfExporter().export(d),
    back = new DxfImporter().import(text).drawing;
  const b = back.entities.find((e) => e.id === a.id);
  assert(b?.type === 'line');
  equal(b.a.x, a.a.x);
  equal(back.blocks[0].category, d.blocks[0].category);
  const rows = text.split('\r\n');
  for (let i = 0; i < rows.length; i += 2)
    if (rows[i] === '1000') assert(new TextEncoder().encode(rows[i + 1]).length <= 220);
});
test('Grid rounding, negatives, ortho and fractional millimetres remain stable across zoom', () => {
  equal(gridPoint({ x: 4.2, y: -6.8 }, 2.5), { x: 5, y: -7.5 });
  equal(constrainedPoint({ x: 12.2, y: 7.2 }, { x: 0, y: 1 }, false, 5), { x: 10, y: 5 });
  equal(constrainedPoint({ x: 12.2, y: 7.2 }, { x: 0, y: 1 }, true, 5), { x: 10, y: 1 });
  equal(constrainedPoint({ x: 12.2, y: 7.2 }, { x: 0, y: 1 }, false), { x: 12.2, y: 7.2 });
  rejects(() => gridPoint({ x: 0, y: 0 }, 0));
});
test('All line styles survive DXF layer/entity round trip with exact patterns and metadata', () => {
  const d = emptyDrawing();
  const styles = Object.keys(LINE_TYPES) as (keyof typeof LINE_TYPES)[];
  styles.forEach((style, i) => {
    d.layers.push({
      id: style,
      name: style,
      visible: true,
      locked: false,
      color: 7,
      lineType: style,
    });
    d.entities.push({
      id: style,
      type: 'line',
      layer: style,
      lineType: style,
      a: { x: 0, y: i * 5 },
      b: { x: 100, y: i * 5 },
    });
  });
  const output = new DxfExporter().export(d),
    result = new DxfImporter().import(output);
  equal(result.warnings, []);
  result.drawing.entities.forEach((e, i) => equal(e.lineType, styles[i]));
  styles.forEach((style) =>
    assert(result.drawing.layers.some((l) => l.name === style && l.lineType === style)),
  );
  assert(toSvg(d).includes('stroke-dasharray="0 2"'));
  equal(importedLineType('DASHDOT'), 'CENTER');
  equal(importedLineType('DOT'), 'DOTTED');
});
test('Old drawings receive missing libraries without modifying placed symbols or user definitions', () => {
  const old = fixture();
  old.blocks = old.blocks.filter((b) =>
    old.entities.some((e) => e.type === 'insert' && e.block === b.id),
  );
  old.blocks[0].name = 'Custom pump';
  old.blocks[0].entities[0].color = 6;
  const before = clone(old),
    catalog = builtinLibrary(),
    next = supplementLibrary(old, catalog);
  equal(old, before);
  equal(next.entities, old.entities);
  equal(next.blocks[0], old.blocks[0]);
  assert(next.blocks.length === catalog.length);
  equal(supplementLibrary(next, catalog), next);
  validateDrawing(next);
});
test('Expanded libraries have unique IDs and reference metadata survives DXF', () => {
  const d = emptyDrawing(builtinLibrary());
  assert(new Set(d.blocks.map((b) => b.library)).size === 4);
  const result = new DxfImporter().import(new DxfExporter().export(d));
  equal(result.warnings, []);
  const cable = result.drawing.blocks.find((b) => b.id === 'single-cable-4');
  assert(cable?.library === 'Electrical single-line');
  assert(cable?.group === 'Distribution');
});
test('Built-in names and attributes default to English; legacy names display without rewriting user geometry', () => {
  const catalog = builtinLibrary();
  equal(catalog.find((b) => b.id === 'pid-pump')?.name, 'Centrifugal pump');
  assert(
    catalog.every(
      (b) => b.attributes.VALUE !== undefined && b.attributes.DESCRIPTION !== undefined,
    ),
  );
  equal(englishBuiltinLabel('Pompa centrifuga'), 'Centrifugal pump');
  equal(englishBuiltinLabel('Indicatore pressione · campo'), 'Pressure indicator · field');
  equal(englishBuiltinLabel('My custom pump'), 'My custom pump');
});
test('International standards sub-trees (ANSI/ISA-5.1, ISO 10628, ISO 14617, IEC 60617, ANSI Y32, NFPA 79)', () => {
  const catalog = builtinLibrary();
  const standards = new Set(catalog.map((b) => b.standard));
  for (const req of [
    'ANSI/ISA-5.1',
    'ISO 10628',
    'ISO 14617',
    'IEC 60617',
    'ANSI Y32',
    'NFPA 79',
  ]) {
    assert(standards.has(req), `Missing standard: ${req}`);
  }
  const pidTree = buildLibraryTree(catalog, 'name', { library: 'P&ID' });
  assert(pidTree.length === 1 && pidTree[0].standards.length >= 5);
  const elecTree = buildLibraryTree(catalog, 'name', { library: 'Electrical multi-line' });
  assert(elecTree.length === 1 && elecTree[0].standards.length === 3);
});
test('Centralized Library Manager: create custom symbol with metadata and safe deletion', () => {
  const d = fixture();
  const created = createCustomBlock(d, new Set(['line']), {
    name: 'Hydraulic Cylinder',
    library: 'Mechanical',
    standard: 'ISO 1219',
    group: 'Actuators',
    tagPrefix: 'HC',
    portPreset: 'lr',
    attributes: { RATING: '250 bar', MATERIAL: 'Steel' },
  });
  assert(created.library === 'Mechanical' && created.standard === 'ISO 1219');
  equal(created.attributes.RATING, '250 bar');
  validateDrawing(d);
  // Deleting a placed block (pid-pump) is prevented
  const placedDelete = deleteFromLibrary(d, { blockId: 'pid-pump' });
  assert(placedDelete.inUse === 1 && placedDelete.removed === 0);
  // Deleting the unplaced custom block succeeds
  const customDelete = deleteFromLibrary(d, { blockId: created.id });
  assert(customDelete.removed === 1 && customDelete.inUse === 0);
});
test('Dimension entity in mm, Sheet setup, dynamic scale and Title Block', () => {
  const d = fixture();
  d.entities.push({
    id: 'dim-1',
    type: 'dimension',
    layer: '0',
    kind: 'aligned',
    a: { x: 0, y: 0 },
    b: { x: 45.5, y: 0 },
    offset: 8,
  });
  const sh = ensureSheetSetup(d, 'Reactor P&ID');
  sh.enabled = true;
  sh.titleBlockMode = 'real';
  sh.size = 'A3';
  sh.orientation = 'landscape';
  sh.scale = '1:10';
  sh.titleBlock.project = 'Plant Alpha';
  validateDrawing(d);
  assert(buildSheetEntities(sh).length > 20);
  const svg = toSvg(d);
  assert(svg.includes('45.5 mm'));
  assert(svg.includes('Plant Alpha'));
  // DXF round-trip preserves DimensionEntity
  const round = new DxfImporter().import(new DxfExporter().export(d)).drawing;
  const dim = round.entities.find((e) => e.id === 'dim-1');
  assert(dim?.type === 'dimension' && dim.b.x === 45.5);
  // Rescaling elements adapts insert scale and text height proportionally
  rescaleDrawingElements(d, '1:5');
  const pump = d.entities.find((e) => e.id === 'pump') as Insert;
  near(pump.scale.x, 5);
  assert(stampSheetToEntities(d) > 20);
  validateDrawing(d);
});
test('Vector PDF 1.4 export generates valid true-scale PDF with xref and vector paths', () => {
  const d = fixture();
  const sh = ensureSheetSetup(d, 'Electrical Single-Line');
  sh.enabled = true;
  const pdf = new PdfExporter().exportString(d, { title: 'Electrical Single-Line' });
  assert(pdf.startsWith('%PDF-1.4'));
  assert(pdf.includes('/Type /Page'));
  assert(pdf.includes('xref'));
  assert(pdf.includes('%%EOF'));
  const bytes = new PdfExporter().exportBytes(d);
  assert(bytes.byteLength > 1000);
});
test('Unidirectional Bill of Materials (BOM) synchronizes Graphic -> Markdown Table only', () => {
  const d = fixture();
  const pump = d.entities.find((e) => e.id === 'pump') as Insert;
  pump.attributes.NOTES = 'Check mechanical seal';
  const md = writeMarkdown(d, '# Process Note\n\nKeep user prose.');
  assert(md.includes('## Bill of Materials (BOM)'));
  assert(md.includes('| P-101 | Centrifugal pump |'));
  assert(md.includes('Check mechanical seal'));
  const bom = extractBom(d);
  assert(bom.length === 2 && bom[1].tag === 'P-101');
  // Manually tamper with the Markdown BOM table by injecting a fake row
  const tampered = md.replace(
    '<!-- cad-bom:end -->',
    '| 99 | FAKE-999 | Fake Valve | ISO 14617 | Valves | DN50 | Manual row | - | 0 | Manual note |\n<!-- cad-bom:end -->',
  );
  // Reading Markdown must ignore manual BOM table edits and preserve exact graphic entities
  const parsed = readMarkdown(tampered).drawing;
  assert(parsed.entities.filter((e) => e.type === 'insert').length === 2);
  assert(!componentTags(parsed).includes('FAKE-999'));
  // Next save overwrites tampered BOM table cleanly from graphic state
  const resaved = writeMarkdown(parsed, tampered);
  assert(!resaved.includes('FAKE-999'));
});
test('Smart Auto-Trim, Auto-Extend, Offset, Fillet, Explode, and Join', () => {
  const d = emptyDrawing();
  d.entities = [
    line('h', { x: 0, y: 0 }, { x: 30, y: 0 }),
    line('v1', { x: 10, y: -10 }, { x: 10, y: 10 }),
    line('v2', { x: 20, y: -10 }, { x: 20, y: 10 }),
  ];
  // Middle trim splits line into 2 segments
  assert(autoTrim(d, 'h', { x: 15, y: 0 }));
  assert(d.entities.filter((e) => e.type === 'line').length === 4);
  // Extend left segment back toward v2
  const first = d.entities[0] as Extract<Entity, { type: 'line' }>;
  assert(first.b.x === 10);
  // Remove v1, extend first to v2
  d.entities = d.entities.filter((e) => e.id !== 'v1');
  assert(autoExtend(d, first.id, { x: 9, y: 0 }));
  near(first.b.x, 20);
  // Offset line by 5 mm upward
  const off = offsetEntity(first, 5, { x: 5, y: 10 });
  assert(off?.type === 'line');
  near(off.a.y, 5);
  // Fillet two perpendicular lines with radius 4 mm
  const lA = line('fa', { x: 0, y: 0 }, { x: 10, y: 0 });
  const lB = line('fb', { x: 10, y: 0 }, { x: 10, y: 10 });
  const arc = filletLines(lA as any, lB as any, 4);
  assert(arc?.type === 'arc');
  near(arc.radius, 4);
  // Join two connected lines into a polyline, then explode back
  const j = emptyDrawing();
  j.entities = [
    line('j1', { x: 0, y: 0 }, { x: 10, y: 0 }),
    line('j2', { x: 10, y: 0 }, { x: 10, y: 10 }),
  ];
  assert(joinEntities(j, new Set(['j1', 'j2'])));
  assert(j.entities.length === 1 && j.entities[0].type === 'polyline');
  assert(explodeEntity(j, j.entities[0].id));
  assert((j.entities as Entity[]).length === 2 && j.entities.every((e) => e.type === 'line'));
});
test('Polar tracking, Snap Extension, Alignment Tracking, Multifunctional Grips & Camera zoom bounds', () => {
  const pt = polarTrackPoint({ x: 10, y: 10.3 }, { x: 0, y: 0 }, 45);
  assert(pt !== undefined && pt.angle === 45);
  near(pt.point.y, pt.point.x);

  const d = emptyDrawing();
  d.entities = [line('seg', { x: 0, y: 0 }, { x: 10, y: 0 })];
  const s = new SnapIndex();
  s.rebuild(d);
  // Extension snap past endpoint (10,0) at (25, 0.2)
  const ext = s.findWithGuides({ x: 25, y: 0.2 }, 1.0, { enableExtension: true });
  assert(ext.snap?.kind === 'Extension');
  near(ext.snap.point.x, 25);
  near(ext.snap.point.y, 0);
  // Exclude moving entity from snap index so moving objects don't snap to themselves
  const selfExcluded = s.findWithGuides({ x: 10, y: 0 }, 1.0, { excludeOwners: new Set(['seg']) });
  assert(!selfExcluded.snap);

  // Multifunctional grip stretch & move
  const grips = entityGrips(d, d.entities[0]);
  assert(grips.length === 3);
  applyGripDrag(d.entities[0], grips[2], { x: 30, y: 0 }, 'stretch');
  assert((d.entities[0] as any).b.x === 30);

  // Bounded zoom prevents infinite void
  const cam = new Camera();
  cam.zoom(1e9, { x: 400, y: 300 });
  assert(cam.scale === MAX_CAMERA_SCALE);
  cam.zoom(1e-9, { x: 400, y: 300 });
  assert((cam.scale as number) === MIN_CAMERA_SCALE);
});

test('Insert labelStyle: scale-independent text, mirror readability, rotation modes & anchor offsets', () => {
  const doc = emptyDrawing();
  doc.blocks = [
    {
      id: 'VALVE_TEST',
      name: 'VALVE_TEST',
      category: 'Test',
      ports: [],
      attributes: { TAG: 'V-0' },
      entities: [
        {
          id: 'b_rect',
          type: 'polyline',
          layer: '0',
          closed: true,
          points: [
            { x: -10, y: -5 },
            { x: 10, y: -5 },
            { x: 10, y: 5 },
            { x: -10, y: 5 },
          ],
        },
      ],
    },
  ];
  // 1) Scaling insert x3 keeps label text height at default 3 mm and horizontal unless opted in
  const scaled: Insert = {
    id: 'ins_scaled',
    type: 'insert',
    layer: '0',
    block: 'VALVE_TEST',
    position: { x: 50, y: 50 },
    scale: { x: 3, y: 3 },
    rotation: 90,
    attributes: { TAG: 'V-101' },
  };
  doc.entities = [scaled];
  const flatDefault = flatten(doc);
  const textDefault = flatDefault.find((f) => f.entity.type === 'text');
  assert(Boolean(textDefault), 'Label text must be emitted');
  if (textDefault && textDefault.entity.type === 'text') {
    assert(
      Math.abs(textDefault.entity.height - 3) < 1e-6,
      'Default label height stays 3 mm despite 3x scale',
    );
    assert(
      Math.abs(textDefault.entity.rotation) < 1e-6,
      'Default label stays horizontal when rotated 90°',
    );
    assert(
      textDefault.matrix.a === 1 &&
        textDefault.matrix.b === 0 &&
        textDefault.matrix.c === 0 &&
        textDefault.matrix.d === 1,
      'Label text emitted in world identity matrix',
    );
  }

  // 2) Opt-in scaleWithBlock + rotateWithBlock
  scaled.labelStyle = { scaleWithBlock: true, rotateWithBlock: true };
  const flatFollow = flatten(doc);
  const textFollow = flatFollow.find((f) => f.entity.type === 'text');
  if (textFollow && textFollow.entity.type === 'text') {
    assert(
      Math.abs(textFollow.entity.height - 9) < 1e-6,
      'scaleWithBlock=true scales text height 3*3=9',
    );
    assert(
      Math.abs(textFollow.entity.rotation - 90) < 1e-6,
      'rotateWithBlock=true follows block rotation',
    );
  }

  // 3) Mirroring (scale.y = -1) keeps label upright & world-space readable, plus explicit anchors
  const mirrored: Insert = {
    id: 'ins_mir',
    type: 'insert',
    layer: '0',
    block: 'VALVE_TEST',
    position: { x: 100, y: 100 },
    scale: { x: 1, y: -1 },
    rotation: 0,
    attributes: { TAG: 'V-102' },
    labelStyle: { anchor: 'top-left', textHeight: 4, textRotation: 90 },
  };
  doc.entities = [mirrored];
  const flatMir = flatten(doc);
  const textMir = flatMir.find((f) => f.entity.type === 'text');
  assert(Boolean(textMir));
  if (textMir && textMir.entity.type === 'text') {
    assert(
      textMir.matrix.d === 1,
      'Mirrored insert label text must not have negative Y matrix determinant',
    );
    assert(Math.abs(textMir.entity.height - 4) < 1e-6);
    assert(Math.abs(textMir.entity.rotation - 90) < 1e-6);
    assert(textMir.entity.position.x <= 91, 'top-left anchor places text at left edge');
  }
  mirrored.labelStyle = { anchor: 'center' };
  const textCenter = flatten(doc).find((f) => f.entity.type === 'text');
  if (textCenter && textCenter.entity.type === 'text') {
    assert(
      textCenter.entity.position.x < 100 &&
        textCenter.entity.position.x > 90 &&
        Math.abs(textCenter.entity.position.y - 100) < 3,
      'Center anchor horizontally and vertically centers attribute label',
    );
  }
});

test('SnapIndex gridStep prevents off-grid Tracking pulls for Polyline/Line vertices', () => {
  const doc = emptyDrawing();
  doc.entities = [
    {
      id: 'offgrid',
      type: 'line',
      layer: '0',
      a: { x: 100.37, y: 18.42 },
      b: { x: 150.61, y: 18.42 },
    },
  ];
  const index = new SnapIndex();
  index.rebuild(doc);
  // Cursor near grid intersection (25, 20) within tracking Y distance (1.58mm from 18.42)
  const hit = index.findWithGuides({ x: 25, y: 20 }, 10, {
    enableTracking: true,
    enableExtension: false,
    gridStep: 5,
  });
  assert(!hit.snap, 'Tracking must ignore off-grid anchors when gridStep=5 is enforced');

  // If anchor IS on grid, tracking aligns cleanly on grid
  doc.entities.push({
    id: 'ongrid',
    type: 'line',
    layer: '0',
    a: { x: 100, y: 20 },
    b: { x: 150, y: 20 },
  });
  index.rebuild(doc);
  const hitGrid = index.findWithGuides({ x: 25, y: 20.5 }, 10, {
    enableTracking: true,
    enableExtension: false,
    gridStep: 5,
  });
  assert(
    Boolean(
      hitGrid.snap &&
      hitGrid.snap.kind === 'Tracking' &&
      Math.abs(hitGrid.snap.point.y - 20) < 1e-6,
    ),
    'Tracking works for on-grid anchors',
  );
});

test('TitleBlock modes (virtual vs real), standards (ISO-7200/ANSI-Y14/MINIMAL), and YAML sync', () => {
  const doc = emptyDrawing();
  doc.sheet = ensureSheetSetup(doc);
  assert(doc.sheet.titleBlockMode === 'virtual');
  assert(
    buildSheetEntities(doc.sheet).length === 0,
    'Virtual mode emits no physical border geometry',
  );

  doc.sheet.titleBlockMode = 'real';
  doc.sheet.titleBlockStandard = 'ANSI-Y14';
  const ansiEntities = buildSheetEntities(doc.sheet);
  assert(ansiEntities.some((e) => e.type === 'text' && e.text.includes('ANSI Y14.1')));

  doc.sheet.titleBlockStandard = 'MINIMAL';
  const minEntities = buildSheetEntities(doc.sheet);
  assert(
    minEntities.some((e) => e.type === 'polyline' && e.closed) &&
      !minEntities.some((e) => e.type === 'text' && e.text.includes('ANSI Y14.1')),
  );

  const mdClean = writeMarkdown(doc, undefined, { parse, stringify });
  assert(
    !mdClean.includes('cad-titleblock-mode'),
    'Default writeMarkdown omits unsolicited YAML fields',
  );
  const md = writeMarkdown(doc, undefined, { parse, stringify }, { includePresetProperties: true });
  assert(md.includes('cad-titleblock-mode: real'), 'Opt-in preset YAML syncs title block mode');
  const parsed = readMarkdown(md, { parse });
  assert(parsed.drawing.sheet?.titleBlockMode === 'real');
  assert(parsed.drawing.sheet?.titleBlockStandard === 'MINIMAL');
  assert(parsed.frontmatter?.['cad-titleblock-mode'] === 'real');
});

test('ProjectSettings defaults and Visio-style line cross-over humps in Core, SVG and Vector PDF', () => {
  const doc = emptyDrawing();
  doc.projectSettings = {
    defaultTextHeight: 4.5,
    defaultLabelAnchor: 'top',
    defaultLabelOrientation: 'vertical',
    defaultLabelScaleWithBlock: false,
    lineJumps: true,
    jumpRadius: 2.5,
    jumpPriority: 'horizontal',
    jumpScope: 'all',
  };
  doc.blocks = [
    {
      id: 'TANK_TEST',
      name: 'TANK_TEST',
      category: 'Test',
      ports: [],
      attributes: { TAG: 'T-10' },
      entities: [
        {
          id: 't_box',
          type: 'polyline',
          layer: '0',
          closed: true,
          points: [
            { x: -5, y: -5 },
            { x: 5, y: -5 },
            { x: 5, y: 5 },
            { x: -5, y: 5 },
          ],
        },
      ],
    },
  ];
  doc.entities = [
    {
      id: 'ins1',
      type: 'insert',
      layer: '0',
      block: 'TANK_TEST',
      position: { x: 100, y: 100 },
      rotation: 0,
      scale: { x: 2, y: 2 },
      attributes: { TAG: 'T-10' },
    },
    { id: 'h1', type: 'line', layer: '0', a: { x: 0, y: 20 }, b: { x: 40, y: 20 } },
    { id: 'v1', type: 'line', layer: '0', a: { x: 20, y: 0 }, b: { x: 20, y: 40 } },
    // T-junction at endpoint (40, 20) should NOT produce a jump
    { id: 't1', type: 'line', layer: '0', a: { x: 40, y: 20 }, b: { x: 40, y: 50 } },
  ];
  validateDrawing(doc);

  // ProjectSettings govern label defaults when insert.labelStyle is omitted
  const flatLabel = flatten(doc).find((f) => f.entity.type === 'text');
  assert(Boolean(flatLabel));
  if (flatLabel && flatLabel.entity.type === 'text') {
    assert(Math.abs(flatLabel.entity.height - 4.5) < 1e-6);
    assert(Math.abs(flatLabel.entity.rotation - 90) < 1e-6);
    assert(flatLabel.entity.position.y > 110, 'top anchor places label above bounds');
  }

  // Cross-over jump placed cleanly on h1:0 at (20,20) and skipped on v1 and T-junction
  const jumps = computeLineJumps(doc);
  const hJumps = jumps.get('h1:0');
  assert(Boolean(hJumps && hJumps.length === 1), 'Horizontal line gets 1 jump');
  assert(!jumps.has('v1:0'), 'Vertical line does not also jump');
  assert(Math.abs(hJumps![0].center.x - 20) < 1e-6 && Math.abs(hJumps![0].radius - 2.5) < 1e-6);

  const svg = toSvg(doc);
  assert(svg.includes('A 2.5 2.5 0 0'), 'SVG emits semicircular arc hump');
  const pdf = new PdfExporter().exportString(doc);
  assert(pdf.startsWith('%PDF-1.4') && pdf.includes('m ') && pdf.includes(' l S'));
});

test('Binary AutoCAD DWG inspector extracts version, section count and embedded preview image', () => {
  // Build synthetic AC1024 binary container with a small PNG preview at 0x0D seeker
  const buf = new Uint8Array(256);
  const view = new DataView(buf.buffer);
  for (const [i, ch] of Array.from('AC1024').entries()) buf[i] = ch.charCodeAt(0);
  view.setUint32(0x0d, 64, true); // image seeker
  const sentinel = [
    0x1f, 0x25, 0x6d, 0x07, 0xd4, 0x36, 0x28, 0x28, 0x9d, 0x57, 0xca, 0x3f, 0x9d, 0x44, 0x10, 0x2b,
  ];
  sentinel.forEach((b, i) => (buf[64 + i] = b));
  view.setUint32(80, 32, true); // totalSize
  buf[84] = 1; // numImages
  buf[85] = 6; // PNG code
  view.setUint32(86, 128, true); // PNG start
  view.setUint32(90, 20, true); // PNG size
  [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].forEach((b, i) => (buf[128 + i] = b));

  const info = inspectDwgBinary(buf);
  assert(info.isBinary === true);
  assert(info.versionCode === 'AC1024');
  assert(info.release.includes('2010'));
  assert(
    info.previewMime === 'image/png' && info.previewDataUrl?.startsWith('data:image/png;base64,'),
  );

  // ASCII DXF inside .dwg bytes decodes directly as text
  const asciiBytes = new TextEncoder().encode('0\nSECTION\n2\nENTITIES\n0\nENDSEC\n0\nEOF\n');
  const decoded = decodeDwgOrDxfText(asciiBytes);
  assert(decoded.text?.includes('SECTION'));
});

test('Copy auto-increments highest BOM TAG (XV4 -> XV5), Group/Ungroup primitives & symbols, and custom linePattern + DXF tables', () => {
  const d = fixture();
  // Assign valve XV1 and a second valve XV4
  const v = d.entities.find((e) => e.id === 'valve') as Insert;
  v.attributes.TAG = 'XV1';
  const v4 = clone(v);
  v4.id = 'valve-4';
  v4.position = { x: 80, y: 0 };
  v4.attributes.TAG = 'XV4';
  d.entities.push(v4);

  // Copying v (or v4) picks highest suffix + 1 => XV5, next => XV6
  copyEntities(d, new Set(['valve']), { ...identity(), e: 20, f: 20 });
  copyEntities(d, new Set(['valve-4']), { ...identity(), e: 20, f: -20 });
  const valveTags = d.entities
    .filter((e): e is Insert => e.type === 'insert' && e.block === v.block)
    .map((e) => e.attributes.TAG);
  assert(
    valveTags.includes('XV5') && valveTags.includes('XV6'),
    'Copied valves increment from highest XV4 -> XV5, XV6',
  );
  const bom = extractBom(d);
  assert(
    bom.some((r) => r.tag === 'XV5') && bom.some((r) => r.tag === 'XV6'),
    'BOM reflects incremented tags',
  );

  // Group & Ungroup primitives
  d.entities.push(
    { id: 'g1', type: 'line', layer: '0', a: { x: 0, y: 0 }, b: { x: 10, y: 0 } },
    { id: 'g2', type: 'line', layer: '0', a: { x: 10, y: 0 }, b: { x: 10, y: 10 } },
  );
  const grp = groupEntities(d, new Set(['g1', 'g2']), 'Bracket');
  assert(Boolean(grp && grp.type === 'insert'), 'Group creates a block insert');
  assert(
    !d.entities.some((e) => e.id === 'g1' || e.id === 'g2'),
    'Source primitives replaced by group insert',
  );
  assert(ungroupEntity(d, grp!.id), 'Ungroup decomposes group back to lines');
  assert(d.entities.filter((e) => e.type === 'line' && e.b.x === 10).length >= 2);

  // Ungrouping a library symbol (valve) produces editable lines/polylines
  const countBefore = d.entities.length;
  assert(ungroupEntity(d, 'valve'), 'Library symbol ungroups into editable shapes');
  assert(d.entities.length > countBefore);

  // Custom dash/gap spacing & AutoCAD-compatible DXF headers
  const pat = customDashPattern('DASHED', 10, 4);
  equal(pat, [10, -4]);
  d.entities.push({
    id: 'custom-dash',
    type: 'line',
    layer: '0',
    lineType: 'DASHED',
    linePattern: pat,
    a: { x: 0, y: 30 },
    b: { x: 50, y: 30 },
  });
  validateDrawing(d);
  assert(toSvg(d).includes('stroke-dasharray="10 4"'));
  const dxfStr = new DxfExporter().export(d);
  assert(
    dxfStr.includes('ANSI_1252') &&
      dxfStr.includes('ACAD_GROUP') &&
      dxfStr.includes('ACAD_LAYOUT') &&
      dxfStr.includes('ACAD_PLOTSTYLENAME') &&
      dxfStr.includes('ACAD_MLINESTYLE') &&
      dxfStr.includes('*Active') &&
      dxfStr.includes('BYBLOCK') &&
      dxfStr.includes('AcDbRegAppTableRecord\r\n2\r\nACAD\r\n') &&
      dxfStr.includes('0\r\nDIMSTYLE\r\n105\r\n') &&
      dxfStr.includes('AcDbDimStyleTableRecord\r\n2\r\nStandard\r\n') &&
      dxfStr.includes('AcDbBlockTableRecord\r\n2\r\n*Model_Space\r\n340\r\n'),
    'Exported R2010 DXF contains strict AutoCAD AC1024 tables and dictionaries',
  );
  const reimported = new DxfImporter().import(dxfStr).drawing;
  assert(reimported.entities.length >= d.entities.length - 1, 'Strict DXF round-trips cleanly');
});

test('Match Properties, Inside/Outside/Both Offset, Scale entity & configurable Input Bindings', () => {
  const d = emptyDrawing();
  // Match Properties copies layer, color, linetype & linePattern
  const src: Entity = {
    id: 'src',
    type: 'line',
    layer: '0',
    color: 1,
    lineType: 'DASHED',
    linePattern: [8, -3],
    a: { x: 0, y: 0 },
    b: { x: 10, y: 0 },
  };
  const dst: Entity = {
    id: 'dst',
    type: 'line',
    layer: '0',
    a: { x: 0, y: 10 },
    b: { x: 10, y: 10 },
  };
  matchProperties(src, dst);
  assert(
    dst.color === 1 && dst.lineType === 'DASHED' && dst.linePattern?.[0] === 8,
    'matchProperties copied style attributes',
  );

  // Inside / Outside / Both offset on closed rectangle & circle
  const rect: Entity = {
    id: 'rect',
    type: 'polyline',
    layer: '0',
    points: [
      { x: 0, y: 0 },
      { x: 40, y: 0 },
      { x: 40, y: 20 },
      { x: 0, y: 20 },
    ],
    closed: true,
  };
  const rectOut = offsetEntity(rect, 2, { x: 0, y: 0 }, 'outside') as Extract<
    Entity,
    { type: 'polyline' }
  >;
  const rectIn = offsetEntity(rect, 2, { x: 0, y: 0 }, 'inside') as Extract<
    Entity,
    { type: 'polyline' }
  >;
  assert(
    rectOut.points.some((p) => p.x < -1.5) && rectOut.points.some((p) => p.x > 41.5),
    'Outside offset expands closed rectangle outward',
  );
  assert(
    rectIn.points.every((p) => p.x > 1.5 && p.x < 38.5 && p.y > 1.5 && p.y < 18.5),
    'Inside offset shrinks closed rectangle inward',
  );
  assert(
    offsetEntity(rect, 15, { x: 0, y: 0 }, 'inside') === undefined,
    'Excessive inward offset safely returns undefined instead of inverting geometry',
  );
  const bothCirc = offsetBothSides(
    { id: 'c', type: 'circle', layer: '0', center: { x: 0, y: 0 }, radius: 10 },
    3,
  ) as Extract<Entity, { type: 'circle' }>[];
  assert(bothCirc.length === 2 && bothCirc[0].radius === 13 && bothCirc[1].radius === 7);

  // Uniform Scale about base point
  scaleEntity(dst, { x: 0, y: 10 }, 2.5);
  equal(dst.b, { x: 25, y: 10 });

  // Input bindings defaults & sanitization (F3, F8, F9 + custom aliases + mouse)
  const def = defaultInputBindings();
  assert(
    def.shortcuts.toggleOsnap === 'F3' &&
      def.shortcuts.toggleOrtho === 'F8' &&
      def.shortcuts.toggleGridSnap === 'F9',
  );
  const custom = sanitizeInputBindings({
    shortcuts: { toggleOsnap: 'Alt+S' },
    customAliases: { ln: 'line' },
    mouse: {
      rightClick: 'repeat_last',
      middleClick: 'zoom_extents',
      wheelMode: 'pan_vertical',
      invertWheelZoom: true,
    },
  });
  assert(
    custom.customAliases.LN === 'LINE' &&
      matchesKeyCombo({ key: 's', altKey: true }, custom.shortcuts.toggleOsnap) &&
      normalizeKeyCombo({ key: 'F8' }) === 'F8' &&
      custom.mouse.invertWheelZoom === true,
  );
});

test('Multi-page schematics, Multi-page Standard Print PDF & Search with Layer Highlight', () => {
  const d = fixture();
  const pages = ensurePages(d, 'Plant');
  const page1Id = pages[0].id;
  assert(pages.length === 1 && d.activePageId === page1Id);

  // Add second page with distinct object on hidden/colored layer & search across pages
  const p2 = addDrawingPage(d, 'Power Distribution', false);
  d.layers.push({
    id: 'HIDDEN_L',
    name: 'Conduit-Hidden',
    visible: false,
    locked: false,
    color: 1,
    lineType: 'DASHED',
  });
  d.entities.push({
    id: 'txt-p2',
    type: 'text',
    layer: 'HIDDEN_L',
    position: { x: 100, y: 50 },
    height: 4,
    rotation: 0,
    text: 'MAIN FEEDER 400V',
  });
  validateDrawing(d);

  // Rename, reorder & switch pages safely preserving per-page entities
  assert(renameDrawingPage(d, p2.id, 'Page 2 Power'));
  assert(moveDrawingPage(d, p2.id, -1) && d.pages![0].id === p2.id);
  assert(switchDrawingPage(d, page1Id) && d.entities.some((e) => e.id === 'pump'));

  // Search reveals layer name, color & hidden status across pages
  const hits = searchDrawing(d, 'MAIN FEEDER');
  assert(
    hits.length === 1 &&
      hits[0].layerName === 'Conduit-Hidden' &&
      hits[0].layerVisible === false &&
      hits[0].layerColor === 1 &&
      hits[0].pageName === 'Page 2 Power',
    'Search highlights matching entity layer name, visibility, color & page',
  );

  // Standard paper Print auto-fit & multi-page Vector PDF generation
  const fit = bestPrintFit({ minX: 0, minY: 0, maxX: 2500, maxY: 1400 }, 'A4', 'auto', 12, true);
  assert(
    fit.orientation === 'landscape' && fit.scaleRatio <= 0.12 && fit.scaleLabel.startsWith('1:'),
  );
  const multiPdf = new PdfExporter().exportString(d, {
    paperSize: 'A4',
    orientation: 'auto',
    fitToPage: true,
    snapToStandardScale: true,
    allPages: true,
  });
  assert(multiPdf.startsWith('%PDF-1.4') && multiPdf.includes('/Count 2'));

  assert(deleteDrawingPage(d, p2.id) && d.pages!.length === 1);
});

test('Blank P&ID bubbles (ISA-5.1/BS 1646/DIN 28004), IEC 62271 switchgear, Line Arrows (L/N + reverse) & per-crossing Bridges', () => {
  const catalog = builtinLibrary();
  // Ensure BS 1646, DIN 28004, IEC 62271-1 and IEC/EN 62271-200 are registered
  const stds = new Set(catalog.map((b) => b.standard));
  for (const s of ['ANSI/ISA-5.1', 'BS 1646', 'DIN 28004', 'IEC 62271-1', 'IEC/EN 62271-200']) {
    assert(stds.has(s), `Missing required engineering standard: ${s}`);
  }
  // All P&ID instrument/DCS bubbles must be purely geometric (no baked text like "TI"/"PI")
  const pidInstruments = catalog.filter(
    (b) =>
      b.library === 'P&ID' &&
      (b.group?.includes('instrument') ||
        b.group?.includes('DCS') ||
        b.id.startsWith('pid-PT') ||
        b.id.startsWith('pid-TT') ||
        b.id.startsWith('pid-FT') ||
        b.id.startsWith('pid-LT')),
  );
  assert(pidInstruments.length >= 40, 'Expected full ISA/BS/DIN P&ID instrument bubbles');
  assert(
    pidInstruments.every((b) => !b.entities.some((e) => e.type === 'text')),
    'P&ID sensor/indicator bubbles must not contain hardcoded text inside circles',
  );

  // Arrow markers: L/N intervals (N=4 => 3 markers at 25, 50, 75 mm) + Reversed flip
  const markers = computeLineArrowMarkers(
    [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ],
    false,
    { style: 'closed', placement: 'every_n', segments: 4, reversed: false, size: 4 },
  );
  assert(
    markers.length === 3 &&
      Math.abs(markers[0].position.x - 25) < 0.01 &&
      Math.abs(markers[1].position.x - 50) < 0.01 &&
      Math.abs(markers[2].position.x - 75) < 0.01 &&
      Math.abs(markers[0].angleDeg) < 0.01,
    'Every L/N arrow placement computes exact subdivision markers',
  );
  const reversed = computeLineArrowMarkers(
    [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ],
    false,
    { style: 'stealth', placement: 'end', reversed: true, size: 4 },
  );
  assert(Math.abs(reversed[0].angleDeg - 180) < 0.01, 'Reversed arrow flips direction 180°');

  // Arrow rendering in SVG and Vector PDF
  const d = emptyDrawing();
  d.entities = [
    {
      id: 'h',
      type: 'line',
      layer: '0',
      a: { x: 0, y: 20 },
      b: { x: 60, y: 20 },
      arrows: { style: 'closed', placement: 'both', size: 4 },
    },
    { id: 'v', type: 'line', layer: '0', a: { x: 30, y: 0 }, b: { x: 30, y: 40 } },
  ];
  assert(toSvg(d).includes('<path d="M 60 20'));
  assert(new PdfExporter().exportString(d).startsWith('%PDF-1.4'));

  // Per-crossing bridge toggle works even when global lineJumps default is false
  assert(computeLineJumps(d).size === 0);
  const crossings = findAllLineCrossings(d);
  assert(crossings.length === 1 && crossings[0].active === false);
  assert(toggleLineCrossingJump(d, crossings[0].key) === true);
  assert(computeLineJumps(d).size === 1, 'Manual intersection bridge activates crossing hump');
  assert(toggleLineCrossingJump(d, crossings[0].key) === false);
  assert(computeLineJumps(d).size === 0, 'Toggling again removes manual bridge hump');
});

test('N=1/3/5 arrow intervals, Vertical vs Horizontal bridge overrides, P&ID extended equipment, Piping/Single-Line notes, and Grid Snap extension filter', () => {
  // 1) Arrow every_n supports N=1 (midpoint), N=3 (2 arrows), N=5 (4 arrows)
  const seg = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ];
  const m1 = computeLineArrowMarkers(seg, false, {
    style: 'closed',
    placement: 'every_n',
    segments: 1,
    size: 3,
  });
  assert(m1.length === 1 && Math.abs(m1[0].position.x - 50) < 0.01, 'N=1 places midpoint arrow');
  const m3 = computeLineArrowMarkers(seg, false, {
    style: 'closed',
    placement: 'every_n',
    segments: 3,
    size: 3,
  });
  assert(
    m3.length === 2 &&
      Math.abs(m3[0].position.x - 100 / 3) < 0.05 &&
      Math.abs(m3[1].position.x - 200 / 3) < 0.05,
    'N=3 places 2 arrows at L/3 and 2L/3',
  );
  const m5 = computeLineArrowMarkers(seg, false, {
    style: 'closed',
    placement: 'every_n',
    segments: 5,
    size: 3,
  });
  assert(
    m5.length === 4 && Math.abs(m5[3].position.x - 80) < 0.01,
    'N=5 places 4 arrows at L/5..4L/5',
  );

  // 2) Vertical vs Horizontal per-crossing bridge axis override + validation
  const bd = emptyDrawing();
  bd.entities = [
    { id: 'h', type: 'line', layer: '0', a: { x: 0, y: 20 }, b: { x: 40, y: 20 } },
    { id: 'v', type: 'line', layer: '0', a: { x: 20, y: 0 }, b: { x: 20, y: 40 } },
  ];
  const c0 = findAllLineCrossings(bd)[0];
  setLineCrossingJump(bd, c0.key, { active: true, axis: 'vertical' });
  const cVert = findAllLineCrossings(bd)[0];
  assert(
    cVert.active && cVert.axis === 'vertical' && cVert.winnerId === 'v',
    'Vertical bridge promotes vertical segment',
  );
  const validated = validateDrawing(bd);
  assert(
    validated.jumpDirectionOverrides?.[c0.key] === 'vertical',
    'validateDrawing preserves jumpDirectionOverrides',
  );

  // 3) Extended industrial P&ID equipment catalog
  const catalog = builtinLibrary();
  for (const id of [
    'pid-pump-centrifugal-motor',
    'pid-pump-screw',
    'pid-pump-diaphragm',
    'pid-comp-centrifugal',
    'pid-turbine-steam',
    'pid-drum-vertical',
    'pid-ko-drum',
    'pid-tank-cone-roof',
    'pid-tank-floating-roof',
    'pid-hx-utube',
    'pid-fan-centrifugal',
    'pid-reducer-eccentric',
    'pid-steam-ejector',
  ]) {
    assert(
      catalog.some((b) => b.id === id),
      `Missing extended P&ID symbol: ${id}`,
    );
  }

  // 4) Piping & Single-Line line notes preserved in validation, matchProperties, and searchDrawing
  const pd = emptyDrawing();
  pd.entities = [
    {
      id: 'pipe1',
      type: 'line',
      layer: '0',
      discipline: 'piping',
      serviceTag: 'P-101-A',
      pipeSpec: 'DN100 CS-A106',
      lineNotes: 'Hot brine supply to heat exchanger',
      a: { x: 0, y: 0 },
      b: { x: 50, y: 0 },
    },
    {
      id: 'pipe2',
      type: 'polyline',
      layer: '0',
      closed: false,
      points: [
        { x: 0, y: 10 },
        { x: 50, y: 10 },
      ],
    },
  ];
  const vpd = validateDrawing(pd);
  matchProperties(vpd.entities[0], vpd.entities[1]);
  assert(
    vpd.entities[1].type === 'polyline' &&
      vpd.entities[1].discipline === 'piping' &&
      vpd.entities[1].lineNotes === 'Hot brine supply to heat exchanger',
    'matchProperties copies discipline & line notes onto target lines/polylines',
  );
  const found = searchDrawing(vpd, 'brine');
  assert(
    found.length === 2 && found[0].matchedField === 'Line Note / Spec',
    'searchDrawing matches piping/single-line notes',
  );

  // 5) SnapIndex ignores off-grid Perpendicular/Extension when gridStep is set
  const sd = emptyDrawing();
  sd.entities = [{ id: 'diag', type: 'line', layer: '0', a: { x: 0, y: 0 }, b: { x: 7, y: 7 } }];
  const sidx = new SnapIndex();
  sidx.rebuild(sd);
  const offSnap = sidx.findWithGuides({ x: 3.6, y: 3.4 }, 2, {
    basePoint: { x: 10, y: 0 },
    enableExtension: true,
    enableTracking: true,
    gridStep: 5,
  });
  assert(!offSnap.snap, 'Off-grid Perpendicular/Extension must not pull vertices off gridStep=5');
});

test('Alignment H/V centers, Layer Merge, Dynamic Port Connectors (Line/Polyline), Label Offset Grip & Line Piping Text in SVG/PDF', () => {
  // 1) alignEntities horizontal & vertical center alignment
  const ad = emptyDrawing();
  ad.entities = [
    { id: 'r1', type: 'line', layer: '0', a: { x: 0, y: 0 }, b: { x: 20, y: 10 } },
    { id: 'r2', type: 'line', layer: '0', a: { x: 40, y: 20 }, b: { x: 60, y: 30 } },
  ];
  assert(alignEntities(ad, new Set(['r1', 'r2']), 'center-x'), 'align center-x returns true');
  const b1x = entityBounds(ad, ad.entities[0]);
  const b2x = entityBounds(ad, ad.entities[1]);
  assert(
    Math.abs((b1x.minX + b1x.maxX) / 2 - (b2x.minX + b2x.maxX) / 2) < 1e-6,
    'Entities share identical horizontal center X after center-x alignment',
  );
  assert(alignEntities(ad, new Set(['r1', 'r2']), 'center-y'), 'align center-y returns true');
  const b1y = entityBounds(ad, ad.entities[0]);
  const b2y = entityBounds(ad, ad.entities[1]);
  assert(
    Math.abs((b1y.minY + b1y.maxY) / 2 - (b2y.minY + b2y.maxY) / 2) < 1e-6,
    'Entities share identical vertical center Y after center-y alignment',
  );

  // 2) mergeLayers merges across entities, pages & blocks while guarding layer 0
  const md = emptyDrawing();
  md.layers.push(
    { id: 'l_src', name: 'TEMP_SRC', visible: true, locked: false, color: 1, lineType: 'DASHED' },
    { id: 'l_dst', name: 'PIPING', visible: true, locked: false, color: 3, lineType: 'CONTINUOUS' },
  );
  md.blocks.push({
    id: 'b_merge',
    name: 'Box',
    category: 'Custom',
    entities: [{ id: 'be', type: 'line', layer: 'l_src', a: { x: 0, y: 0 }, b: { x: 5, y: 0 } }],
    ports: [],
    attributes: {},
  });
  md.entities.push({
    id: 'me',
    type: 'line',
    layer: 'l_src',
    a: { x: 0, y: 0 },
    b: { x: 10, y: 0 },
  });
  assert(!mergeLayers(md, '0', 'l_dst'), 'Cannot delete/merge default layer 0');
  assert(mergeLayers(md, 'l_src', 'l_dst'), 'mergeLayers returns true for non-zero layers');
  assert(!md.layers.some((l) => l.id === 'l_src'), 'Source layer removed');
  assert(
    md.entities[0].layer === 'l_dst' && md.blocks[0].entities[0].layer === 'l_dst',
    'All entities reassigned',
  );

  // 3) Dynamic Port Connectors on Line & Polyline (straight_to_polyline vs keep_original)
  const dc = fixture();
  dc.projectSettings = {
    ...defaultProjectSettings(),
    dynamicPortConnectors: true,
    connectorRoutingMode: 'straight_to_polyline',
  };
  dc.entities = [
    {
      id: 'i1',
      type: 'insert',
      layer: '0',
      block: 'pid-pump',
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      attributes: { TAG: 'P-1' },
    },
    {
      id: 'i2',
      type: 'insert',
      layer: '0',
      block: 'pid-control',
      position: { x: 40, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      attributes: { TAG: 'XV-1' },
    },
    {
      id: 'conn_line',
      type: 'line',
      layer: '0',
      a: { x: 6, y: 0 },
      b: { x: 34, y: 0 },
      from: { insertId: 'i1', portId: 'OUT' },
      to: { insertId: 'i2', portId: 'IN' },
    },
  ];
  const movedValve = dc.entities[1] as Insert;
  movedValve.position = { x: 40, y: 20 };
  updateWires(dc);
  const converted = dc.entities.find((e) => e.id === 'conn_line')!;
  assert(
    converted.type === 'polyline' && converted.points.length >= 3,
    'straight_to_polyline converts axis-aligned attached Line into orthogonal Polyline on diagonal move',
  );

  const dk = fixture();
  dk.projectSettings = {
    ...defaultProjectSettings(),
    dynamicPortConnectors: true,
    connectorRoutingMode: 'keep_original',
  };
  dk.entities = [
    { ...(dc.entities[0] as Insert) },
    { ...(dc.entities[1] as Insert), position: { x: 40, y: 20 } },
    {
      id: 'conn_line',
      type: 'line',
      layer: '0',
      a: { x: 6, y: 0 },
      b: { x: 34, y: 0 },
      from: { insertId: 'i1', portId: 'OUT' },
      to: { insertId: 'i2', portId: 'IN' },
    },
  ];
  updateWires(dk);
  const kept = dk.entities.find((e) => e.id === 'conn_line')!;
  assert(
    kept.type === 'line' && Math.abs(kept.b.y - 20) < 1e-6,
    'keep_original keeps straight Line attached cleanly to moved port',
  );

  // 4) Interactive labelStyle.textOffset grip & flatten + SVG/PDF Piping text annotation rendering
  const insGrips = entityGrips(dk, dk.entities[0], true);
  const labelGrip = insGrips.find((g) => g.kind === 'label');
  assert(!!labelGrip, 'Interactive label grip exposed when requested');
  applyGripDrag(dk.entities[0], labelGrip!, {
    x: labelGrip!.point.x + 12,
    y: labelGrip!.point.y - 4,
  });
  assert(
    Math.abs(((dk.entities[0] as Insert).labelStyle?.textOffset?.x ?? 0) - 12) < 1e-6,
    'Dragging label grip updates labelStyle.textOffset',
  );
  const validatedOffset = validateDrawing(dk);
  assert(
    (validatedOffset.entities[0] as Insert).labelStyle?.textOffset?.y === -4,
    'validateDrawing preserves labelStyle.textOffset',
  );

  const ld = emptyDrawing();
  ld.entities = [
    {
      id: 'pipe_txt',
      type: 'line',
      layer: '0',
      discipline: 'piping',
      serviceTag: 'P-101',
      pipeSpec: 'DN100',
      lineNotes: 'Steam',
      a: { x: 0, y: 0 },
      b: { x: 80, y: 0 },
    },
  ];
  assert(
    formatLineAnnotation(ld.entities[0] as Extract<Entity, { type: 'line' }>) ===
      'P-101 · DN100 · Steam',
    'formatLineAnnotation joins tag, spec, notes',
  );
  assert(
    !!lineAnnotationPlacement(ld.entities[0] as Extract<Entity, { type: 'line' }>),
    'lineAnnotationPlacement returns upright placement',
  );
  const svgOut = toSvg(ld);
  assert(
    svgOut.includes('P-101 · DN100 · Steam'),
    'toSvg renders Piping annotation text directly on line',
  );
  const pdfStr = new PdfExporter().exportString(ld);
  assert(pdfStr.includes('P-101'), 'Vector PDF renders Piping annotation text directly on line');
});

test('Point 12: Symmetric sheet margins, Mode A auto-fit keeping mm coordinates & paper title-block text height, and BOM Brand/Model', () => {
  const sd = emptyDrawing(builtinLibrary());
  sd.entities = [
    {
      id: 'big1',
      type: 'line',
      layer: '0',
      a: { x: 100, y: 50 },
      b: { x: 1900, y: 1250 },
    },
    {
      id: 'b_ins',
      type: 'insert',
      layer: '0',
      block: 'pid-pump',
      position: { x: 500, y: 500 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      attributes: { TAG: 'P-10', BRAND: 'Siemens', MODEL: '1LE1-30kW' },
    },
  ];
  const bom = extractBom(sd);
  assert(bom[0].brand === 'Siemens' && bom[0].model === '1LE1-30kW', 'BOM extracts Brand & Model');
  const mdTbl = formatBomMarkdown(sd);
  assert(
    mdTbl.includes('| Brand | Model |') && mdTbl.includes('Siemens') && mdTbl.includes('1LE1-30kW'),
    'Markdown BOM table includes Brand and Model columns',
  );

  const sh = ensureSheetSetup(sd, 'Plant Layout');
  sh.enabled = true;
  sh.titleBlockMode = 'real';
  const res = fitSheetToDrawing(
    sd,
    { minX: 100, minY: 50, maxX: 1900, maxY: 1250 },
    { size: 'A4', orientation: 'landscape', marginMm: 10, snapToStandard: true },
  );
  // Real drawing coordinates must remain completely untouched in millimeters
  assert(
    (sd.entities[0] as Extract<Entity, { type: 'line' }>).a.x === 100 &&
      (sd.entities[0] as Extract<Entity, { type: 'line' }>).b.x === 1900,
    'Mode A must never alter drawing entity coordinates',
  );
  // Outer sheet rect must have exact equal margins on all 4 sides around inner drawing frame
  const sheetEnts = buildSheetEntities(sd.sheet!);
  const rects = sheetEnts.filter(
    (e): e is Extract<Entity, { type: 'polyline' }> => e.type === 'polyline',
  );
  const outer = rects[0].points;
  const inner = rects[1].points;
  const leftMargin = inner[0].x - outer[0].x;
  const rightMargin = outer[1].x - inner[1].x;
  const bottomMargin = inner[0].y - outer[0].y;
  const topMargin = outer[2].y - inner[2].y;
  near(leftMargin, rightMargin, 1e-4);
  near(bottomMargin, topMargin, 1e-4);
  near(leftMargin, topMargin, 1e-4);

  // Title block text converted back through scaleRatio retains exact fixed readable physical paper height
  const titleTxt = sheetEnts.find(
    (e): e is Extract<Entity, { type: 'text' }> => e.type === 'text' && e.text === 'Plant Layout',
  )!;
  near(titleTxt.height * parseScaleRatio(res.scaleLabel), 3.2, 1e-3);

  // Vector PDF supports explicit true_scale vs custom_scale vs fitToPage with symmetric margins
  const fitPdf = new PdfExporter().exportString(sd, {
    paperSize: 'A4',
    orientation: 'landscape',
    marginMm: 10,
    fitToPage: true,
    snapToStandardScale: true,
  });
  assert(fitPdf.includes('/MediaBox [0 0 841.89 595.276]') && fitPdf.includes('Plant Layout'));
  const customPdf = new PdfExporter().exportString(sd, {
    paperSize: 'A3',
    orientation: 'landscape',
    marginMm: 15,
    fitToPage: false,
    customScale: '1:10',
  });
  assert(customPdf.includes('/MediaBox [0 0 1190.551 841.89]'));
});

console.log(`\n${tests - failures.length}/${tests} tests passed`);
if (failures.length) throw new Error(`Failed: ${failures.join(', ')}`);
export { fixture };
