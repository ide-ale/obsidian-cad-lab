export type ShortcutAction =
  | 'toggleOsnap'
  | 'toggleOrtho'
  | 'toggleGridSnap'
  | 'togglePolar'
  | 'toggleTracking'
  | 'toggleDynamicInput'
  | 'find'
  | 'toolSelect'
  | 'toolLine'
  | 'toolPolyline'
  | 'toolMove'
  | 'toolCopy'
  | 'toolRotate'
  | 'toolScale'
  | 'toolOffset'
  | 'toolMatchProp'
  | 'toolTrim'
  | 'toolExtend';

export type RightClickMode = 'pan_or_finish' | 'repeat_last' | 'context_menu';
export type MiddleClickMode = 'pan' | 'zoom_extents' | 'finish';
export type WheelMode = 'zoom' | 'pan_vertical';

export interface MouseBindings {
  rightClick: RightClickMode;
  middleClick: MiddleClickMode;
  wheelMode: WheelMode;
  invertWheelZoom: boolean;
}

export interface InputBindings {
  shortcuts: Partial<Record<ShortcutAction, string>>;
  customAliases: Record<string, string>;
  mouse: MouseBindings;
}

export const SHORTCUT_LABELS: Record<ShortcutAction, string> = {
  toggleOsnap: 'Toggle Object Snap (OSNAP)',
  toggleOrtho: 'Toggle Orthogonal Lock (ORTHO)',
  toggleGridSnap: 'Toggle Grid Snap (SNAP)',
  togglePolar: 'Toggle Polar Tracking (POLAR)',
  toggleTracking: 'Toggle Alignment Tracking (OTRACK)',
  toggleDynamicInput: 'Toggle Dynamic Input (DYN)',
  find: 'Find / Search Drawing & Layers',
  toolSelect: 'Select tool',
  toolLine: 'Line tool',
  toolPolyline: 'Polyline tool',
  toolMove: 'Move tool',
  toolCopy: 'Copy tool',
  toolRotate: 'Rotate tool',
  toolScale: 'Scale tool',
  toolOffset: 'Offset tool',
  toolMatchProp: 'Match Properties tool',
  toolTrim: 'Trim tool',
  toolExtend: 'Extend tool',
};

export const DEFAULT_SHORTCUTS: Partial<Record<ShortcutAction, string>> = {
  toggleOsnap: 'F3',
  toggleOrtho: 'F8',
  toggleGridSnap: 'F9',
  togglePolar: 'F10',
  toggleTracking: 'F11',
  toggleDynamicInput: 'F12',
  find: 'Ctrl+F',
};

export const DEFAULT_MOUSE_BINDINGS: MouseBindings = {
  rightClick: 'pan_or_finish',
  middleClick: 'pan',
  wheelMode: 'zoom',
  invertWheelZoom: false,
};

export function defaultInputBindings(): InputBindings {
  return {
    shortcuts: { ...DEFAULT_SHORTCUTS },
    customAliases: {},
    mouse: { ...DEFAULT_MOUSE_BINDINGS },
  };
}

export function sanitizeInputBindings(raw?: Partial<InputBindings>): InputBindings {
  const base = defaultInputBindings();
  if (!raw) return base;
  if (raw.shortcuts && typeof raw.shortcuts === 'object') {
    for (const key of Object.keys(SHORTCUT_LABELS) as ShortcutAction[]) {
      const val = raw.shortcuts[key];
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed) base.shortcuts[key] = trimmed;
        else delete base.shortcuts[key];
      }
    }
  }
  if (raw.customAliases && typeof raw.customAliases === 'object') {
    for (const [k, v] of Object.entries(raw.customAliases)) {
      const alias = k.trim().toUpperCase();
      const target = String(v).trim().toUpperCase();
      if (alias && target && !['__PROTO__', 'CONSTRUCTOR', 'PROTOTYPE'].includes(alias)) {
        base.customAliases[alias] = target;
      }
    }
  }
  if (raw.mouse && typeof raw.mouse === 'object') {
    if (['pan_or_finish', 'repeat_last', 'context_menu'].includes(String(raw.mouse.rightClick))) {
      base.mouse.rightClick = raw.mouse.rightClick;
    }
    if (['pan', 'zoom_extents', 'finish'].includes(String(raw.mouse.middleClick))) {
      base.mouse.middleClick = raw.mouse.middleClick;
    }
    if (['zoom', 'pan_vertical'].includes(String(raw.mouse.wheelMode))) {
      base.mouse.wheelMode = raw.mouse.wheelMode;
    }
    if (typeof raw.mouse.invertWheelZoom === 'boolean') {
      base.mouse.invertWheelZoom = raw.mouse.invertWheelZoom;
    }
  }
  return base;
}

/** Normalizes a keyboard event into a deterministic shortcut string such as `F3` or `Ctrl+F`. */
export function normalizeKeyCombo(e: {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}): string {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  const rawKey = e.key.trim();
  const normalizedKey =
    rawKey === ' '
      ? 'Space'
      : /^f\d{1,2}$/i.test(rawKey)
        ? rawKey.toUpperCase()
        : rawKey.length === 1
          ? rawKey.toUpperCase()
          : rawKey;
  if (!['Control', 'Meta', 'Alt', 'Shift'].includes(rawKey)) parts.push(normalizedKey);
  return parts.join('+');
}

export function matchesKeyCombo(
  e: {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
  },
  binding?: string,
): boolean {
  if (!binding) return false;
  const normalizedTarget = binding
    .split('+')
    .map((p) => {
      const t = p.trim();
      if (/^(cmd|ctrl|mod)$/i.test(t)) return 'Ctrl';
      if (/^alt|option$/i.test(t)) return 'Alt';
      if (/^shift$/i.test(t)) return 'Shift';
      if (/^f\d{1,2}$/i.test(t)) return t.toUpperCase();
      return t.length === 1 ? t.toUpperCase() : t;
    })
    .join('+');
  return normalizeKeyCombo(e) === normalizedTarget;
}
