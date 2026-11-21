import { LINE_TYPES, importedLineType } from '../core/linetypes';
import {
  Block,
  Drawing,
  Entity,
  Insert,
  LineType,
  Point,
  clone,
  emptyDrawing,
  uid,
  validateDrawing,
} from '../core/model';
import {
  add,
  angle,
  distance,
  insertMatrix,
  normAngle,
  sub,
  transform,
  updateWires,
} from '../core/geometry';
type Pair = { code: number; value: string };
type RecordDXF = { type: string; pairs: Pair[] };
const val = (r: RecordDXF, c: number, f = ''): string =>
  r.pairs.find((p) => p.code === c)?.value ?? f;
const num = (r: RecordDXF, c: number, f = 0): number => {
  const s = val(r, c);
  if (!s) return f;
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`Invalid DXF number (${r.type}/${c})`);
  return n;
};
const point = (r: RecordDXF, c = 10): Point => ({
  x: num(r, c),
  y: num(r, c + 10),
});
const cleanName = (s: string): string =>
  s.replace(/[<>/\\":;?*|=\r\n]/g, '_').slice(0, 200) || 'unnamed';
const textValue = (s: string): string => s.replace(/[\r\n]/g, ' ').replace(/\\/g, '\\U+005C');
const decode = (s: string): string =>
  s.replace(/\\U\+([\da-f]{4})/gi, (_, h: string) => String.fromCharCode(parseInt(h, 16)));
const kind = importedLineType;
function metadata(r: RecordDXF): Record<string, unknown> {
  const start = r.pairs.findIndex((p) => p.code === 1001 && p.value === 'OBSIDIAN_CAD');
  if (start < 0) return {};
  let s = '';
  for (const p of r.pairs.slice(start + 1)) {
    if (p.code === 1001) break;
    if (p.code === 1000) s += p.value;
  }
  try {
    const parsed: unknown = JSON.parse(s);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}
class Writer {
  lines: string[] = [];
  serial = 256;
  handle(): string {
    return (++this.serial).toString(16).toUpperCase();
  }
  p(...pairs: (string | number)[]): void {
    for (let i = 0; i < pairs.length; i += 2) {
      const v = pairs[i + 1];
      this.lines.push(String(pairs[i]), typeof v === 'number' ? String(v) : v);
    }
  }
  record(type: string, owner?: string, handle = this.handle()): string {
    this.p(0, type, 5, handle);
    if (owner) this.p(330, owner);
    return handle;
  }
  meta(value: unknown): void {
    const s = JSON.stringify(value);
    this.p(1001, 'OBSIDIAN_CAD');
    let chunk = '',
      bytes = 0;
    const encoder = new TextEncoder();
    for (const character of s) {
      const length = encoder.encode(character).length;
      if (bytes + length > 220) {
        this.p(1000, chunk);
        chunk = '';
        bytes = 0;
      }
      chunk += character;
      bytes += length;
    }
    if (chunk) this.p(1000, chunk);
  }
}
export class DxfExporter {
  export(drawing: Drawing): string {
    const d = validateDrawing(drawing),
      w = new Writer();
    const layerNames = new Map<string, string>(),
      usedLayers = new Set<string>();
    for (const l of d.layers) {
      const stem = cleanName(l.name);
      let name = stem,
        n = 1;
      while (usedLayers.has(name.toUpperCase())) name = `${stem}_${n++}`;
      usedLayers.add(name.toUpperCase());
      layerNames.set(l.id, name);
    }
    if (!usedLayers.has('0')) layerNames.set('__zero', '0');
    const blockNames = new Map<string, string>(),
      usedBlocks = new Set<string>();
    for (const b of d.blocks) {
      const stem = cleanName(b.name);
      let name = stem,
        n = 1;
      while (usedBlocks.has(name.toUpperCase())) name = `${stem}_${n++}`;
      usedBlocks.add(name.toUpperCase());
      blockNames.set(b.id, name);
    }
    const tableHandles = new Map(
      ['VPORT', 'LTYPE', 'LAYER', 'STYLE', 'VIEW', 'UCS', 'APPID', 'DIMSTYLE', 'BLOCK_RECORD'].map(
        (n) => [n, w.handle()],
      ),
    );
    const model = w.handle(),
      paper = w.handle(),
      root = w.handle(),
      groupDict = w.handle(),
      layoutDict = w.handle(),
      modelLayout = w.handle(),
      paperLayout = w.handle(),
      mlineDict = w.handle(),
      stdMline = w.handle(),
      plotDict = w.handle(),
      plotPlaceholder = w.handle();
    const blockRecords = new Map(d.blocks.map((b) => [b.id, w.handle()]));
    w.p(
      0,
      'SECTION',
      2,
      'HEADER',
      9,
      '$ACADVER',
      1,
      'AC1024',
      9,
      '$DWGCODEPAGE',
      3,
      'ANSI_1252',
      9,
      '$INSUNITS',
      70,
      4,
      9,
      '$MEASUREMENT',
      70,
      1,
      9,
      '$HANDSEED',
      5,
      'FFFFFFF',
      0,
      'ENDSEC',
      0,
      'SECTION',
      2,
      'CLASSES',
      0,
      'ENDSEC',
      0,
      'SECTION',
      2,
      'TABLES',
    );
    const table = (name: string, count: number): string => {
      const h = tableHandles.get(name)!;
      w.p(0, 'TABLE', 2, name, 5, h, 330, '0', 100, 'AcDbSymbolTable', 70, count);
      return h;
    };
    const vh = table('VPORT', 1);
    w.record('VPORT', vh);
    w.p(
      100,
      'AcDbSymbolTableRecord',
      100,
      'AcDbViewportTableRecord',
      2,
      '*Active',
      70,
      0,
      10,
      0,
      20,
      0,
      11,
      1,
      21,
      1,
      12,
      0,
      22,
      0,
      13,
      0,
      23,
      0,
      14,
      0.5,
      24,
      0.5,
      15,
      0.5,
      25,
      0.5,
      16,
      0,
      26,
      0,
      36,
      1,
      17,
      0,
      27,
      0,
      37,
      0,
      40,
      1000,
      41,
      1.34,
      42,
      50,
      43,
      0,
      44,
      0,
      50,
      0,
      51,
      0,
      71,
      0,
      72,
      1000,
      73,
      1,
      74,
      3,
      75,
      0,
      76,
      0,
      77,
      0,
      78,
      0,
      281,
      0,
      65,
      0,
      146,
      0,
    );
    w.p(0, 'ENDTAB');
    const lt = table('LTYPE', Object.keys(LINE_TYPES).length + 2);
    for (const [name, pattern] of [
      ['BYBLOCK', []],
      ['BYLAYER', []],
      ...Object.entries(LINE_TYPES).map(([id, v]) => [id, v.pattern] as [string, number[]]),
    ] as [string, number[]][]) {
      w.record('LTYPE', lt);
      w.p(
        100,
        'AcDbSymbolTableRecord',
        100,
        'AcDbLinetypeTableRecord',
        2,
        name,
        70,
        0,
        3,
        name,
        72,
        65,
        73,
        pattern.length,
        40,
        pattern.reduce((s, n) => s + Math.abs(n), 0),
      );
      pattern.forEach((n) => w.p(49, n, 74, 0));
    }
    w.p(0, 'ENDTAB');
    const lh = table('LAYER', layerNames.size);
    for (const [id, name] of layerNames) {
      const l = d.layers.find((l) => l.id === id);
      w.record('LAYER', lh);
      w.p(
        100,
        'AcDbSymbolTableRecord',
        100,
        'AcDbLayerTableRecord',
        2,
        name,
        70,
        l?.locked ? 4 : 0,
        62,
        (l?.color ?? 7) * (l?.visible === false ? -1 : 1),
        6,
        l?.lineType ?? 'CONTINUOUS',
        290,
        1,
        370,
        -3,
        390,
        plotPlaceholder,
      );
    }
    w.p(0, 'ENDTAB');
    const sh = table('STYLE', 1);
    w.record('STYLE', sh);
    w.p(
      100,
      'AcDbSymbolTableRecord',
      100,
      'AcDbTextStyleTableRecord',
      2,
      'STANDARD',
      70,
      0,
      40,
      0,
      41,
      1,
      50,
      0,
      71,
      0,
      42,
      2.5,
      3,
      'txt',
      4,
      '',
    );
    w.p(0, 'ENDTAB');
    for (const name of ['VIEW', 'UCS']) {
      table(name, 0);
      w.p(0, 'ENDTAB');
    }
    const ah = table('APPID', 2);
    for (const appName of ['ACAD', 'OBSIDIAN_CAD']) {
      w.record('APPID', ah);
      w.p(100, 'AcDbSymbolTableRecord', 100, 'AcDbRegAppTableRecord', 2, appName, 70, 0);
    }
    w.p(0, 'ENDTAB');
    const dsh = table('DIMSTYLE', 1);
    w.p(
      100,
      'AcDbDimStyleTable',
      71,
      1,
      0,
      'DIMSTYLE',
      105,
      w.handle(),
      330,
      dsh,
      100,
      'AcDbSymbolTableRecord',
      100,
      'AcDbDimStyleTableRecord',
      2,
      'Standard',
      70,
      0,
      40,
      1,
      41,
      2.5,
      42,
      0.625,
      43,
      3.75,
      44,
      1.25,
      140,
      2.5,
      141,
      2.5,
      144,
      1,
      147,
      0.625,
      271,
      2,
      272,
      2,
      273,
      2,
      277,
      2,
      371,
      -2,
      372,
      -2,
      0,
      'ENDTAB',
    );
    const bh = table('BLOCK_RECORD', d.blocks.length + 2);
    for (const [name, h, layoutH] of [
      ['*Model_Space', model, modelLayout],
      ['*Paper_Space', paper, paperLayout],
      ...d.blocks.map((b) => [blockNames.get(b.id)!, blockRecords.get(b.id)!, '0']),
    ]) {
      w.record('BLOCK_RECORD', bh, h);
      w.p(
        100,
        'AcDbSymbolTableRecord',
        100,
        'AcDbBlockTableRecord',
        2,
        name,
        340,
        layoutH,
        70,
        0,
        280,
        1,
        281,
        0,
      );
    }
    w.p(0, 'ENDTAB', 0, 'ENDSEC', 0, 'SECTION', 2, 'BLOCKS');
    const common = (e: Entity, type: string, owner: string): string => {
      const h = w.record(type, owner);
      w.p(100, 'AcDbEntity', 8, layerNames.get(e.layer) ?? '0');
      if (e.color !== undefined) w.p(62, e.color);
      if (e.lineType) w.p(6, e.lineType);
      return h;
    };
    const textGeometry = (position: Point, height: number, value: string, rotation: number): void =>
      w.p(
        100,
        'AcDbText',
        10,
        position.x,
        20,
        position.y,
        30,
        0,
        40,
        height,
        1,
        textValue(value),
        50,
        rotation,
        41,
        1,
        7,
        'STANDARD',
        72,
        0,
        11,
        position.x,
        21,
        position.y,
        31,
        0,
      );
    const writeEntity = (e: Entity, owner: string): void => {
      switch (e.type) {
        case 'line':
          common(e, 'LINE', owner);
          w.p(100, 'AcDbLine', 10, e.a.x, 20, e.a.y, 30, 0, 11, e.b.x, 21, e.b.y, 31, 0);
          break;
        case 'dimension':
          common(e, 'LINE', owner);
          w.p(100, 'AcDbLine', 10, e.a.x, 20, e.a.y, 30, 0, 11, e.b.x, 21, e.b.y, 31, 0);
          w.meta({
            id: e.id,
            dimension: true,
            kind: e.kind,
            offset: e.offset,
            text: e.text,
          });
          return;
        case 'polyline':
        case 'wire':
          common(e, 'LWPOLYLINE', owner);
          w.p(
            100,
            'AcDbPolyline',
            90,
            e.points.length,
            70,
            e.type === 'polyline' && e.closed ? 1 : 0,
          );
          e.points.forEach((p) => w.p(10, p.x, 20, p.y));
          break;
        case 'circle':
        case 'arc':
          common(e, e.type.toUpperCase(), owner);
          w.p(100, 'AcDbCircle', 10, e.center.x, 20, e.center.y, 30, 0, 40, e.radius);
          if (e.type === 'arc') w.p(100, 'AcDbArc', 50, normAngle(e.start), 51, normAngle(e.end));
          break;
        case 'text':
          common(e, 'TEXT', owner);
          textGeometry(e.position, e.height, e.text, e.rotation);
          w.p(100, 'AcDbText', 73, 0);
          break;
        case 'insert': {
          const attrs = Object.entries(e.attributes),
            h = common(e, 'INSERT', owner);
          w.p(100, 'AcDbBlockReference');
          if (attrs.length) w.p(66, 1);
          w.p(
            2,
            blockNames.get(e.block)!,
            10,
            e.position.x,
            20,
            e.position.y,
            30,
            0,
            41,
            e.scale.x,
            42,
            e.scale.y,
            43,
            1,
            50,
            e.rotation,
          );
          w.meta({ id: e.id, blockId: e.block });
          attrs.forEach(([key, value], i) => {
            const p = transform({ x: 7, y: 6 - i * 4 }, insertMatrix(e));
            w.record('ATTRIB', h);
            w.p(100, 'AcDbEntity', 8, layerNames.get(e.layer) ?? '0');
            textGeometry(p, 3 * Math.abs(e.scale.y), value, e.rotation);
            w.p(100, 'AcDbAttribute', 280, 0, 2, key, 70, 0, 73, 0, 74, 0, 280, 1);
          });
          if (attrs.length) {
            w.record('SEQEND', h);
            w.p(100, 'AcDbEntity', 8, layerNames.get(e.layer) ?? '0');
          }
          return;
        }
      }
      w.meta(e.type === 'wire' ? { id: e.id, wire: true, from: e.from, to: e.to } : { id: e.id });
    };
    const blockStart = (name: string, h: string): void => {
      w.record('BLOCK', h);
      w.p(
        100,
        'AcDbEntity',
        8,
        '0',
        100,
        'AcDbBlockBegin',
        2,
        name,
        70,
        0,
        10,
        0,
        20,
        0,
        30,
        0,
        3,
        name,
        1,
        '',
      );
    };
    const blockEnd = (h: string): void => {
      w.record('ENDBLK', h);
      w.p(100, 'AcDbEntity', 8, '0', 100, 'AcDbBlockEnd');
    };
    for (const [name, h] of [
      ['*Model_Space', model],
      ['*Paper_Space', paper],
    ]) {
      blockStart(name, h);
      blockEnd(h);
    }
    for (const b of d.blocks) {
      const h = blockRecords.get(b.id)!;
      blockStart(blockNames.get(b.id)!, h);
      w.meta({
        id: b.id,
        category: b.category,
        library: b.library,
        group: b.group,
        standard: b.standard,
        ports: b.ports,
        attributes: b.attributes,
      });
      b.entities.forEach((e) => writeEntity(e, h));
      Object.entries(b.attributes).forEach(([key, value], i) => {
        w.record('ATTDEF', h);
        w.p(100, 'AcDbEntity', 8, '0');
        textGeometry({ x: 7, y: 6 - i * 4 }, 3, value, 0);
        w.p(100, 'AcDbAttributeDefinition', 280, 0, 3, key, 2, key, 70, 0, 73, 0, 74, 0, 280, 1);
      });
      blockEnd(h);
    }
    w.p(0, 'ENDSEC', 0, 'SECTION', 2, 'ENTITIES');
    d.entities.forEach((e) => writeEntity(e, model));
    w.p(0, 'ENDSEC', 0, 'SECTION', 2, 'OBJECTS');
    w.record('DICTIONARY', '0', root);
    w.p(
      100,
      'AcDbDictionary',
      281,
      1,
      3,
      'ACAD_GROUP',
      350,
      groupDict,
      3,
      'ACAD_LAYOUT',
      350,
      layoutDict,
      3,
      'ACAD_MLINESTYLE',
      350,
      mlineDict,
      3,
      'ACAD_PLOTSTYLENAME',
      350,
      plotDict,
    );
    w.record('DICTIONARY', root, groupDict);
    w.p(100, 'AcDbDictionary', 281, 1);
    w.record('DICTIONARY', root, layoutDict);
    w.p(
      100,
      'AcDbDictionary',
      281,
      1,
      3,
      'Model',
      350,
      modelLayout,
      3,
      'Layout1',
      350,
      paperLayout,
    );
    w.record('DICTIONARY', root, mlineDict);
    w.p(100, 'AcDbDictionary', 281, 1, 3, 'Standard', 350, stdMline);
    w.record('ACDBDICTIONARYWDFLT', root, plotDict);
    w.p(
      100,
      'AcDbDictionary',
      281,
      1,
      3,
      'Normal',
      350,
      plotPlaceholder,
      100,
      'AcDbDictionaryWithDefault',
      340,
      plotPlaceholder,
    );
    w.record('ACDBPLACEHOLDER', plotDict, plotPlaceholder);
    w.record('MLINESTYLE', mlineDict, stdMline);
    w.p(
      100,
      'AcDbMlineStyle',
      2,
      'Standard',
      70,
      0,
      3,
      '',
      62,
      256,
      51,
      90,
      52,
      90,
      71,
      2,
      49,
      0.5,
      62,
      256,
      6,
      'BYLAYER',
      49,
      -0.5,
      62,
      256,
      6,
      'BYLAYER',
    );
    for (const [lh, name, order, blockH, plotFlags] of [
      [modelLayout, 'Model', 0, model, 1192],
      [paperLayout, 'Layout1', 1, paper, 688],
    ] as const) {
      w.record('LAYOUT', layoutDict, lh);
      w.p(
        100,
        'AcDbPlotSettings',
        1,
        '',
        2,
        'none_device',
        4,
        'ISO_A3_(420.00_x_297.00_MM)',
        6,
        '',
        40,
        7.5,
        41,
        20,
        42,
        7.5,
        43,
        20,
        44,
        297,
        45,
        420,
        46,
        0,
        47,
        0,
        48,
        0,
        49,
        0,
        140,
        0,
        141,
        0,
        142,
        1,
        143,
        1,
        70,
        plotFlags,
        72,
        1,
        73,
        0,
        74,
        5,
        7,
        '',
        75,
        16,
        147,
        1,
        148,
        0,
        149,
        0,
        100,
        'AcDbLayout',
        1,
        name,
        70,
        1,
        71,
        order,
        10,
        0,
        20,
        0,
        11,
        420,
        21,
        297,
        12,
        0,
        22,
        0,
        32,
        0,
        14,
        0,
        24,
        0,
        34,
        0,
        15,
        0,
        25,
        0,
        35,
        0,
        146,
        0,
        13,
        0,
        23,
        0,
        33,
        0,
        16,
        1,
        26,
        0,
        36,
        0,
        17,
        0,
        27,
        1,
        37,
        0,
        76,
        0,
        330,
        blockH,
      );
    }
    w.p(0, 'ENDSEC', 0, 'EOF');
    return w.lines.join('\r\n') + '\r\n';
  }
}
export interface DxfResult {
  drawing: Drawing;
  warnings: string[];
}
export class DxfImporter {
  import(source: string): DxfResult {
    if (source.length > 50_000_000) throw new Error('DXF exceeds the 50 MB limit');
    if (source.startsWith('AutoCAD Binary DXF'))
      throw new Error('Binary DXF is not supported. Save as ASCII DXF.');
    const dwgMatch = source.slice(0, 12).match(/^AC10(\d\d)/);
    if (dwgMatch) {
      const verMap: Record<string, string> = {
        '12': 'R13',
        '14': 'R14',
        '15': '2000',
        '18': '2004',
        '21': '2007',
        '24': '2010',
        '27': '2013',
        '32': '2018+',
      };
      const release = verMap[dwgMatch[1]] ?? `AC10${dwgMatch[1]}`;
      throw new Error(
        `Binary AutoCAD DWG (${release}) detected. Export or save as ASCII DXF (R2010) for direct vector editing.`,
      );
    }
    const rows = source.replace(/^\uFEFF/, '').split(/\r\n|\n|\r/);
    while (rows.length && rows[rows.length - 1] === '') rows.pop();
    if (rows.length % 2) throw new Error('Truncated DXF: incomplete code/value pair');
    const pairs: Pair[] = [];
    for (let i = 0; i < rows.length; i += 2) {
      const code = Number(rows[i].trim());
      if (!Number.isInteger(code) || code < 0 || code > 1071)
        throw new Error(`Invalid DXF code at line ${i + 1}`);
      pairs.push({
        code,
        value: [1, 3, 1000].includes(code) ? rows[i + 1] : rows[i + 1].trim(),
      });
    }
    if (!pairs.some((p) => p.code === 0 && p.value === 'EOF'))
      throw new Error('DXF has no EOF record');
    const sections = new Map<string, RecordDXF[]>();
    let section = '',
      current: RecordDXF | undefined;
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      if (p.code === 0 && p.value === 'SECTION') {
        section = pairs[++i]?.value ?? '';
        sections.set(section, []);
        current = undefined;
      } else if (p.code === 0 && p.value === 'ENDSEC') {
        section = '';
        current = undefined;
      } else if (section) {
        if (p.code === 0) {
          current = { type: p.value, pairs: [] };
          sections.get(section)!.push(current);
        } else if (current) current.pairs.push(p);
      }
    }
    const d = emptyDrawing();
    d.layers = [];
    const warnings: string[] = [],
      unsupported = new Map<string, number>();
    const unitIndex = pairs.findIndex((p) => p.code === 9 && p.value === '$INSUNITS'),
      units = unitIndex >= 0 ? Number(pairs[unitIndex + 1]?.value) : 0;
    const factors: Record<number, number> = {
      0: 1,
      1: 25.4,
      2: 304.8,
      4: 1,
      5: 10,
      6: 1000,
      7: 1e6,
      8: 0.0000254,
      9: 0.0254,
      10: 914.4,
      11: 1e-7,
      12: 1e-6,
      13: 0.001,
      14: 100,
      15: 10000,
      16: 100000,
    };
    if (!(units in factors)) throw new Error(`Unsupported DXF unit $INSUNITS=${units}`);
    const factor = factors[units];
    if (units === 0) warnings.push('DXF has no units: coordinates are interpreted as millimeters.');
    const layer = (name: string): string => {
      let l = d.layers.find((l) => l.name === name);
      if (!l) {
        l = {
          id: uid(),
          name,
          visible: true,
          locked: false,
          color: 7,
          lineType: 'CONTINUOUS',
        };
        d.layers.push(l);
      }
      return l.id;
    };
    for (const r of sections.get('TABLES') ?? [])
      if (r.type === 'LAYER') {
        const id = layer(val(r, 2, '0')),
          l = d.layers.find((l) => l.id === id)!;
        l.color = Math.min(255, Math.max(1, Math.abs(num(r, 62, 7))));
        l.visible = num(r, 62, 7) > 0 && !(num(r, 70) & 1);
        l.locked = !!(num(r, 70) & 4);
        l.lineType = kind(val(r, 6));
      }
    const zero = layer('0');
    const zl = d.layers.find((l) => l.id === zero)!;
    zl.id = '0';
    const blockByName = new Map<string, Block>(),
      bases = new Map<string, Point>();
    for (const r of sections.get('BLOCKS') ?? [])
      if (r.type === 'BLOCK' && !val(r, 2).startsWith('*')) {
        const meta = metadata(r);
        const b: Block = {
          id: typeof meta.id === 'string' ? meta.id : uid(),
          name: val(r, 2),
          category: typeof meta.category === 'string' ? meta.category : 'Imported DXF',
          library: typeof meta.library === 'string' ? meta.library : undefined,
          group: typeof meta.group === 'string' ? meta.group : undefined,
          standard: typeof meta.standard === 'string' ? meta.standard : undefined,
          entities: [],
          ports: Array.isArray(meta.ports) ? (meta.ports as Block['ports']) : [],
          attributes:
            meta.attributes && typeof meta.attributes === 'object'
              ? (meta.attributes as Record<string, string>)
              : {},
        };
        blockByName.set(b.name.toUpperCase(), b);
        bases.set(b.id, point(r));
        d.blocks.push(b);
      }
    const readEntities = (
      records: RecordDXF[],
      output: Entity[],
      base: Point = { x: 0, y: 0 },
    ): void => {
      let lastInsert: Insert | undefined;
      let legacy:
        | {
            points: Point[];
            closed: boolean;
            layer: string;
            id: string;
            bulges: number[];
          }
        | undefined;
      const local = (p: Point): Point => sub(p, base);
      const polySegments = (
        ps: Point[],
        bulges: number[],
        closed: boolean,
        b: { id: string; layer: string; color?: number; lineType?: LineType },
      ): void => {
        if (ps.length < 2) return;
        if (!bulges.some((v) => Math.abs(v) > 1e-10)) {
          output.push({ ...b, type: 'polyline', points: ps, closed });
          return;
        }
        const n = closed ? ps.length : ps.length - 1;
        for (let j = 0; j < n; j++) {
          const a = ps[j],
            p = ps[(j + 1) % ps.length],
            bulge = bulges[j] ?? 0;
          if (Math.abs(bulge) < 1e-10) {
            output.push({ ...b, id: uid(), type: 'line', a, b: p });
            continue;
          }
          const dx = p.x - a.x,
            dy = p.y - a.y,
            center = {
              x: (a.x + p.x) / 2 - (dy * (1 - bulge * bulge)) / (4 * bulge),
              y: (a.y + p.y) / 2 + (dx * (1 - bulge * bulge)) / (4 * bulge),
            },
            start = angle(center, a),
            end = angle(center, p);
          output.push({
            ...b,
            id: uid(),
            type: 'arc',
            center,
            radius: distance(center, a),
            start: bulge > 0 ? start : end,
            end: bulge > 0 ? end : start,
          });
        }
      };
      for (const r of records) {
        const meta = metadata(r),
          b = {
            id: typeof meta.id === 'string' ? meta.id : uid(),
            layer: layer(val(r, 8, '0')),
            color: r.pairs.some((p) => p.code === 62) ? num(r, 62) : undefined,
            lineType: val(r, 6) && !/^by/i.test(val(r, 6)) ? kind(val(r, 6)) : undefined,
          };
        if (
          num(r, 210) !== 0 ||
          num(r, 220) !== 0 ||
          num(r, 230, 1) !== 1 ||
          num(r, 30) !== 0 ||
          num(r, 38) !== 0
        ) {
          unsupported.set('3D/OCS geometry', 1 + (unsupported.get('3D/OCS geometry') ?? 0));
          continue;
        }
        switch (r.type) {
          case 'LINE':
            if (meta.dimension) {
              output.push({
                ...b,
                type: 'dimension',
                kind:
                  typeof meta.kind === 'string'
                    ? (meta.kind as import('../core/model').DimensionKind)
                    : undefined,
                a: local(point(r)),
                b: local(point(r, 11)),
                offset: typeof meta.offset === 'number' ? meta.offset : undefined,
                text: typeof meta.text === 'string' ? meta.text : undefined,
              });
            } else {
              output.push({
                ...b,
                type: 'line',
                a: local(point(r)),
                b: local(point(r, 11)),
              });
            }
            break;
          case 'DIMENSION': {
            const pA = r.pairs.some((p) => p.code === 13) ? point(r, 13) : point(r, 10),
              pB = r.pairs.some((p) => p.code === 14) ? point(r, 14) : point(r, 11),
              txt = val(r, 1);
            output.push({
              ...b,
              type: 'dimension',
              a: local(pA),
              b: local(pB),
              text: txt && txt !== '<>' ? decode(txt) : undefined,
            });
            break;
          }
          case 'CIRCLE':
            output.push({
              ...b,
              type: 'circle',
              center: local(point(r)),
              radius: num(r, 40),
            });
            break;
          case 'ARC':
            output.push({
              ...b,
              type: 'arc',
              center: local(point(r)),
              radius: num(r, 40),
              start: num(r, 50),
              end: num(r, 51),
            });
            break;
          case 'TEXT':
          case 'MTEXT': {
            let content =
              r.type === 'MTEXT'
                ? r.pairs
                    .filter((p) => p.code === 3 || p.code === 1)
                    .map((p) => p.value)
                    .join('')
                : val(r, 1);
            content = decode(content);
            if (r.type === 'MTEXT') content = content.replace(/\\P/g, '\n');
            const lines = content.split('\n');
            lines.forEach((text, i) =>
              output.push({
                ...b,
                id: i ? uid() : b.id,
                type: 'text',
                position: add(local(point(r)), {
                  x: 0,
                  y: -i * num(r, 40, 2.5) * 1.3,
                }),
                text,
                height: num(r, 40, 2.5),
                rotation: num(r, 50),
              }),
            );
            if (r.type === 'MTEXT')
              warnings.push('MTEXT converted to TEXT lines; advanced formatting is not supported.');
            break;
          }
          case 'LWPOLYLINE': {
            const ps: Point[] = [],
              bulges: number[] = [];
            for (const p of r.pairs) {
              if (p.code === 10) {
                ps.push({ x: Number(p.value) - base.x, y: -base.y });
                bulges.push(0);
              } else if (p.code === 20 && ps.length) ps[ps.length - 1].y = Number(p.value) - base.y;
              else if (p.code === 42) bulges[bulges.length - 1] = Number(p.value);
            }
            if (meta.wire && ps.length >= 2)
              output.push({
                ...b,
                type: 'wire',
                points: ps,
                from: meta.from as import('../core/model').Attachment | undefined,
                to: meta.to as import('../core/model').Attachment | undefined,
              });
            else polySegments(ps, bulges, !!(num(r, 70) & 1), b);
            break;
          }
          case 'POLYLINE':
            if (num(r, 70) & (8 | 16 | 64)) {
              unsupported.set('POLYLINE 3D', 1 + (unsupported.get('POLYLINE 3D') ?? 0));
              legacy = undefined;
            } else
              legacy = {
                ...b,
                points: [],
                closed: !!(num(r, 70) & 1),
                bulges: [],
              };
            break;
          case 'VERTEX':
            if (legacy) {
              legacy.points.push(local(point(r)));
              legacy.bulges.push(num(r, 42));
            }
            break;
          case 'SEQEND':
            if (legacy) {
              polySegments(legacy.points, legacy.bulges, legacy.closed, legacy);
              legacy = undefined;
            }
            lastInsert = undefined;
            break;
          case 'INSERT': {
            const block = blockByName.get(val(r, 2).toUpperCase());
            if (!block) {
              warnings.push(`Unresolved block: ${val(r, 2)}`);
              lastInsert = undefined;
              break;
            }
            lastInsert = {
              ...b,
              type: 'insert',
              block: block.id,
              position: local(point(r)),
              rotation: num(r, 50),
              scale: { x: num(r, 41, 1), y: num(r, 42, 1) },
              attributes: { ...block.attributes },
            };
            output.push(lastInsert);
            if (num(r, 70, 1) > 1 || num(r, 71, 1) > 1)
              warnings.push('MINSERT: only the first array instance was imported.');
            break;
          }
          case 'ATTRIB':
            if (lastInsert) {
              const key = val(r, 2);
              if (!['__proto__', 'constructor', 'prototype'].includes(key))
                lastInsert.attributes[key] = decode(val(r, 1));
            }
            break;
          case 'ATTDEF':
            break;
          default:
            unsupported.set(r.type, 1 + (unsupported.get(r.type) ?? 0));
        }
      }
    };
    let active: Block | undefined,
      contents: RecordDXF[] = [];
    for (const r of sections.get('BLOCKS') ?? []) {
      if (r.type === 'BLOCK') {
        active = blockByName.get(val(r, 2).toUpperCase());
        contents = [];
      } else if (r.type === 'ENDBLK') {
        if (active) {
          for (const a of contents.filter((r) => r.type === 'ATTDEF')) {
            const k = val(a, 2);
            if (!['__proto__', 'constructor', 'prototype'].includes(k))
              active.attributes[k] = decode(val(a, 1));
          }
          readEntities(contents, active.entities, bases.get(active.id));
          if (!active.ports.length) {
            const pts = active.entities.flatMap((e) =>
              e.type === 'line'
                ? [e.a, e.b]
                : e.type === 'polyline'
                  ? [e.points[0], e.points[e.points.length - 1]]
                  : [],
            );
            const ends = pts.filter((p) => pts.filter((q) => distance(p, q) < 1e-6).length === 1);
            active.ports = ends.slice(0, 32).map((point, i) => ({
              id: `P${i + 1}`,
              point,
              direction: {
                x: Math.abs(point.x) >= Math.abs(point.y) ? Math.sign(point.x) : 0,
                y: Math.abs(point.y) > Math.abs(point.x) ? Math.sign(point.y) : 0,
              },
            }));
          }
        }
        active = undefined;
      } else contents.push(r);
    }
    readEntities(sections.get('ENTITIES') ?? [], d.entities);
    // Resolve defaults only after every block's ATTDEF has been read, including forward references.
    for (const e of [...d.entities, ...d.blocks.flatMap((b) => b.entities)])
      if (e.type === 'insert')
        e.attributes = {
          ...d.blocks.find((b) => b.id === e.block)?.attributes,
          ...e.attributes,
        };
    if (factor !== 1) {
      const scalePoint = (p: Point): Point => ({
        x: p.x * factor,
        y: p.y * factor,
      });
      for (const e of [...d.entities, ...d.blocks.flatMap((b) => b.entities)])
        switch (e.type) {
          case 'line':
          case 'dimension':
            e.a = scalePoint(e.a);
            e.b = scalePoint(e.b);
            if (e.type === 'dimension' && e.offset !== undefined) e.offset *= factor;
            break;
          case 'polyline':
          case 'wire':
            e.points = e.points.map(scalePoint);
            break;
          case 'arc':
          case 'circle':
            e.center = scalePoint(e.center);
            e.radius *= factor;
            break;
          case 'insert':
            e.position = scalePoint(e.position);
            break;
          case 'text':
            e.position = scalePoint(e.position);
            e.height *= factor;
            break;
        }
      d.blocks.forEach((b) => b.ports.forEach((p) => (p.point = scalePoint(p.point))));
    }
    for (const [name, n] of unsupported)
      warnings.push(`${n} unsupported ${name} entities excluded from conversion.`);
    if (d.entities.some((e) => e.type === 'wire')) updateWires(d);
    return { drawing: validateDrawing(d), warnings: [...new Set(warnings)] };
  }
}
/** Merge without corrupting existing block/layer names or IDs. */
export function mergeLibrary(target: Drawing, source: Drawing): number {
  const layerMap = new Map<string, string>();
  for (const l of source.layers) {
    const existing = target.layers.find((x) => x.name === l.name);
    if (existing) layerMap.set(l.id, existing.id);
    else {
      const c = clone(l);
      c.id = uid();
      layerMap.set(l.id, c.id);
      target.layers.push(c);
    }
  }
  const ids = new Map(source.blocks.map((b) => [b.id, uid()]));
  for (const b of source.blocks) {
    const c = clone(b);
    c.id = ids.get(b.id)!;
    c.entities.forEach((e) => {
      e.id = uid();
      e.layer = layerMap.get(e.layer) ?? '0';
      if (e.type === 'insert') e.block = ids.get(e.block)!;
    });
    target.blocks.push(c);
  }
  return source.blocks.length;
}
