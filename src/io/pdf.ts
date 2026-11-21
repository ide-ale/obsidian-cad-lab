import { dashPattern } from '../core/linetypes';
import { Drawing, Point, SheetOrientation, SheetSize, clone, validateDrawing } from '../core/model';
import {
  bestPrintFit,
  buildSheetEntities,
  defaultSheetSetup,
  parseScaleRatio,
  sheetSizeMm,
  syncActivePage,
} from '../core/sheet';
import {
  arrowMarkerShape,
  computeLineArrowMarkers,
  computeLineJumps,
  drawingBounds,
  flatten,
  lineAnnotationPlacement,
  normAngle,
  polar,
  sampleLineJumpArc,
  transform,
} from '../core/geometry';

const MM_TO_PT = 72 / 25.4;

function aciRgbPrint(index: number): [number, number, number] {
  // On white technical paper, index 7 (default foreground) prints as dark technical ink.
  if (index === 7 || index === 0 || index === 256) return [0.09, 0.14, 0.19];
  const table: Record<number, [number, number, number]> = {
    1: [0.82, 0.12, 0.12], // Red
    2: [0.68, 0.52, 0.0], // Yellow/Ochre for print legibility
    3: [0.08, 0.56, 0.24], // Green
    4: [0.0, 0.52, 0.65], // Cyan
    5: [0.16, 0.36, 0.78], // Blue
    6: [0.65, 0.18, 0.72], // Magenta
    8: [0.45, 0.48, 0.52], // Dark Gray
    9: [0.62, 0.65, 0.68], // Light Gray
  };
  return table[index] ?? [0.09, 0.14, 0.19];
}

function pdfEscapeText(text: string): string {
  // Convert basic Latin/technical symbols to WinAnsi-compatible PDF string literal
  const normalized = text
    .replace(/Δ/g, 'Delta ')
    .replace(/Ø/g, '\xd8')
    .replace(/–/g, '-')
    .replace(/—/g, '-')
    .replace(/·/g, '\xb7')
    .replace(/°/g, '\xb0');
  let out = '';
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    const ch = normalized[i];
    if (ch === '\\' || ch === '(' || ch === ')') out += '\\' + ch;
    else if (code >= 32 && code <= 126) out += ch;
    else if (code >= 160 && code <= 255) out += '\\' + code.toString(8).padStart(3, '0');
    else out += '?';
  }
  return out;
}

const fmt = (n: number): string => Number(n.toFixed(3)).toString();

export interface PdfExportOptions {
  /** Force true scale according to drawing.sheet.scale even if sheet border is hidden. */
  trueScale?: boolean;
  /** Target standard sheet size override for print output (A4-A0, ANSI-A-D). */
  paperSize?: SheetSize;
  /** Target orientation or 'auto' for best fit. */
  orientation?: SheetOrientation | 'auto';
  /** Automatically rescale entire drawing/sheet to fit inside `paperSize` margins for print. */
  fitToPage?: boolean;
  /** When `fitToPage` is true, snap ratio to closest standard engineering scale (1:1, 1:2, 1:5...). */
  snapToStandardScale?: boolean;
  /** Printable margin in millimeters when auto-fitting (default 12 mm). */
  marginMm?: number;
  /** Export all pages of a multi-page drawing as sequential PDF pages (default true). */
  allPages?: boolean;
  /** Optional custom drawing scale ratio string (e.g. '1:2') when `fitToPage` is false. */
  customScale?: string;
  /** Optional title for PDF metadata. */
  title?: string;
}

