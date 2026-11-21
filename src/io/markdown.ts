import { englishBuiltinLabel } from '../core/legacy-labels';
import { Drawing, validateDrawing } from '../core/model';

export interface MarkdownDocument {
  drawing: Drawing;
  source: string;
  frontmatter?: Record<string, unknown>;
}

export interface BomItem {
  index: number;
  id: string;
  tag: string;
  component: string;
  brand: string;
  model: string;
  library: string;
  standard: string;
  category: string;
  value: string;
  description: string;
  customAttributes: string;
  layer: string;
  notes: string;
}

const fence = /^```cad-data[^\S\r\n]*\r?\n([\s\S]*?)^```[^\S\r\n]*(?:\r?\n|$)/m;
const bomSectionRegex = /<!--\s*cad-bom:start\s*-->[\s\S]*?<!--\s*cad-bom:end\s*-->\r?\n?/m;

/**
 * Reads a `.cad.md` note.
 * Unidirectional by design: only the `cad-data` JSON block defines drawing geometry.
 * Manual edits to the Markdown BOM table never alter or create graphical entities.
 */
export function readMarkdown(
  source: string,
  yaml?: { parse: (s: string) => unknown },
): MarkdownDocument {
  const match = source.match(fence);
  if (!match)
    throw new Error('No cad-data code block found. The original file has not been changed.');
  let frontmatter: Record<string, unknown> | undefined;
  const fmMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (fmMatch && yaml) {
    try {
      const parsed = yaml.parse(fmMatch[1]);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        frontmatter = parsed as Record<string, unknown>;
      }
    } catch {
      // Ignore malformed YAML here; writeMarkdown validates separately
    }
  }
  return { drawing: validateDrawing(JSON.parse(match[1])), source, frontmatter };
}

function allDrawingEntities(d: Drawing) {
  if (!d.pages || d.pages.length <= 1) return d.entities;
  return d.pages.flatMap((p) => (p.id === d.activePageId ? d.entities : p.entities));
}

export function componentTags(d: Drawing): string[] {
  return [
    ...new Set(
      allDrawingEntities(d).flatMap((e) =>
        e.type === 'insert' && e.attributes.TAG ? [e.attributes.TAG] : [],
      ),
    ),
  ].sort();
}

const RESERVED_BOM_KEYS = new Set([
  'TAG',
  'BRAND',
  'MARCA',
  'MANUFACTURER',
  'MODEL',
  'MODELLO',
  'VALUE',
  'VALORE',
  'DESCRIPTION',
  'DESCRIZIONE',
  'NOTES',
  'NOTE',
]);

/** Extracts the structured Bill of Materials (BOM) inventory from placed graphical components. */
export function extractBom(d: Drawing): BomItem[] {
  const blockMap = new Map(d.blocks.map((b) => [b.id, b]));
  const layerMap = new Map(d.layers.map((l) => [l.id, l.name]));
  const inserts = allDrawingEntities(d).filter(
    (e): e is Extract<typeof e, { type: 'insert' }> => e.type === 'insert',
  );

  const sorted = [...inserts].sort((a, b) => {
    const tagA = a.attributes.TAG ?? '',
      tagB = b.attributes.TAG ?? '';
    return (
      tagA.localeCompare(tagB, undefined, { numeric: true }) ||
      a.block.localeCompare(b.block) ||
      a.id.localeCompare(b.id)
    );
  });

  return sorted.map((ins, idx) => {
    const block = blockMap.get(ins.block);
    const rawName = block?.name ?? ins.block;
    const component = englishBuiltinLabel(rawName);
    const library = block?.library ?? 'Custom';
    const standard = block?.standard ?? (library === 'P&ID' ? 'ANSI/ISA-5.1' : 'IEC 60617');
    const category = block?.group ?? block?.category ?? 'General';
    const brand = ins.attributes.BRAND || ins.attributes.MARCA || ins.attributes.MANUFACTURER || '';
    const model = ins.attributes.MODEL || ins.attributes.MODELLO || '';
    const value = ins.attributes.VALUE || ins.attributes.VALORE || '';
    const description = ins.attributes.DESCRIPTION || ins.attributes.DESCRIZIONE || '';
    const notes = ins.attributes.NOTES || ins.attributes.NOTE || '';
    const customPairs = Object.entries(ins.attributes)
      .filter(([k, v]) => !RESERVED_BOM_KEYS.has(k) && v)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
    return {
      index: idx + 1,
      id: ins.id,
      tag: ins.attributes.TAG || '-',
      component,
      brand: brand || '-',
      model: model || '-',
      library,
      standard,
      category,
      value: value || '-',
      description: description || '-',
      customAttributes: customPairs || '-',
      layer: layerMap.get(ins.layer) ?? ins.layer,
      notes: notes || '-',
    };
  });
}

