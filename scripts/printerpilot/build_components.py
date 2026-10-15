#!/usr/bin/env python3
"""Regenerate src/content/printerpilot/components.json and public/printerpilot/licences/ for the source-availability page.

    build_components.py <pack_root> <kernel_pack_licences.py> [--lock hub/requirements-cad.lock]

<pack_root> is a directory with lib/python3.11/site-packages holding the PrinterPilot kernel-pack wheels, installed from the
hash-pinned lock (`pip install --require-hashes --only-binary :all: --no-deps --target ...`). The licence helper is the one
PrinterPilot's own pack builder runs (hub/installer/kernel_pack_licences.py), imported rather than copied so this page and
the pack's own NOTICES.md come from the same logic.

For each Python package it records the declared licence, copies every licence file the package ships, and asks PyPI for the
source distribution (URL and SHA-256). It states no legal conclusion. Needs network (PyPI). Not run by the site build.
"""
from __future__ import annotations

import argparse, importlib.util, json, shutil, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def load_helper(path: Path):
    spec = importlib.util.spec_from_file_location("kpl", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def pypi_sdist(name: str, version: str):
    url = f"https://pypi.org/pypi/{name}/{version}/json"
    with urllib.request.urlopen(url, timeout=30) as r:
        data = json.load(r)
    for f in data["urls"]:
        if f["packagetype"] == "sdist":
            return {"url": f["url"], "filename": f["filename"], "sha256": f["digests"]["sha256"]}
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("pack_root")
    ap.add_argument("helper")
    ap.add_argument("--provenance", default="")
    a = ap.parse_args()
    k = load_helper(Path(a.helper))
    root = Path(a.pack_root)
    out_pub = ROOT / "public" / "printerpilot" / "licences"
    if out_pub.exists():
        shutil.rmtree(out_pub)
    out_pub.mkdir(parents=True)

    pkgs, native = [], []
    for sp in k._site_packages(root):
        for di in sorted(sp.glob("*.dist-info")):
            m = k._meta(di)
            name, version = m.get("name", di.name), m.get("version", "?")
            files = k._licence_files(di)
            tag = f"{di.name[:-len('.dist-info')]}"
            rels = []
            for f in files:
                rel = f.relative_to(di)
                if f.suffix != ".txt":
                    # served as text, not offered as a download: a bare "LICENSE" has no content type
                    rel = rel.with_name(rel.name + ".txt")
                dest = out_pub / tag / rel
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, dest)
                rels.append(f"{tag}/{rel.as_posix()}")
            try:
                sdist = pypi_sdist(name, version)
            except Exception as e:  # recorded, not hidden
                print(f"PyPI lookup failed for {name} {version}: {e}", file=sys.stderr)
                sdist = None
            pkgs.append({
                "name": name, "version": version,
                "declaredLicence": m.get("licence") or m.get("classifiers") or None,
                "home": m.get("home") or None,
                "licenceFiles": rels,
                "pypiPage": f"https://pypi.org/project/{name}/{version}/",
                "sdist": sdist,
            })
        seen = set()
        for d in sorted(sp.rglob("*.dylib")):
            rel = d.relative_to(sp)
            key = (rel.parts[0], d.name)
            if key in seen:
                continue
            seen.add(key)
            usual = k._usual(d.name)
            native.append({"package": rel.parts[0], "library": d.name, "sizeKb": d.stat().st_size // 1024,
                           "upstreamUsual": usual, "flagged": "FLAGGED" in usual})
    pkgs.sort(key=lambda p: p["name"].lower())
    native.sort(key=lambda n: (n["package"], n["library"]))
    occt_dir = Path(k.OCCT_DIR)
    occt_pub = ROOT / "public" / "printerpilot" / "licences" / "OCCT"
    occt_pub.mkdir(parents=True, exist_ok=True)
    for f in sorted(occt_dir.glob("*.txt")):
        shutil.copy2(f, occt_pub / f.name)
    data = {"provenance": a.provenance, "python": pkgs, "native": native}
    dest = ROOT / "src" / "content" / "printerpilot" / "components.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(pkgs)} packages, {len(native)} native libraries, sdist missing for "
          f"{[p['name'] for p in pkgs if not p['sdist']]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
