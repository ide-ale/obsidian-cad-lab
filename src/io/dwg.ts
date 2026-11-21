export interface DwgInfo {
  isBinary: boolean;
  versionCode: string;
  release: string;
  sectionCount?: number;
  previewMime?: 'image/bmp' | 'image/png';
  previewDataUrl?: string;
}

const DWG_RELEASES: Record<string, string> = {
  AC1006: 'AutoCAD R10',
  AC1009: 'AutoCAD R11/R12',
  AC1012: 'AutoCAD R13',
  AC1014: 'AutoCAD R14',
  AC1015: 'AutoCAD 2000 / 2000i / 2002',
  AC1018: 'AutoCAD 2004 / 2005 / 2006',
  AC1021: 'AutoCAD 2007 / 2008 / 2009',
  AC1024: 'AutoCAD 2010 / 2011 / 2012',
  AC1027: 'AutoCAD 2013 / 2014 / 2015 / 2016 / 2017',
  AC1032: 'AutoCAD 2018 / 2021 / 2024+',
};

// Preview Image Sentinel present at offset pointed to by uint32 LE at 0x0D in DWG R13..2018+
const PREVIEW_START_SENTINEL = [
  0x1f, 0x25, 0x6d, 0x07, 0xd4, 0x36, 0x28, 0x28, 0x9d, 0x57, 0xca, 0x3f, 0x9d, 0x44, 0x10, 0x2b,
];

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Builds a valid 14-byte BITMAPFILEHEADER around an embedded DIB bitmap payload. */
function wrapDibAsBmp(dib: Uint8Array): Uint8Array | undefined {
  if (dib.length < 40) return undefined;
  const view = new DataView(dib.buffer, dib.byteOffset, dib.byteLength);
  const headerSize = view.getUint32(0, true);
  if (headerSize < 40 || headerSize > dib.length) return undefined;
  const bpp = view.getUint16(14, true);
  const colorsUsed = view.getUint32(32, true);
  const paletteEntries = bpp <= 8 ? (colorsUsed > 0 ? colorsUsed : 1 << bpp) : 0;
  const pixelOffset = 14 + headerSize + paletteEntries * 4;
  if (pixelOffset >= 14 + dib.length) return undefined;

  const bmp = new Uint8Array(14 + dib.length);
  const bmpView = new DataView(bmp.buffer);
  bmp[0] = 0x42; // 'B'
  bmp[1] = 0x4d; // 'M'
  bmpView.setUint32(2, bmp.length, true);
  bmpView.setUint32(10, pixelOffset, true);
  bmp.set(dib, 14);
  return bmp;
}

/**
 * Inspects a raw .dwg buffer: determines whether it is actually an ASCII DXF stream
 * or a binary AutoCAD DWG container, and extracts release metadata + embedded preview image.
 */
export function inspectDwgBinary(bytes: Uint8Array): DwgInfo {
  const head = Array.from(bytes.subarray(0, 12))
    .map((c) => String.fromCharCode(c))
    .join('');
  const verMatch = head.match(/^(AC10\d\d)/);
  if (!verMatch) {
    return {
      isBinary: false,
      versionCode: 'ASCII',
      release: 'ASCII DXF / Text stream',
    };
  }
  const versionCode = verMatch[1];
  const release = DWG_RELEASES[versionCode] ?? versionCode;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let sectionCount: number | undefined;
  if (bytes.length >= 0x19 && ['AC1012', 'AC1014', 'AC1015'].includes(versionCode)) {
    const sc = view.getUint32(0x15, true);
    if (sc > 0 && sc <= 16) sectionCount = sc;
  }

  let previewMime: DwgInfo['previewMime'];
  let previewDataUrl: string | undefined;

  if (bytes.length >= 0x30) {
    const imgSeeker = view.getUint32(0x0d, true);
    if (
      imgSeeker > 0x20 &&
      imgSeeker + 32 < bytes.length &&
      PREVIEW_START_SENTINEL.every((b, idx) => bytes[imgSeeker + idx] === b)
    ) {
      let cursor = imgSeeker + 16;
      const totalSize = view.getUint32(cursor, true);
      cursor += 4;
      const numImages = bytes[cursor++];
      if (totalSize > 0 && cursor + numImages * 9 <= bytes.length) {
        for (let i = 0; i < numImages; i++) {
          const code = bytes[cursor];
          const start = view.getUint32(cursor + 1, true);
          const size = view.getUint32(cursor + 5, true);
          cursor += 9;
          if (size > 16 && start + size <= bytes.length) {
            const payload = bytes.subarray(start, start + size);
            if (code === 2) {
              const bmp = wrapDibAsBmp(payload);
              if (bmp) {
                previewMime = 'image/bmp';
                previewDataUrl = `data:image/bmp;base64,${bytesToBase64(bmp)}`;
                break;
              }
            } else if (code === 6 && payload[0] === 0x89 && payload[1] === 0x50) {
              previewMime = 'image/png';
              previewDataUrl = `data:image/png;base64,${bytesToBase64(payload)}`;
              break;
            }
          }
        }
      }
    }
  }

  return {
    isBinary: true,
    versionCode,
    release,
    sectionCount,
    previewMime,
    previewDataUrl,
  };
}

/** Decodes an ArrayBuffer as ASCII DXF text if it does not begin with a binary DWG header. */
export function decodeDwgOrDxfText(bytes: Uint8Array): { text?: string; dwg?: DwgInfo } {
  const info = inspectDwgBinary(bytes);
  if (info.isBinary) return { dwg: info };
  return { text: new TextDecoder('utf-8').decode(bytes) };
}