export class PdfExporter {
  /** Exports the CAD drawing as a standards-compliant Vector PDF 1.4 binary (Uint8Array). */
  exportBytes(drawing: Drawing, options: PdfExportOptions = {}): Uint8Array {
    const str = this.exportString(drawing, options);
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i) & 0xff;
    return bytes;
  }

  private renderPageStream(
    pageDrawing: Drawing,
    options: PdfExportOptions,
  ): { pageW: number; pageH: number; contentStream: string } {
    const setup = pageDrawing.sheet ? clone(pageDrawing.sheet) : defaultSheetSetup(options.title);
    const hasRealSheet = !!setup.enabled || setup.titleBlockMode === 'real';
    const contentEntities = pageDrawing.entities.filter(
      (e) => e.layer !== 'TITLE_BLOCK' && !e.id.startsWith('sheet-frame-'),
    );
    const contentDrawing: Drawing = {
      ...pageDrawing,
      entities: contentEntities.length ? contentEntities : pageDrawing.entities,
    };
    const bContent = drawingBounds(contentDrawing);
    const targetSize = options.paperSize ?? setup.size;
    const targetOrientOpt = options.orientation ?? setup.orientation;
    const margin = options.marginMm ?? setup.marginMm ?? 10;

    let paperMm: { width: number; height: number };
    let scaleRatio: number;
    let centerWorldX: number;
    let centerWorldY: number;
    let sheetEntities = hasRealSheet ? buildSheetEntities(setup) : [];

    if (options.fitToPage) {
      const fit = bestPrintFit(
        bContent,
        targetSize,
        targetOrientOpt,
        margin,
        !!options.snapToStandardScale,
      );
      paperMm = fit.paperMm;
      scaleRatio = fit.scaleRatio;
      centerWorldX = (bContent.minX + bContent.maxX) / 2;
      centerWorldY = (bContent.minY + bContent.maxY) / 2;
      if (hasRealSheet) {
        // Generate border + fixed-proportion Title Block tailored to paper format & computed print scale
        sheetEntities = buildSheetEntities({
          ...setup,
          enabled: true,
          size: targetSize,
          orientation: fit.orientation,
          marginMm: margin,
          scale: fit.scaleLabel,
          center: { x: centerWorldX, y: centerWorldY },
          titleBlock: { ...setup.titleBlock, scale: fit.scaleLabel },
        });
      }
    } else {
      const resolvedOrient: SheetOrientation =
        targetOrientOpt === 'auto'
          ? bContent.maxX - bContent.minX >= bContent.maxY - bContent.minY
            ? 'landscape'
            : 'portrait'
          : targetOrientOpt;
      paperMm = sheetSizeMm(targetSize, resolvedOrient);
      const scaleStr =
        options.customScale ??
        (options.trueScale ? '1:1' : setup.scale || pageDrawing.scale || '1:1');
      scaleRatio = parseScaleRatio(scaleStr);
      centerWorldX = hasRealSheet ? (setup.center?.x ?? 0) : (bContent.minX + bContent.maxX) / 2;
      centerWorldY = hasRealSheet ? (setup.center?.y ?? 0) : (bContent.minY + bContent.maxY) / 2;
      if (hasRealSheet) {
        sheetEntities = buildSheetEntities({
          ...setup,
          enabled: true,
          size: targetSize,
          orientation: resolvedOrient,
          marginMm: margin,
          scale: scaleStr,
          center: { x: centerWorldX, y: centerWorldY },
          titleBlock: { ...setup.titleBlock, scale: scaleStr },
        });
      }
    }

    const renderDrawing: Drawing = sheetEntities.length
      ? { ...pageDrawing, entities: [...sheetEntities, ...contentEntities] }
      : pageDrawing;

    const pageW = paperMm.width * MM_TO_PT;
    const pageH = paperMm.height * MM_TO_PT;

    const toPaperPt = (p: Point): Point => ({
      x: (paperMm.width / 2 + (p.x - centerWorldX) * scaleRatio) * MM_TO_PT,
      y: (paperMm.height / 2 + (p.y - centerWorldY) * scaleRatio) * MM_TO_PT,
    });

    const ops: string[] = [];
    ops.push('1 1 1 rg');
    ops.push(`0 0 ${fmt(pageW)} ${fmt(pageH)} re f`);
    ops.push('1 J 1 j');

    const jumps = computeLineJumps(pageDrawing);
    const flats = flatten(renderDrawing);
    const expandSegmentJumps = (
      id: string,
      isTopLevel: boolean,
      aWorld: Point,
      bWorld: Point,
      segIdx: number,
      m: { a: number; b: number; c: number; d: number; e: number; f: number },
    ): Point[] => {
      const list = isTopLevel ? jumps.get(`${id}:${segIdx}`) : undefined;
      if (!list?.length) return [toPaperPt(transform(bWorld, m))];
      const out: Point[] = [];
      for (const j of list) {
        out.push(toPaperPt(transform(j.enter, m)));
        for (const arcPt of sampleLineJumpArc(j)) {
          out.push(toPaperPt(transform(arcPt, m)));
        }
      }
      out.push(toPaperPt(transform(bWorld, m)));
      return out;
    };
    for (const f of flats) {
      const e = f.entity,
        m = f.matrix,
        isTopLevel = e.id === f.owner,
        l = pageDrawing.layers.find((lay) => lay.id === f.layer),
        colorIndex = f.color && f.color !== 256 ? f.color : (l?.color ?? 7),
        [r, g, bl] = aciRgbPrint(colorIndex),
        lt = f.lineType ?? l?.lineType ?? 'CONTINUOUS',
        lp = f.linePattern ?? l?.linePattern,
        dashMm = dashPattern(lt, lp);

      ops.push(`${fmt(r)} ${fmt(g)} ${fmt(bl)} RG`);
      ops.push(`${fmt(r)} ${fmt(g)} ${fmt(bl)} rg`);

      const dashPt = dashMm.map((v) => fmt(Math.max(0.4, v * MM_TO_PT)));
      ops.push(dashPt.length ? `[${dashPt.join(' ')}] 0 d` : '[] 0 d');

      const strokePt = Math.max(0.35, 0.25 * MM_TO_PT);
      ops.push(`${fmt(strokePt)} w`);

      switch (e.type) {
        case 'line': {
          const pts = [
            toPaperPt(transform(e.a, m)),
            ...expandSegmentJumps(e.id, isTopLevel, e.a, e.b, 0, m),
          ];
          ops.push(
            pts.map((pt, i) => `${fmt(pt.x)} ${fmt(pt.y)} ${i === 0 ? 'm' : 'l'}`).join(' ') + ' S',
          );
          break;
        }
        case 'polyline':
        case 'wire': {
          if (e.points.length < 2) break;
          const pts: Point[] = [toPaperPt(transform(e.points[0], m))];
          for (let i = 0; i < e.points.length - 1; i++) {
            pts.push(...expandSegmentJumps(e.id, isTopLevel, e.points[i], e.points[i + 1], i, m));
          }
          if (e.type === 'polyline' && e.closed && e.points.length > 2) {
            pts.push(
              ...expandSegmentJumps(
                e.id,
                isTopLevel,
                e.points[e.points.length - 1],
                e.points[0],
                e.points.length - 1,
                m,
              ),
            );
          }
          ops.push(
            pts.map((pt, i) => `${fmt(pt.x)} ${fmt(pt.y)} ${i === 0 ? 'm' : 'l'}`).join(' ') +
              (e.type === 'polyline' && e.closed ? ' s' : ' S'),
          );
          break;
        }
        case 'circle':
        case 'arc': {
          const start = e.type === 'circle' ? 0 : e.start,
            sweep = e.type === 'circle' ? 360 : normAngle(e.end - e.start),
            steps = Math.max(16, Math.ceil(sweep / 5));
          const pts = Array.from({ length: steps + 1 }, (_, i) =>
            toPaperPt(transform(polar(e.center, e.radius, start + (sweep * i) / steps), m)),
          );
          ops.push(
            pts.map((pt, i) => `${fmt(pt.x)} ${fmt(pt.y)} ${i === 0 ? 'm' : 'l'}`).join(' ') +
              (e.type === 'circle' ? ' s' : ' S'),
          );
          break;
        }
        case 'text': {
          const origin = toPaperPt(transform(e.position, m)),
            dirPt = toPaperPt(transform(polar(e.position, 1, e.rotation), m)),
            ang = Math.atan2(dirPt.y - origin.y, dirPt.x - origin.x),
            cos = Math.cos(ang),
            sin = Math.sin(ang),
            localScale = Math.hypot(m.a, m.b) || 1,
            fontSizePt = Math.max(2.5, e.height * localScale * scaleRatio * MM_TO_PT);
          ops.push(
            `BT /F1 ${fmt(fontSizePt)} Tf ${fmt(cos)} ${fmt(sin)} ${fmt(-sin)} ${fmt(cos)} ${fmt(origin.x)} ${fmt(origin.y)} Tm (${pdfEscapeText(e.text)}) Tj ET`,
          );
          break;
        }
      }
      if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && e.arrows) {
        const pathPts = e.type === 'line' ? [e.a, e.b] : e.points;
        const closed = e.type === 'polyline' && e.closed;
        const markers = computeLineArrowMarkers(pathPts, closed, e.arrows);
        if (markers.length) {
          ops.push('[] 0 d');
          for (const mk of markers) {
            const shp = arrowMarkerShape(mk);
            if (shp.kind === 'circle') {
              const steps = 14;
              const rad = shp.radius ?? 1;
              const cPts = Array.from({ length: steps + 1 }, (_, i) =>
                toPaperPt(transform(polar(shp.points[0], rad, (360 * i) / steps), m)),
              );
              ops.push(
                cPts.map((pt, i) => `${fmt(pt.x)} ${fmt(pt.y)} ${i === 0 ? 'm' : 'l'}`).join(' ') +
                  ' f',
              );
            } else {
              const tPts = shp.points.map((pt) => toPaperPt(transform(pt, m)));
              const op = shp.kind === 'polygon' ? (shp.filled ? 'f' : 's') : 'S';
              ops.push(
                tPts.map((pt, i) => `${fmt(pt.x)} ${fmt(pt.y)} ${i === 0 ? 'm' : 'l'}`).join(' ') +
                  ` ${op}`,
              );
            }
          }
        }
      }
      if ((e.type === 'line' || e.type === 'polyline' || e.type === 'wire') && e.id === f.owner) {
        const anno = lineAnnotationPlacement(e);
        if (anno) {
          const origin = toPaperPt(transform(anno.position, m)),
            dirPt = toPaperPt(transform(polar(anno.position, 1, anno.angleDeg), m)),
            ang = Math.atan2(dirPt.y - origin.y, dirPt.x - origin.x),
            cos = Math.cos(ang),
            sin = Math.sin(ang),
            textH = Math.max(2.0, (pageDrawing.projectSettings?.defaultTextHeight ?? 2.6) * 0.85),
            fontSizePt = Math.max(2.5, textH * scaleRatio * MM_TO_PT);
          ops.push(
            `BT /F1 ${fmt(fontSizePt)} Tf ${fmt(cos)} ${fmt(sin)} ${fmt(-sin)} ${fmt(cos)} ${fmt(origin.x)} ${fmt(origin.y)} Tm (${pdfEscapeText(anno.text)}) Tj ET`,
          );
        }
      }
    }
    return { pageW, pageH, contentStream: ops.join('\n') };
  }

  /** Exports the CAD drawing (single or multi-page) as a Vector PDF 1.4 document string. */
  exportString(drawing: Drawing, options: PdfExportOptions = {}): string {
    const d = validateDrawing(drawing);
    syncActivePage(d);

    const pageDrawings: Drawing[] =
      d.pages && d.pages.length > 1 && options.allPages !== false
        ? d.pages.map((p) => ({
            ...d,
            entities: p.entities,
            scale: p.scale ?? d.scale,
            sheet: p.sheet ?? d.sheet,
          }))
        : [d];

    const renderedPages = pageDrawings.map((pd) => this.renderPageStream(pd, options));
    const title = pdfEscapeText(options.title || d.sheet?.titleBlock.title || 'CAD-Lab Drawing');
    const fontObjNum = 3;
    const infoObjNum = 4;
    const firstPageObj = 5;
    const pageKids: string[] = [];
    const pageObjects: string[] = [];

    renderedPages.forEach((rp, idx) => {
      const pageObjNum = firstPageObj + idx * 2;
      const streamObjNum = pageObjNum + 1;
      pageKids.push(`${pageObjNum} 0 R`);
      pageObjects.push(
        `${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${fmt(rp.pageW)} ${fmt(rp.pageH)}] /Resources << /Font << /F1 ${fontObjNum} 0 R >> >> /Contents ${streamObjNum} 0 R >>\nendobj`,
        `${streamObjNum} 0 obj\n<< /Length ${rp.contentStream.length} >>\nstream\n${rp.contentStream}\nendstream\nendobj`,
      );
    });

    const objects: string[] = [
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
      `2 0 obj\n<< /Type /Pages /Kids [${pageKids.join(' ')}] /Count ${renderedPages.length} >>\nendobj`,
      `${fontObjNum} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj`,
      `${infoObjNum} 0 obj\n<< /Title (${title}) /Creator (CAD-Lab) /Producer (CAD-Lab Vector PDF Engine) >>\nendobj`,
      ...pageObjects,
    ];

    let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets: number[] = [0];
    for (const obj of objects) {
      offsets.push(pdf.length);
      pdf += obj + '\n';
    }
    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    for (let i = 1; i < offsets.length; i++) {
      pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${infoObjNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
    return pdf;
  }
}
