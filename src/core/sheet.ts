import {
  Drawing,
  DrawingPage,
  Entity,
  SheetOrientation,
  SheetSetup,
  SheetSize,
  TitleBlockData,
  clone,
  uid,
} from './model';

/** Standard paper dimensions in millimeters (portrait width x height; landscape swaps them). */
export const SHEET_DIMENSIONS_MM: Record<
  SheetSize,
  { width: number; height: number; label: string }
> = {
  A4: { width: 210, height: 297, label: 'ISO A4 (210 × 297 mm)' },
  A3: { width: 297, height: 420, label: 'ISO A3 (297 × 420 mm)' },
  A2: { width: 420, height: 594, label: 'ISO A2 (420 × 594 mm)' },
  A1: { width: 594, height: 841, label: 'ISO A1 (594 × 841 mm)' },
  A0: { width: 841, height: 1189, label: 'ISO A0 (841 × 1189 mm)' },
  'ANSI-A': { width: 215.9, height: 279.4, label: 'ANSI A (215.9 × 279.4 mm)' },
  'ANSI-B': { width: 279.4, height: 431.8, label: 'ANSI B (279.4 × 431.8 mm)' },
  'ANSI-C': { width: 431.8, height: 558.8, label: 'ANSI C (431.8 × 558.8 mm)' },
  'ANSI-D': { width: 558.8, height: 863.6, label: 'ANSI D (558.8 × 863.6 mm)' },
};

export const DRAWING_SCALES: [string, string][] = [
  ['1:1', '1:1 (Full scale)'],
  ['1:2', '1:2'],
  ['1:5', '1:5'],
  ['1:10', '1:10'],
  ['1:20', '1:20'],
  ['1:50', '1:50'],
  ['1:100', '1:100'],
  ['2:1', '2:1 (Enlarged)'],
  ['5:1', '5:1 (Enlarged)'],
];

/**
 * Parses a drawing scale ratio string such as '1:10' or '2:1'.
 * Returns paper_mm / world_mm ratio (e.g., '1:10' -> 0.1, meaning 10 mm in world is 1 mm on paper).
 */
export function parseScaleRatio(scaleStr = '1:1'): number {
  const m = scaleStr.trim().match(/^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)$/);
  if (!m) return 1;
  const num = Number(m[1]),
    den = Number(m[2]);
  if (!(num > 0 && den > 0 && Number.isFinite(num) && Number.isFinite(den))) return 1;
  return num / den;
}

/**
 * Multiplier to convert paper millimeters into world millimeters so paper borders/text
 * appear at exact physical size when printed at `scaleStr`.
 * For example, at 1:10 scale (ratio 0.1), a 297x210 mm A4 sheet spans 2970x2100 mm in world units.
 */
export function worldScaleMultiplier(scaleStr = '1:1'): number {
  const ratio = parseScaleRatio(scaleStr);
  return ratio > 0 ? 1 / ratio : 1;
}

export function defaultTitleBlock(documentName = 'Drawing'): TitleBlockData {
  const cleanTitle = documentName.replace(/\.(cad\.md|dxf|dwg|md)$/i, '');
  return {
    project: 'Industrial Plant / Electrical System',
    title: cleanTitle || 'Technical Schematic',
    drawingNumber: 'DWG-001',
    revision: 'A',
    scale: '1:1',
    units: 'mm',
    standard: 'ISO 10628 / IEC 60617 / ANSI-ISA-5.1',
    author: 'Engineering',
    date: new Date().toISOString().slice(0, 10),
    company: 'CAD-Lab Engineering',
    sheet: '1 / 1',
    notes: 'All dimensions in millimeters unless otherwise specified.',
  };
}

export function defaultSheetSetup(documentName = 'Drawing'): SheetSetup {
  return {
    enabled: false,
    titleBlockMode: 'virtual',
    titleBlockStandard: 'ISO-7200',
    size: 'A3',
    orientation: 'landscape',
    scale: '1:1',
    autoScaleInserts: false,
    marginMm: 10,
    center: { x: 0, y: 0 },
    titleBlock: defaultTitleBlock(documentName),
  };
}

