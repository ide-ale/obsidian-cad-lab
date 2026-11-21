import { Block, Drawing, Entity, Port, clone } from './model';
import { boundsOf, flatten, flatPoints, transformEntity, identity } from './geometry';

export type LibrarySortOrder = 'name' | 'standard' | 'tag' | 'group';

export interface LibraryGroupNode {
  group: string;
  blocks: Block[];
}

export interface LibraryStandardNode {
  standard: string;
  count: number;
  groups: LibraryGroupNode[];
}

export interface LibraryTreeNode {
  library: string;
  count: number;
  standards: LibraryStandardNode[];
}

export interface CustomBlockSpec {
  id?: string;
  name: string;
  library: string;
  standard: string;
  group: string;
  tagPrefix?: string;
  portPreset?: 'lr' | 'tb' | 'quad' | 'none';
  attributes?: Record<string, string>;
}

/**
 * Builds a hierarchical 3-level tree (Library -> Standard -> Family/Group -> Symbols)
 * with configurable sorting.
 */
export function buildLibraryTree(
  blocks: Block[],
  sortBy: LibrarySortOrder = 'name',
  filter?: {
    library?: string;
    standard?: string;
    group?: string;
    search?: string;
  },
): LibraryTreeNode[] {
  const q = filter?.search?.trim().toLocaleLowerCase() ?? '';
  const filtered = blocks.filter((b) => {
    const lib = b.library ?? 'User / imported';
    const std = b.standard ?? 'Custom';
    const grp = b.group ?? b.category;
    if (filter?.library && lib !== filter.library) return false;
    if (filter?.standard && std !== filter.standard) return false;
    if (filter?.group && grp !== filter.group) return false;
    if (q) {
      const hay =
        `${b.name} ${lib} ${std} ${grp} ${b.category} ${b.attributes.TAG ?? ''}`.toLocaleLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const compareBlocks = (a: Block, b: Block): number => {
    if (sortBy === 'tag') {
      const ta = a.attributes.TAG ?? '',
        tb = b.attributes.TAG ?? '';
      if (ta !== tb) return ta.localeCompare(tb);
    } else if (sortBy === 'standard') {
      const sa = a.standard ?? '',
        sb = b.standard ?? '';
      if (sa !== sb) return sa.localeCompare(sb);
    } else if (sortBy === 'group') {
      const ga = a.group ?? '',
        gb = b.group ?? '';
      if (ga !== gb) return ga.localeCompare(gb);
    }
    return a.name.localeCompare(b.name);
  };

  const libOrder = ['P&ID', 'Electrical multi-line', 'Electrical single-line', 'General'];
  const libMap = new Map<string, Map<string, Map<string, Block[]>>>();
  for (const b of filtered) {
    const lib = b.library ?? 'User / imported',
      std = b.standard ?? 'Custom',
      grp = b.group ?? b.category;
    if (!libMap.has(lib)) libMap.set(lib, new Map());
    const stdMap = libMap.get(lib)!;
    if (!stdMap.has(std)) stdMap.set(std, new Map());
    const grpMap = stdMap.get(std)!;
    if (!grpMap.has(grp)) grpMap.set(grp, []);
    grpMap.get(grp)!.push(b);
  }

  const libraries = [...libMap.keys()].sort((a, b) => {
    const ia = libOrder.indexOf(a),
      ib = libOrder.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b);
  });

  return libraries.map((library) => {
    const stdMap = libMap.get(library)!;
    const standards: LibraryStandardNode[] = [...stdMap.keys()]
      .sort((a, b) => a.localeCompare(b))
      .map((standard) => {
        const grpMap = stdMap.get(standard)!;
        const groups: LibraryGroupNode[] = [...grpMap.keys()]
          .sort((a, b) => a.localeCompare(b))
          .map((group) => {
            const items = [...grpMap.get(group)!].sort(compareBlocks);
            return { group, blocks: items };
          });
        const count = groups.reduce((acc, g) => acc + g.blocks.length, 0);
        return { standard, count, groups };
      });
    const count = standards.reduce((acc, s) => acc + s.count, 0);
    return { library, count, standards };
  });
}

export function buildPresetPorts(
  preset: CustomBlockSpec['portPreset'] = 'lr',
  halfW = 10,
  halfH = 10,
): Port[] {
  if (preset === 'none') return [];
  const lr: Port[] = [
    { id: 'IN', point: { x: -halfW, y: 0 }, direction: { x: -1, y: 0 } },
    { id: 'OUT', point: { x: halfW, y: 0 }, direction: { x: 1, y: 0 } },
  ];
  const tb: Port[] = [
    { id: 'TOP', point: { x: 0, y: halfH }, direction: { x: 0, y: 1 } },
    { id: 'BOTTOM', point: { x: 0, y: -halfH }, direction: { x: 0, y: -1 } },
  ];
  if (preset === 'tb')
    return [
      { id: 'IN', point: { x: 0, y: halfH }, direction: { x: 0, y: 1 } },
      { id: 'OUT', point: { x: 0, y: -halfH }, direction: { x: 0, y: -1 } },
    ];
  if (preset === 'quad') return [...lr, ...tb];
  return lr;
}

/**
 * Creates a new custom symbol block from the currently selected entities in the drawing,
 * or generates a parametric schematic symbol block if no entities are selected.
 */
export function createCustomBlock(
  d: Drawing,
  selectedIds: Set<string>,
  spec: CustomBlockSpec,
): Block {
  const name = spec.name.trim();
  if (!name) throw new Error('Symbol name is required');
  const library = spec.library.trim() || 'Custom Engineering',
    standard = spec.standard.trim() || 'Custom Standard',
    group = spec.group.trim() || 'General Components',
    tag = (spec.tagPrefix ?? 'X').trim();

  const selectedEntities = d.entities
    .filter((e) => selectedIds.has(e.id) && e.type !== 'wire' && e.type !== 'dimension')
    .map(clone);

  let entities: Entity[] = [];
  let halfW = 10,
    halfH = 10;

  if (selectedEntities.length > 0) {
    const pts = flatten(d, selectedEntities).flatMap(flatPoints);
    const b = boundsOf(pts);
    const cx = Number.isFinite(b.minX) ? (b.minX + b.maxX) / 2 : 0,
      cy = Number.isFinite(b.minY) ? (b.minY + b.maxY) / 2 : 0;
    halfW = Math.max(4, Math.round(((b.maxX - b.minX) / 2 + 2) * 10) / 10);
    halfH = Math.max(4, Math.round(((b.maxY - b.minY) / 2 + 2) * 10) / 10);
    const shift = { ...identity(), e: -cx, f: -cy };
    entities = selectedEntities.map((e, idx) => {
      const copy = clone(e);
      copy.id = `custom-ent-${idx + 1}`;
      copy.layer = '0';
      transformEntity(copy, shift);
      return copy;
    });
  } else {
    // Generate a clean standard schematic block geometry with connection leads
    const label = (tag || name.slice(0, 3)).toUpperCase();
    entities = [
      {
        id: 'custom-box',
        layer: '0',
        type: 'polyline',
        closed: true,
        points: [
          { x: -6, y: -5 },
          { x: 6, y: -5 },
          { x: 6, y: 5 },
          { x: -6, y: 5 },
        ],
      },
      {
        id: 'custom-lead-a',
        layer: '0',
        type: 'line',
        a: spec.portPreset === 'tb' ? { x: 0, y: 5 } : { x: -10, y: 0 },
        b: spec.portPreset === 'tb' ? { x: 0, y: 10 } : { x: -6, y: 0 },
      },
      {
        id: 'custom-lead-b',
        layer: '0',
        type: 'line',
        a: spec.portPreset === 'tb' ? { x: 0, y: -5 } : { x: 6, y: 0 },
        b: spec.portPreset === 'tb' ? { x: 0, y: -10 } : { x: 10, y: 0 },
      },
      {
        id: 'custom-label',
        layer: '0',
        type: 'text',
        position: { x: -label.length * 0.9, y: -1 },
        text: label,
        height: 2.5,
        rotation: 0,
      },
    ];
  }

  const attributes: Record<string, string> = {
    TAG: tag,
    VALUE: '',
    DESCRIPTION: '',
    NOTES: '',
    ...(spec.attributes ?? {}),
  };

  const baseId =
    spec.id?.trim() ||
    `custom-${library.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  let id = baseId,
    n = 1;
  const existingIds = new Set(d.blocks.map((b) => b.id));
  while (existingIds.has(id)) id = `${baseId}-${++n}`;

  const block: Block = {
    id,
    name,
    library,
    standard,
    group,
    category: `${library} / ${standard} / ${group}`,
    entities,
    ports: buildPresetPorts(spec.portPreset ?? 'lr', halfW, halfH),
    attributes,
  };
  d.blocks.push(block);
  return block;
}

/** Updates metadata and default attributes on an existing symbol block. */
export function updateBlockMetadata(
  d: Drawing,
  blockId: string,
  patch: Partial<CustomBlockSpec>,
): Block {
  const block = d.blocks.find((b) => b.id === blockId);
  if (!block) throw new Error('Block not found');
  if (patch.name?.trim()) block.name = patch.name.trim();
  if (patch.library?.trim()) block.library = patch.library.trim();
  if (patch.standard?.trim()) block.standard = patch.standard.trim();
  if (patch.group?.trim()) block.group = patch.group.trim();
  block.category = `${block.library ?? 'User'} / ${block.standard ?? 'Custom'} / ${block.group ?? 'General'}`;
  if (patch.tagPrefix !== undefined) block.attributes.TAG = patch.tagPrefix.trim();
  if (patch.attributes) {
    block.attributes = { ...block.attributes, ...patch.attributes };
  }
  return block;
}

/**
 * Deletes a single block or an entire library/standard subset from `d.blocks`,
 * skipping any block that is actively referenced by an `insert` entity in the drawing.
 */
export function deleteFromLibrary(
  d: Drawing,
  target: { blockId?: string; library?: string; standard?: string },
): { removed: number; inUse: number } {
  const usedBlocks = new Set<string>();
  const collectUsed = (entities: Entity[]): void => {
    for (const e of entities) {
      if (e.type === 'insert') usedBlocks.add(e.block);
    }
  };
  collectUsed(d.entities);
  for (const b of d.blocks) collectUsed(b.entities);

  let removed = 0,
    inUse = 0;
  d.blocks = d.blocks.filter((b) => {
    const match = target.blockId
      ? b.id === target.blockId
      : (target.library ? (b.library ?? 'User / imported') === target.library : true) &&
        (target.standard ? (b.standard ?? 'Custom') === target.standard : true);
    if (!match) return true;
    if (usedBlocks.has(b.id)) {
      inUse++;
      return true;
    }
    removed++;
    return false;
  });
  return { removed, inUse };
}