const cleanCell = (val: string): string =>
  val
    .replace(/[\r\n]+/g, ' ')
    .replace(/\|/g, '\\|')
    .replace(/`/g, "'")
    .trim() || '-';

/** Formats the unidirectional Markdown Bill of Materials (BOM) section. */
export function formatBomMarkdown(d: Drawing): string {
  const rows = extractBom(d);
  const lines: string[] = [
    '<!-- cad-bom:start -->',
    '## Bill of Materials (BOM)',
    '',
    '> Auto-generated unidirectionally from the CAD schematic. Manual edits to this table do not modify the drawing.',
    '',
    '| # | Tag | Component / Symbol | Brand | Model | Standard | Category | Value / Rating | Description | Attributes | Layer | Notes |',
    '| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |',
  ];
  if (rows.length === 0) {
    lines.push('| - | - | *No components placed* | - | - | - | - | - | - | - | - | - |');
  } else {
    for (const r of rows) {
      lines.push(
        `| ${r.index} | ${cleanCell(r.tag)} | ${cleanCell(r.component)} | ${cleanCell(r.brand)} | ${cleanCell(r.model)} | ${cleanCell(r.standard)} | ${cleanCell(r.category)} | ${cleanCell(r.value)} | ${cleanCell(r.description)} | ${cleanCell(r.customAttributes)} | ${cleanCell(r.layer)} | ${cleanCell(r.notes)} |`,
      );
    }
  }
  lines.push('<!-- cad-bom:end -->');
  return lines.join('\n') + '\n';
}

export interface WriteMarkdownOptions {
  /** Explicitly opt in to writing optional title block metadata into YAML frontmatter (never pollutes with tags/scale/units). */
  includePresetProperties?: boolean;
  /** Replaces YAML frontmatter properties directly from an interactive YAML editor. */
  frontmatterOverride?: Record<string, unknown>;
}

/**
 * Preserve user YAML and prose; keeps scale, units and component tags out of YAML frontmatter
 * (tags belong inside the CAD drawing & BOM; scale/units remain optional user-controlled fields).
 */
export function writeMarkdown(
  d: Drawing,
  source = '',
  yaml?: { parse: (s: string) => unknown; stringify: (v: unknown) => string },
  options: WriteMarkdownOptions = {},
): string {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  let header: Record<string, unknown> = {};
  if (options.frontmatterOverride) {
    header = { ...options.frontmatterOverride };
  } else if (match && yaml) {
    const value = yaml.parse(match[1]);
    if (value && typeof value === 'object' && !Array.isArray(value))
      header = value as Record<string, unknown>;
    else if (value !== null && value !== undefined) throw new Error('Invalid YAML frontmatter');
  }
  if (options.includePresetProperties) {
    const sheetMeta: Record<string, unknown> = {};
    if (d.sheet) {
      sheetMeta['cad-sheet'] = `${d.sheet.size} ${d.sheet.orientation}`;
      sheetMeta['cad-titleblock-mode'] =
        d.sheet.titleBlockMode ?? (d.sheet.enabled ? 'real' : 'virtual');
      const tb = d.sheet.titleBlock;
      if (tb.project) sheetMeta['cad-project'] = tb.project;
      if (tb.title) sheetMeta['cad-title'] = tb.title;
      if (tb.drawingNumber) sheetMeta['cad-drawing-no'] = tb.drawingNumber;
      if (tb.revision) sheetMeta['cad-revision'] = tb.revision;
      if (tb.author) sheetMeta['cad-author'] = tb.author;
      if (tb.date) sheetMeta['cad-date'] = tb.date;
    }
    header = {
      ...header,
      'cad-lab': true,
      ...sheetMeta,
    };
  } else {
    header = {
      ...header,
      'cad-lab': true,
    };
  }
  const fm = yaml
    ? yaml.stringify(header).trimEnd()
    : Object.entries(header)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n');
  let body = match ? source.slice(match[0].length) : source;
  const bomBlock = formatBomMarkdown(d);
  // JSON strings may legally contain backticks; escape them to keep the Markdown fence intact.
  const json = JSON.stringify(d, null, 2).replace(/`/g, '\\u0060');
  const dataBlock = '```cad-data\n' + json + '\n```\n';

  if (bomSectionRegex.test(body)) {
    body = body.replace(bomSectionRegex, () => bomBlock);
  } else if (fence.test(body)) {
    body = body.replace(fence, () => `${bomBlock}\n${dataBlock}`);
    return `---\n${fm}\n---\n${body.replace(/^\n+/, '\n')}`;
  } else {
    body = `${body.trimEnd()}\n\n${bomBlock}\n${dataBlock}`;
    return `---\n${fm}\n---\n${body.replace(/^\n+/, '\n')}`;
  }

  body = fence.test(body)
    ? body.replace(fence, () => dataBlock)
    : `${body.trimEnd()}\n\n${dataBlock}`;
  return `---\n${fm}\n---\n${body.replace(/^\n+/, '\n')}`;
}