export function ensureSheetSetup(d: Drawing, documentName?: string): SheetSetup {
  if (!d.sheet) {
    d.sheet = defaultSheetSetup(documentName);
    if (d.scale) {
      d.sheet.scale = d.scale;
      d.sheet.titleBlock.scale = d.scale;
    }
  } else {
    if (!d.sheet.titleBlockMode) {
      d.sheet.titleBlockMode = d.sheet.enabled ? 'real' : 'virtual';
    }
    if (!d.sheet.titleBlockStandard) {
      d.sheet.titleBlockStandard = 'ISO-7200';
    }
  }
  return d.sheet;
}

export function sheetSizeMm(
  size: SheetSize,
  orientation: SheetOrientation,
): { width: number; height: number } {
  const spec = SHEET_DIMENSIONS_MM[size] ?? SHEET_DIMENSIONS_MM.A3;
  return orientation === 'landscape'
    ? { width: Math.max(spec.width, spec.height), height: Math.min(spec.width, spec.height) }
    : { width: Math.min(spec.width, spec.height), height: Math.max(spec.width, spec.height) };
}

/**
 * Generates pure vector entities (lines, polylines, text) representing an engineering drawing
 * border with symmetric margins, optional zone grid, and fixed-proportion title block,
 * centered at `setup.center ?? (0, 0)` in world coordinates according to the active sheet setup and scale.
 */
