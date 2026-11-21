"""Independent development-only audit. No Python dependency is shipped in the plugin."""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET
import os
root = Path(__file__).resolve().parent.parent
os.environ['XDG_CACHE_HOME'] = str(root / '.test-cache')
os.environ['XDG_CONFIG_HOME'] = str(root / '.test-config')
import ezdxf
import yaml
source = root / 'examples' / 'Esempio P&ID.dxf'
doc = ezdxf.readfile(source)
audit = doc.audit()
print(f'DXF version: {doc.dxfversion}; modelspace entities: {len(doc.modelspace())}')
for entry in audit.errors:
    print('ERROR', entry.code, entry.message)
for entry in audit.fixes:
    print('FIX', entry.code, entry.message)
assert not audit.errors, 'DXF has structural errors'
assert not audit.fixes, 'DXF requires repair'
assert doc.dxfversion == 'AC1024'
assert doc.units == 4
assert len(doc.modelspace()) == 8
assert len(doc.modelspace().query('INSERT')) == 2
assert {e.get_attrib_text('TAG') for e in doc.modelspace().query('INSERT')} == {'P-101', 'FV-101'}
assert 'PIPES' in doc.layers
assert 'DASHED' in doc.linetypes
assert len(list(doc.blocks)) >= 28
print('PASS independent DXF audit, geometry, layers, blocks, attributes and millimetres')
markdown = (root / 'examples' / 'Esempio P&ID.cad.md').read_text()
header = yaml.safe_load(markdown.split('---', 2)[1])
assert header['obsidian-cad'] is True
assert header['cad-component-tags'] == ['FV-101', 'P-101']
assert set(header['tags']) == {'cad', 'FV-101', 'P-101'}
json_data = re.search(r'^```cad-data\n([\s\S]*?)^```', markdown, re.M).group(1)
drawing = json.loads(json_data)
assert drawing['units'] == 'mm'
ET.parse(root / 'examples' / 'Esempio P&ID.svg')
print('PASS independent YAML/JSON and SVG parsing')

# Generate a real third-party fixture, with nested blocks, off/locked layers,
# non-zero block base points, bulges, UTF-8 text and inch units.
external = ezdxf.new('R2010')
external.units = 1
external.layers.new('CONTROL', dxfattribs={'color': 3, 'flags': 4})
block = external.blocks.new('DEVICE', base_point=(5, 2))
block.add_line((5, 2), (6, 2))
block.add_circle((5.5, 2.5), .25)
block.add_attdef('TAG', insert=(5, 3), text='DEFAULT', height=.1)
nested = external.blocks.new('ASSEMBLY')
nested.add_blockref('DEVICE', (2, 0), dxfattribs={'rotation': 90})
msp = external.modelspace()
insert = msp.add_blockref('DEVICE', (10, 20), dxfattribs={'layer': 'CONTROL', 'rotation': 90})
insert.add_auto_attribs({'TAG': 'Q1'})
msp.add_blockref('ASSEMBLY', (30, 40))
msp.add_lwpolyline([(0, 0, 1), (2, 0, 0)], format='xyb')
msp.add_text('MOTORE Ø Δ', dxfattribs={'insert': (1, 1), 'height': .2})
external.saveas(root / 'examples' / 'External-inch-blocks.dxf')
print('Generated independent external DXF fixture')
