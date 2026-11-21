/** Small inline SVG icons, independent of a host icon registry. */
const paths: Record<string, string> = {
  SELECT: 'M4 3l6 17 3-7 7-3Z',
  L: 'M4 19L20 5 M3 17v4h4 M17 3h4v4',
  PL: 'M3 18l6-12 7 11 5-13 M2 17h2v2H2 M8 5h2v2H8 M15 16h2v2h-2',
  W: 'M3 6h7v12h11 M3 3v6 M21 15v6',
  C: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 10v4 M10 12h4',
  A: 'M4 19a13 13 0 0 1 15-15 M3 17v4h4 M17 3h4v4',
  REC: 'M3 5h18v14H3Z',
  T: 'M4 5h16 M12 5v16 M8 21h8 M4 5v3 M20 5v3',
  I: 'M12 3l9 5v9l-9 5-9-5V8Z M3 8l9 5 9-5 M12 13v9',
  M: 'M12 2v20 M2 12h20 M8 6l4-4 4 4 M8 18l4 4 4-4 M6 8l-4 4 4 4 M18 8l4 4-4 4',
  CO: 'M8 8h13v13H8Z M4 16H3V3h13v1',
  RO: 'M4 9a8 8 0 1 1 1 9 M4 3v6h6',
  SC: 'M4 20h7v-7H4Z M11 13L20 4 M14 4h6v6 M4 9V4h16v16h-5',
  MI: 'M12 2v3 M12 8v3 M12 14v3 M12 20v2 M9 6l-6 6 6 6Z M15 6l6 6-6 6Z',
  MA: 'M15 4l5 5-9 9H6v-5Z M12 7l5 5 M3 21h9',
  E: 'M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7',
  TR: 'M4 4l16 16 M4 20l7-7 M15 9l5-5 M4 4a3 3 0 1 0 0 .1 M4 20a3 3 0 1 0 0 .1',
  EX: 'M3 17h12 M12 13l4 4-4 4 M20 3v18 M3 4l10 8',
  O: 'M4 18a14 14 0 0 1 14-14 M9 18a9 9 0 0 1 9-9 M14 14l4 4',
  J: 'M2 13h5a5 5 0 0 1 10 0h5 M12 3v18',
  F: 'M4 19V11a7 7 0 0 1 7-7h9',
  DIST: 'M3 17l14-14 4 4-14 14H3Z M12 8l2 2 M9 11l2 2',
  FIND: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z M21 21l-5.2-5.2',
  PRINT:
    'M6 9V3h12v6 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v7H6Z',
  PAGES: 'M4 6h12v14H4Z M8 3h12v14h-4',
  PAN: 'M8 12V6a2 2 0 0 1 4 0v6 M12 8a2 2 0 0 1 4 0v4 M16 10a2 2 0 0 1 4 0v6c0 4-3 6-7 6-2 0-4-1-5-3l-4-6a2 2 0 0 1 3-2l1 2',
  DIM: 'M3 16V8 M21 16V8 M3 12h18 M6 9l-3 3 3 3 M18 9l3 3-3 3',
  LIB: 'M4 4h7v7H4Z M13 4h7v7h-7Z M4 13h7v7H4Z M16.5 13v7 M13 16.5h7',
  FULL: 'M9 3H3v6 M15 3h6v6 M3 15v6h6 M21 15v6h-6',
  EXIT: 'M3 9h6V3 M21 9h-6V3 M9 21v-6H3 M15 21v-6h6',
  UNDO: 'M9 14L4 9l5-5 M4 9h10.5a5.5 5.5 0 0 1 0 11H11',
  REDO: 'M15 14l5-5-5-5 M20 9H9.5a5.5 5.5 0 0 0 0 11H13',
  ZOOM_IN: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3 M11 8v6 M8 11h6',
  ZOOM_OUT: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3 M8 11h6',
  ZOOM_FIT: 'M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7',
  EXPORT: 'M12 3v12 M7 10l5 5 5-5 M4 17v3h16v-3',
  GEAR: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
  GROUP:
    'M3 3h4v4H3Z M17 3h4v4h-4Z M3 17h4v4H3Z M17 17h4v4h-4Z M7 5h10 M7 19h10 M5 7v10 M19 7v10 M9 9h6v6H9Z',
  UNGROUP: 'M3 3h6v6H3Z M15 3h6v6h-6Z M3 15h6v6H3Z M15 15h6v6h-6Z M9 6h6 M6 9v6 M18 9v6 M9 18h6',
  DOCK: 'M3 4h18v16H3Z M9 4v16',
  COLLAPSE: 'M6 15l6-6 6 6',
  EXPAND: 'M6 9l6 6 6-6',
  LTYPE: 'M3 12h4 M9 12h6 M17 12h4',
  ARROW: 'M4 12h15 M14 7l5 5-5 5',
  COLOR: 'M12 4a8 8 0 1 0 0 16 8 8 0 1 0 0-16Z M12 8v8 M8 12h8',
  PIPING: 'M3 12h18 M8 8v8 M16 8v8',
  ALIGN_H: 'M12 3v18 M5 6h14v4H5Z M7 14h10v4H7Z',
  ALIGN_V: 'M3 12h18 M6 5h4v14H6Z M14 7h4v10h-4Z',
  MERGE: 'M5 5h6v6H5Z M13 5h6v6h-6Z M8 11v3h8v-3 M12 14v6 M9 17l3 3 3-3',
  LABEL_POS: 'M4 7h12 M10 7v10 M16 14l4 4m0-4l-4 4',
  BOM: 'M4 5h16v14H4Z M4 10h16 M4 14h16 M9 5v14',
  EYE: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  EYE_OFF:
    'M3 3l18 18 M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4 M9.9 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a16.4 16.4 0 0 1-4.3 4.8 M6.6 6.6C4.1 8.4 2 12 2 12s3.5 6 10 6c1.5 0 2.9-.3 4.1-.8',
  LOCK: 'M7 11V7a5 5 0 0 1 10 0v4 M5 11h14v9H5Z M12 15v2',
  UNLOCK: 'M7 11V7a5 5 0 0 1 9.8-1 M5 11h14v9H5Z M12 15v2',
  CHECK: 'M5 12l5 5 9-9',
  CLOSE: 'M6 6l12 12 M18 6l-12 12',
  REVERSE: 'M4 8h13l-3-3 M20 16H7l3 3',
  LAYER_ACTIVE: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  LAYER_IDLE: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  CONNECTOR: 'M3 9h4v6H3Z M17 9h4v6h-4Z M7 12h4l2-4 2 4h2',
  LAYERS: 'M12 3l9 4.5-9 4.5-9-4.5Z M3 12l9 4.5 9-4.5 M3 16.5l9 4.5 9-4.5',
  LEN: 'M4 12h16 M7 9l-3 3 3 3 M17 9l3 3-3 3',
  ANGLE: 'M4 19h16 M4 19L16 5 M9 19a7 7 0 0 0-2.5-5',
};
export function setToolIcon(button: HTMLButtonElement, id: string, label?: string): void {
  const svg = button.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  const path = button.ownerDocument.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', paths[id] ?? paths.SELECT);
  svg.append(path);
  button.replaceChildren(svg);
  button.classList.add('cad-icon-button');
  if (label) {
    const text = button.ownerDocument.createElement('span');
    text.textContent = label;
    button.append(text);
  }
}