export function buildSheetEntities(setup: SheetSetup, layer = '0'): Entity[] {
  const mode = setup.titleBlockMode ?? (setup.enabled ? 'real' : 'none');
  if (!setup.enabled && mode !== 'real') return [];
  const paper = sheetSizeMm(setup.size, setup.orientation),
    mult = worldScaleMultiplier(setup.scale),
    W = paper.width * mult,
    H = paper.height * mult,
    halfW = W / 2,
    halfH = H / 2,
    cx = setup.center?.x ?? 0,
    cy = setup.center?.y ?? 0,
    marginMm = Math.max(0, Math.min(100, setup.marginMm ?? 10)),
    margin = marginMm * mult,
    frameMinX = cx - halfW + margin,
    frameMaxX = cx + halfW - margin,
    frameMinY = cy - halfH + margin,
    frameMaxY = cy + halfH - margin;
  let seq = 0;
  const id = () => `sheet-frame-${++seq}`;
  const out: Entity[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, color = 8): void => {
    out.push({
      id: id(),
      type: 'line',
      layer,
      color,
      a: { x: x1, y: y1 },
      b: { x: x2, y: y2 },
    });
  };
  const rect = (x1: number, y1: number, x2: number, y2: number, color = 7): void => {
    out.push({
      id: id(),
      type: 'polyline',
      layer,
      color,
      closed: true,
      points: [
        { x: x1, y: y1 },
        { x: x2, y: y1 },
        { x: x2, y: y2 },
        { x: x1, y: y2 },
      ],
    });
  };
  const txt = (value: string, x: number, y: number, hMm: number, color = 7): void => {
    if (!value) return;
    out.push({
      id: id(),
      type: 'text',
      layer,
      color,
      position: { x, y },
      text: value,
      height: hMm * mult,
      rotation: 0,
    });
  };

  // Outer sheet boundary
  rect(cx - halfW, cy - halfH, cx + halfW, cy + halfH, 8);
  // Inner drawing frame (equal symmetric margins on all 4 sides)
  rect(frameMinX, frameMinY, frameMaxX, frameMaxY, 7);

  if (mode === 'virtual' || setup.titleBlockStandard === 'MINIMAL') {
    if (mode === 'virtual') return out;
  }

  // Alphanumeric grid zones along outer margin (for ISO-7200 and ANSI-Y14)
  if (setup.titleBlockStandard !== 'MINIMAL') {
    const cols = 6,
      rows = 4,
      colW = (frameMaxX - frameMinX) / cols,
      rowH = (frameMaxY - frameMinY) / rows;
    for (let i = 1; i < cols; i++) {
      const x = frameMinX + i * colW;
      line(x, frameMaxY, x, frameMaxY + 5 * mult, 8);
      line(x, frameMinY - 5 * mult, x, frameMinY, 8);
    }
    for (let i = 0; i < cols; i++) {
      const x = frameMinX + (i + 0.5) * colW - 1.2 * mult;
      txt(String(i + 1), x, frameMaxY + 1.5 * mult, 2.5, 8);
      txt(String(i + 1), x, frameMinY - 4 * mult, 2.5, 8);
    }
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let j = 1; j < rows; j++) {
      const y = frameMinY + j * rowH;
      line(frameMinX - 5 * mult, y, frameMinX, y, 8);
      line(frameMaxX, y, frameMaxX + 5 * mult, y, 8);
    }
    for (let j = 0; j < rows; j++) {
      const y = frameMinY + (rows - 1 - j + 0.5) * rowH - 1.2 * mult;
      txt(letters[j] ?? '', frameMinX - 3.8 * mult, y, 2.5, 8);
      txt(letters[j] ?? '', frameMaxX + 1.5 * mult, y, 2.5, 8);
    }
  }

  // Real Standard Title Block in bottom-right corner
  const isMinimal = setup.titleBlockStandard === 'MINIMAL';
  const tbW = Math.min((isMinimal ? 120 : 180) * mult, (frameMaxX - frameMinX) * 0.85),
    tbH = (isMinimal ? 24 : 42) * mult,
    tbMinX = frameMaxX - tbW,
    tbMaxX = frameMaxX,
    tbMinY = frameMinY,
    tbMaxY = frameMinY + tbH;

  rect(tbMinX, tbMinY, tbMaxX, tbMaxY, 7);
  const tb = setup.titleBlock;

  if (isMinimal) {
    const midY = tbMinY + 12 * mult,
      divX = tbMinX + tbW * 0.65;
    line(tbMinX, midY, tbMaxX, midY, 7);
    line(divX, tbMinY, divX, tbMaxY, 7);
    txt(tb.title || 'Untitled Schematic', tbMinX + 2 * mult, midY + 3.5 * mult, 3.0, 7);
    txt(
      `${tb.drawingNumber || 'DWG-001'} · Rev ${tb.revision || 'A'}`,
      divX + 2 * mult,
      midY + 3.5 * mult,
      2.4,
      7,
    );
    txt(
      `${tb.project || '-'} · ${tb.author || '-'}`,
      tbMinX + 2 * mult,
      tbMinY + 3.5 * mult,
      2.2,
      8,
    );
    txt(
      `${setup.scale || '1:1'} (${tb.units || 'mm'})`,
      divX + 2 * mult,
      tbMinY + 3.5 * mult,
      2.2,
      7,
    );
    return out;
  }

  // Horizontal rows inside title block (4 rows: 10mm, 10mm, 12mm, 10mm)
  const r1 = tbMinY + 10 * mult,
    r2 = tbMinY + 20 * mult,
    r3 = tbMinY + 32 * mult;
  line(tbMinX, r1, tbMaxX, r1, 7);
  line(tbMinX, r2, tbMaxX, r2, 7);
  line(tbMinX, r3, tbMaxX, r3, 7);

  // Vertical dividers
  const c1 = tbMinX + tbW * 0.45,
    c2 = tbMinX + tbW * 0.75;
  line(c1, tbMinY, c1, tbMaxY, 7);
  line(c2, tbMinY, c2, r3, 7);

  const stdBadge = setup.titleBlockStandard === 'ANSI-Y14' ? 'ANSI Y14.1' : 'ISO 7200';
  // Row 4 (Top: Company / Project / Standard)
  txt('PROJECT / PLANT', tbMinX + 2 * mult, r3 + 6.8 * mult, 1.6, 8);
  txt(tb.project || '-', tbMinX + 2 * mult, r3 + 2.2 * mult, 2.8, 7);
  txt(`ORGANIZATION / ${stdBadge}`, c1 + 2 * mult, r3 + 6.8 * mult, 1.6, 8);
  txt(
    `${tb.company || 'Engineering'} · ${tb.standard || 'ISO / IEC / ISA'}`,
    c1 + 2 * mult,
    r3 + 2.2 * mult,
    2.4,
    7,
  );

  // Row 3 (Drawing Title / Drawing Number / Rev)
  txt('TITLE', tbMinX + 2 * mult, r2 + 8.5 * mult, 1.6, 8);
  txt(tb.title || 'Untitled Schematic', tbMinX + 2 * mult, r2 + 2.8 * mult, 3.2, 7);
  txt('DRAWING NO.', c1 + 2 * mult, r2 + 8.5 * mult, 1.6, 8);
  txt(tb.drawingNumber || 'DWG-001', c1 + 2 * mult, r2 + 2.8 * mult, 2.8, 7);
  txt('REV', c2 + 2 * mult, r2 + 8.5 * mult, 1.6, 8);
  txt(tb.revision || 'A', c2 + 2 * mult, r2 + 2.8 * mult, 2.8, 7);

  // Row 2 (Author / Date / Scale & Units)
  txt('AUTHOR', tbMinX + 2 * mult, r1 + 6.8 * mult, 1.6, 8);
  txt(tb.author || '-', tbMinX + 2 * mult, r1 + 2.0 * mult, 2.4, 7);
  txt('DATE', c1 + 2 * mult, r1 + 6.8 * mult, 1.6, 8);
  txt(tb.date || '-', c1 + 2 * mult, r1 + 2.0 * mult, 2.4, 7);
  txt('SCALE / UNITS', c2 + 2 * mult, r1 + 6.8 * mult, 1.6, 8);
  txt(
    `${setup.scale || tb.scale || '1:1'} (${tb.units || 'mm'})`,
    c2 + 2 * mult,
    r1 + 2.0 * mult,
    2.4,
    7,
  );

  // Row 1 (Bottom: Notes / Sheet Size / Sheet Number)
  txt('NOTES', tbMinX + 2 * mult, tbMinY + 6.8 * mult, 1.6, 8);
  txt(tb.notes || 'Dimensions in mm', tbMinX + 2 * mult, tbMinY + 2.0 * mult, 2.1, 7);
  txt('FORMAT', c1 + 2 * mult, tbMinY + 6.8 * mult, 1.6, 8);
  txt(
    `${setup.size} ${setup.orientation.toUpperCase()}`,
    c1 + 2 * mult,
    tbMinY + 2.0 * mult,
    2.2,
    7,
  );
  txt('SHEET', c2 + 2 * mult, tbMinY + 6.8 * mult, 1.6, 8);
  txt(tb.sheet || '1 / 1', c2 + 2 * mult, tbMinY + 2.0 * mult, 2.4, 7);

  return out;
}

