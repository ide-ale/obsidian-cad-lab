/** Patterns are real millimetres. Positive=dash, negative=gap, zero=dot (DXF). */
export const LINE_TYPES = {
  CONTINUOUS: { label: 'Continuous', pattern: [] },
  DASHED: { label: 'Dashed', pattern: [6, -3] },
  DOTTED: { label: 'Dotted', pattern: [0, -2] },
  CENTER: { label: 'Center / dash-dot', pattern: [8, -2, 0, -2] },
  HIDDEN: { label: 'Hidden / short dash', pattern: [3, -1.5] },
  PHANTOM: { label: 'Phantom / dash-dot-dot', pattern: [10, -2, 0, -2, 0, -2] },
  BORDER: { label: 'Border / double dash-dot', pattern: [10, -2, 10, -2, 0, -2] },
  ACAD_ISO02W100: { label: 'ISO dashed', pattern: [12, -3] },
  ACAD_ISO04W100: { label: 'ISO long dash-dot', pattern: [24, -3, 0, -3] },
  ACAD_ISO05W100: { label: 'ISO long dash-dot-dot', pattern: [24, -3, 0, -3, 0, -3] },
} satisfies Record<string, { label: string; pattern: number[] }>;
export type LineType = keyof typeof LINE_TYPES;
export const lineTypeChoices = (): [string, string][] =>
  Object.entries(LINE_TYPES).map(([id, v]) => [id, v.label]);
export const dashPattern = (type: LineType, customPattern?: number[]): number[] =>
  (customPattern && customPattern.length ? customPattern : LINE_TYPES[type].pattern).map((v) =>
    Math.abs(v),
  );
export function customDashPattern(type: LineType, dashMm: number, gapMm: number): number[] {
  const base = LINE_TYPES[type].pattern;
  if (!base.length) return [Math.max(0.2, dashMm), -Math.max(0.2, gapMm)];
  return base.map((v) => (v < 0 ? -Math.max(0.2, gapMm) : v === 0 ? 0 : Math.max(0.2, dashMm)));
}
export interface LineDisciplinePreset {
  id: string;
  discipline: 'piping' | 'single-line';
  label: string;
  lineType: LineType;
  pattern?: number[];
  defaultSpec: string;
  defaultTagPrefix: string;
}

export const PIPING_LINE_PRESETS: LineDisciplinePreset[] = [
  {
    id: 'pipe-process',
    discipline: 'piping',
    label: 'Primary Process Line',
    lineType: 'CONTINUOUS',
    defaultSpec: 'DN100 CS-A106',
    defaultTagPrefix: 'P-',
  },
  {
    id: 'pipe-secondary',
    discipline: 'piping',
    label: 'Secondary / Utility Line',
    lineType: 'ACAD_ISO02W100',
    pattern: [8, -2.5],
    defaultSpec: 'DN50 SS316',
    defaultTagPrefix: 'U-',
  },
  {
    id: 'pipe-traced',
    discipline: 'piping',
    label: 'Insulated / Heat-Traced Line',
    lineType: 'CENTER',
    pattern: [9, -2, 0, -2],
    defaultSpec: 'DN80 + TRACE',
    defaultTagPrefix: 'HT-',
  },
  {
    id: 'pipe-jacket',
    discipline: 'piping',
    label: 'Jacketed / Future Pipe',
    lineType: 'DASHED',
    pattern: [5, -3],
    defaultSpec: 'DN80 JACKET',
    defaultTagPrefix: 'JK-',
  },
  {
    id: 'pipe-pneumatic',
    discipline: 'piping',
    label: 'ISA Pneumatic Signal ( // )',
    lineType: 'HIDDEN',
    pattern: [3, -1.5],
    defaultSpec: 'INST AIR 6 bar',
    defaultTagPrefix: 'PN-',
  },
  {
    id: 'pipe-electric',
    discipline: 'piping',
    label: 'ISA Electrical / DCS Signal',
    lineType: 'DOTTED',
    pattern: [0, -2.2],
    defaultSpec: '4-20 mA / 24VDC',
    defaultTagPrefix: 'EL-',
  },
  {
    id: 'pipe-hydraulic',
    discipline: 'piping',
    label: 'Hydraulic Signal Line',
    lineType: 'PHANTOM',
    pattern: [10, -2, 0, -2, 0, -2],
    defaultSpec: 'HYD 160 bar',
    defaultTagPrefix: 'HY-',
  },
];

export const SINGLE_LINE_PRESETS: LineDisciplinePreset[] = [
  {
    id: 'sl-mv-feeder',
    discipline: 'single-line',
    label: 'MV Feeder / Bus (20 kV)',
    lineType: 'CONTINUOUS',
    defaultSpec: '3x1x185 mm² XLPE 20kV',
    defaultTagPrefix: 'MV-',
  },
  {
    id: 'sl-lv-feeder',
    discipline: 'single-line',
    label: 'LV Power Feeder (400 V)',
    lineType: 'CONTINUOUS',
    defaultSpec: '4G50 mm² FG16 400V',
    defaultTagPrefix: 'LV-',
  },
  {
    id: 'sl-emergency',
    discipline: 'single-line',
    label: 'Emergency / UPS Circuit',
    lineType: 'DASHED',
    pattern: [6, -2.5],
    defaultSpec: 'FTG18 400V UPS',
    defaultTagPrefix: 'EM-',
  },
  {
    id: 'sl-control',
    discipline: 'single-line',
    label: 'Protection & Control Signal',
    lineType: 'DOTTED',
    pattern: [0, -2.2],
    defaultSpec: '4x2.5 mm² 110VDC',
    defaultTagPrefix: 'CT-',
  },
  {
    id: 'sl-earth',
    discipline: 'single-line',
    label: 'PE / Protective Earthing',
    lineType: 'CENTER',
    pattern: [8, -2, 0, -2],
    defaultSpec: 'Cu 50 mm² PE',
    defaultTagPrefix: 'PE-',
  },
];

export function importedLineType(name: string): LineType {
  const key = name.toUpperCase();
  if (key in LINE_TYPES) return key as LineType;
  if (/phantom/.test(name.toLowerCase())) return 'PHANTOM';
  if (/center|dashdot/i.test(name)) return 'CENTER';
  if (/dot/i.test(name)) return 'DOTTED';
  if (/hidden/i.test(name)) return 'HIDDEN';
  return /dash/i.test(name) ? 'DASHED' : 'CONTINUOUS';
}
