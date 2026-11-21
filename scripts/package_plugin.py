"""CAD-Lab packaging and multi-vault deployment utility."""
from __future__ import annotations
from pathlib import Path
from datetime import datetime
import hashlib
import json
import re
import shutil
import sys
import zipfile

root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / 'manifest.json').read_text())
version = manifest['version']
plugin_id = manifest['id']
files = ['main.js', 'manifest.json', 'styles.css']

main = (root / 'main.js').read_text()
assert re.findall(r'\brequire\([\"\']([^\"\']+)[\"\']\)', main) == ['obsidian']
assert plugin_id == 'cad-lab' and manifest['isDesktopOnly'] is False
assert not re.search(r'\bTODO\b', '\n'.join(p.read_text() for p in (root / 'src').rglob('*.ts')))

out = root / 'dist' / plugin_id
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True, exist_ok=True)
for name in files:
    shutil.copy2(root / name, out / name)

archive = root / 'dist' / f'{plugin_id}-{version}.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for name in files:
        z.write(out / name, f'{plugin_id}/{name}')
    for name in ['README.md', 'TEST-REPORT.md', 'CHANGELOG.md']:
        if (root / name).exists():
            z.write(root / name, f'{plugin_id}/{name}')

with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None

(root / 'dist' / 'SHA256SUMS.txt').write_text(
    '\n'.join(
        hashlib.sha256((out / name).read_bytes()).hexdigest() + f'  {plugin_id}/' + name
        for name in files
    )
    + '\n'
    + hashlib.sha256(archive.read_bytes()).hexdigest()
    + '  '
    + archive.name
    + '\n'
)
print('Package:', archive.name)


def resolve_target_vaults() -> list[Path]:
    config_file = root / '.deploy-targets.json'
    candidates: list[Path] = []
    if config_file.exists():
        raw = json.loads(config_file.read_text())
        if isinstance(raw, list):
            candidates.extend(Path(p).expanduser().resolve() for p in raw if isinstance(p, str))
    else:
        icloud_docs = Path.home() / 'Library' / 'Mobile Documents' / 'iCloud~md~obsidian' / 'Documents'
        docs_root = icloud_docs if icloud_docs.is_dir() else root.parent.parent
        try:
            for child in sorted(docs_root.iterdir()):
                if child.is_dir():
                    candidates.append(child)
        except PermissionError:
            pass

    seen: set[Path] = set()
    vaults: list[Path] = []
    for v in candidates:
        try:
            if v not in seen and (v / '.obsidian').is_dir():
                seen.add(v)
                vaults.append(v)
        except PermissionError:
            continue
    return vaults


def sync_shared_libraries(vaults: list[Path]) -> int:
    library_sources: dict[str, Path] = {}
    for folder in [root / 'libraries', *[v / 'CAD Libraries' for v in vaults]]:
        try:
            if not folder.is_dir():
                continue
            for item in folder.glob('*.cad-library.json'):
                prev = library_sources.get(item.name)
                if prev is None or item.stat().st_mtime > prev.stat().st_mtime:
                    library_sources[item.name] = item
        except PermissionError:
            continue

    if not library_sources:
        return 0

    copied = 0
    for vault in vaults:
        dest_dir = vault / 'CAD Libraries'
        dest_dir.mkdir(parents=True, exist_ok=True)
        for name, src in library_sources.items():
            target = dest_dir / name
            if src.resolve() == target.resolve():
                continue
            if not target.exists() or target.read_bytes() != src.read_bytes():
                shutil.copy2(src, target)
                copied += 1
    return copied


if '--install' in sys.argv:
    vaults = resolve_target_vaults()
    assert vaults, 'No target Obsidian vaults found'
    stamp = datetime.now().strftime('before-%Y%m%d-%H%M%S')
    installed_names: list[str] = []

    for vault in vaults:
        plugins_dir = vault / '.obsidian' / 'plugins'
        destination = plugins_dir / plugin_id
        legacy = plugins_dir / 'obsidian-cad'
        for p in [vault / '.obsidian', plugins_dir, destination]:
            assert not p.is_symlink(), f'Symlink is not allowed: {p}'

        backup = root / 'installation-backup' / f'{stamp}-{vault.name}'
        backup.mkdir(parents=True, exist_ok=True)
        destination.mkdir(parents=True, exist_ok=True)

        # Preserve user settings when migrating from legacy obsidian-cad -> cad-lab
        if legacy.is_dir() and not legacy.is_symlink():
            legacy_data = legacy / 'data.json'
            new_data = destination / 'data.json'
            if legacy_data.exists() and not new_data.exists():
                shutil.copy2(legacy_data, new_data)
            legacy_bak = backup / 'legacy-obsidian-cad'
            legacy_bak.mkdir(parents=True, exist_ok=True)
            for item in legacy.iterdir():
                if item.is_file():
                    shutil.copy2(item, legacy_bak / item.name)
            shutil.rmtree(legacy)

            # Switch enabled plugin entry in community-plugins.json seamlessly
            cp_file = vault / '.obsidian' / 'community-plugins.json'
            if cp_file.exists():
                enabled = json.loads(cp_file.read_text())
                if isinstance(enabled, list) and 'obsidian-cad' in enabled:
                    updated = [plugin_id if x == 'obsidian-cad' else x for x in enabled]
                    deduped = list(dict.fromkeys(updated))
                    cp_file.write_text(json.dumps(deduped, indent=2) + '\n')

        for name in files:
            target = destination / name
            assert not target.is_symlink()
            if target.exists():
                shutil.copy2(target, backup / name)
            staged = destination / (name + '.cad-update.tmp')
            assert not staged.is_symlink()
            shutil.copy2(out / name, staged)
            staged.replace(target)
            assert target.read_bytes() == (out / name).read_bytes()

        installed_names.append(vault.name)

    synced_libs = sync_shared_libraries(vaults)
    print(f'Installed {plugin_id} {version} into vaults: {", ".join(installed_names)} (backup: {stamp})')
    if synced_libs:
        print(f'Synchronized {synced_libs} shared custom library file(s) across vaults')