/**
 * Rescales placed symbol inserts and text heights when the user changes drawing scale
 * and triggers automatic element adaptation.
 */
export function rescaleDrawingElements(
  d: Drawing,
  newScaleStr: string,
  targetIds?: Set<string>,
): void {
  const oldMult = worldScaleMultiplier(d.scale ?? d.sheet?.scale ?? '1:1'),
    newMult = worldScaleMultiplier(newScaleStr),
    factor = oldMult > 0 ? newMult / oldMult : 1;
  d.scale = newScaleStr;
  if (d.sheet) {
    d.sheet.scale = newScaleStr;
    d.sheet.titleBlock.scale = newScaleStr;
  }
  if (Math.abs(factor - 1) < 1e-6) return;
  for (const e of d.entities) {
    if (targetIds && !targetIds.has(e.id)) continue;
    if (e.type === 'insert') {
      e.scale = {
        x: Math.sign(e.scale.x || 1) * newMult,
        y: Math.sign(e.scale.y || 1) * newMult,
      };
    } else if (e.type === 'text') {
      e.height = Math.max(0.5, Number((e.height * factor).toFixed(3)));
    } else if (e.type === 'dimension' && e.offset !== undefined) {
      e.offset = Number((e.offset * factor).toFixed(3));
    }
  }
}

/** Stamps the active sheet border and title block as editable CAD entities onto layer TITLE_BLOCK. */
export function stampSheetToEntities(d: Drawing): number {
  if (!d.sheet) return 0;
  let layer = d.layers.find((l) => l.name === 'TITLE_BLOCK');
  if (!layer) {
    layer = {
      id: 'TITLE_BLOCK',
      name: 'TITLE_BLOCK',
      visible: true,
      locked: false,
      color: 7,
      lineType: 'CONTINUOUS',
    };
    d.layers.push(layer);
  }
  // Remove previous stamped sheet entities on TITLE_BLOCK layer
  const layerId = layer.id;
  d.entities = d.entities.filter((e) => e.layer !== layerId);
  const generated = buildSheetEntities({ ...d.sheet, enabled: true }, layer.id).map((e) => ({
    ...e,
    id: uid(),
  }));
  d.entities.push(...generated);
  return generated.length;
}

const STANDARD_PRINT_SCALES: [number, string][] = [
  [5, '5:1'],
  [2, '2:1'],
  [1, '1:1'],
  [0.5, '1:2'],
  [0.2, '1:5'],
  [0.1, '1:10'],
  [0.05, '1:20'],
  [0.04, '1:25'],
  [0.02, '1:50'],
  [0.01, '1:100'],
  [0.005, '1:200'],
  [0.002, '1:500'],
  [0.001, '1:1000'],
];

