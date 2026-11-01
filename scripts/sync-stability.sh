#!/usr/bin/env bash
# The stability demos have one source: ~/projects/stability-by-design. This copies its generic
# (vendor-neutral) build here. Rebuild there first: python3 site/build-site.py
set -euo pipefail
SRC="$HOME/projects/stability-by-design/site/index.html"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/demos/stability/index.html"
grep -q 'const BRAND = "";' "$SRC" || { echo "refusing: $SRC is not the generic build" >&2; exit 1; }
mkdir -p "$(dirname "$DEST")" && cp "$SRC" "$DEST" && echo "synced $(wc -c < "$DEST") bytes"