/**
 * Computes optimal orientation and scaling factor to fit drawing bounds onto a standard sheet for printing.
 * When `snapToStandard` is true, picks the largest standard engineering scale that fits inside margins.
 */
export function bestPrintFit(
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
  size: SheetSize,
  orientation: SheetOrientation | 'auto' = 'auto',
  marginMm = 12,
  snapToStandard = false,
): {
  orientation: SheetOrientation;
  scaleRatio: number;
  scaleLabel: string;
  paperMm: { width: number; height: number };
} {
  const spanW = Math.max(10, bounds.maxX - bounds.minX);
  const spanH = Math.max(10, bounds.maxY - bounds.minY);
  const candidates: SheetOrientation[] =
    orientation === 'auto' ? ['landscape', 'portrait'] : [orientation];

  let chosenOrient: SheetOrientation = candidates[0];
  let chosenPaper = sheetSizeMm(size, chosenOrient);
  let bestRatio = 0;

  for (const orient of candidates) {
    const paper = sheetSizeMm(size, orient);
    const usableW = Math.max(20, paper.width - marginMm * 2);
    const usableH = Math.max(20, paper.height - marginMm * 2);
    const ratio = Math.min(usableW / spanW, usableH / spanH);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      chosenOrient = orient;
      chosenPaper = paper;
    }
  }

  let scaleRatio = bestRatio;
  let scaleLabel =
    scaleRatio >= 1
      ? `${Number(scaleRatio.toFixed(2))}:1`
      : `1:${Number(Math.max(1, 1 / scaleRatio).toFixed(2))}`;
  if (snapToStandard) {
    const match =
      STANDARD_PRINT_SCALES.find(([r]) => r <= bestRatio + 1e-6) ??
      STANDARD_PRINT_SCALES[STANDARD_PRINT_SCALES.length - 1];
    scaleRatio = match[0];
    scaleLabel = match[1];
  }
  return { orientation: chosenOrient, scaleRatio, scaleLabel, paperMm: chosenPaper };
}

/**
 * Fits and centers the sheet frame & fixed-proportion title block around the drawing's real
 * world coordinates WITHOUT altering any entity geometry coordinates in millimeters (Mode A).
 */
export function fitSheetToDrawing(
  d: Drawing,
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
  options: {
    size?: SheetSize;
    orientation?: SheetOrientation | 'auto';
    marginMm?: number;
    snapToStandard?: boolean;
  } = {},
): { orientation: SheetOrientation; scaleRatio: number; scaleLabel: string } {
  const sh = ensureSheetSetup(d);
  const size = options.size ?? sh.size;
  const marginMm = options.marginMm ?? sh.marginMm ?? 10;
  // Reserve headroom when title block sits at the bottom so schematic geometry remains clear above it
  const fit = bestPrintFit(
    bounds,
    size,
    options.orientation ?? sh.orientation,
    marginMm,
    options.snapToStandard ?? false,
  );
  sh.size = size;
  sh.orientation = fit.orientation;
  sh.marginMm = marginMm;
  sh.center = {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  };
  sh.scale = fit.scaleLabel;
  sh.titleBlock.scale = fit.scaleLabel;
  d.scale = fit.scaleLabel;
  if (d.entities.some((e) => e.layer === 'TITLE_BLOCK')) stampSheetToEntities(d);
  return {
    orientation: fit.orientation,
    scaleRatio: fit.scaleRatio,
    scaleLabel: fit.scaleLabel,
  };
}

/** Ensures `d.pages` exists with at least one page synchronized with active drawing state. */
export function ensurePages(d: Drawing, documentName = 'Drawing'): DrawingPage[] {
  if (!d.pages || d.pages.length === 0) {
    const firstId = d.activePageId || uid();
    d.pages = [
      {
        id: firstId,
        name: 'Page 1',
        entities: clone(d.entities),
        scale: d.scale ?? d.sheet?.scale ?? '1:1',
        sheet: d.sheet ? clone(d.sheet) : defaultSheetSetup(documentName),
      },
    ];
    d.activePageId = firstId;
  }
  if (!d.activePageId || !d.pages.some((p) => p.id === d.activePageId)) {
    d.activePageId = d.pages[0].id;
  }
  syncActivePage(d);
  return d.pages;
}

/** Persists top-level active page (`entities`, `scale`, `sheet`) back into `d.pages` and refreshes sheet numbering. */
export function syncActivePage(d: Drawing): void {
  if (!d.pages || !d.pages.length) return;
  const idx = Math.max(
    0,
    d.pages.findIndex((p) => p.id === d.activePageId),
  );
  const page = d.pages[idx];
  d.activePageId = page.id;
  page.entities = clone(d.entities);
  page.scale = d.scale ?? d.sheet?.scale ?? page.scale ?? '1:1';
  if (d.sheet) page.sheet = clone(d.sheet);
  if (d.sheet?.titleBlock) {
    d.sheet.titleBlock.sheet = `${idx + 1} / ${d.pages.length}`;
    if (page.sheet) page.sheet.titleBlock.sheet = d.sheet.titleBlock.sheet;
  }
}

/** Saves current page and activates `targetPageId`, loading its entities, scale, and sheet setup. */
export function switchDrawingPage(d: Drawing, targetPageId: string): boolean {
  ensurePages(d);
  syncActivePage(d);
  const targetIdx = d.pages!.findIndex((p) => p.id === targetPageId);
  if (targetIdx < 0) return false;
  const target = d.pages![targetIdx];
  d.activePageId = target.id;
  d.entities = clone(target.entities);
  d.scale = target.scale ?? target.sheet?.scale ?? '1:1';
  if (target.sheet) {
    d.sheet = clone(target.sheet);
    d.sheet.titleBlock.sheet = `${targetIdx + 1} / ${d.pages!.length}`;
  } else if (d.sheet) {
    d.sheet.scale = d.scale;
    d.sheet.titleBlock.scale = d.scale;
    d.sheet.titleBlock.sheet = `${targetIdx + 1} / ${d.pages!.length}`;
  }
  return true;
}

/** Adds a new blank or duplicated schematic page and switches to it. */
export function addDrawingPage(d: Drawing, name?: string, duplicateCurrent = false): DrawingPage {
  const pages = ensurePages(d);
  syncActivePage(d);
  const activeIdx = pages.findIndex((p) => p.id === d.activePageId);
  const src = pages[Math.max(0, activeIdx)];
  const pageName = name?.trim() || `Page ${pages.length + 1}`;
  const created: DrawingPage = {
    id: uid(),
    name: pageName,
    entities: duplicateCurrent ? clone(src.entities).map((e) => ({ ...e, id: uid() })) : [],
    scale: src.scale ?? d.scale ?? '1:1',
    sheet: src.sheet ? clone(src.sheet) : d.sheet ? clone(d.sheet) : defaultSheetSetup(pageName),
  };
  pages.push(created);
  switchDrawingPage(d, created.id);
  return created;
}

export function renameDrawingPage(d: Drawing, pageId: string, newName: string): boolean {
  const pages = ensurePages(d);
  const page = pages.find((p) => p.id === pageId);
  const trimmed = newName.trim();
  if (!page || !trimmed) return false;
  page.name = trimmed;
  return true;
}

export function deleteDrawingPage(d: Drawing, pageId: string): boolean {
  const pages = ensurePages(d);
  if (pages.length <= 1) return false;
  syncActivePage(d);
  const idx = pages.findIndex((p) => p.id === pageId);
  if (idx < 0) return false;
  pages.splice(idx, 1);
  if (d.activePageId === pageId) {
    const next = pages[Math.min(idx, pages.length - 1)];
    d.activePageId = next.id;
    d.entities = clone(next.entities);
    d.scale = next.scale ?? next.sheet?.scale ?? '1:1';
    if (next.sheet) d.sheet = clone(next.sheet);
  }
  syncActivePage(d);
  return true;
}

export function moveDrawingPage(d: Drawing, pageId: string, delta: -1 | 1): boolean {
  const pages = ensurePages(d);
  syncActivePage(d);
  const idx = pages.findIndex((p) => p.id === pageId);
  const nextIdx = idx + delta;
  if (idx < 0 || nextIdx < 0 || nextIdx >= pages.length) return false;
  const [moved] = pages.splice(idx, 1);
  pages.splice(nextIdx, 0, moved);
  syncActivePage(d);
  return true;
}
