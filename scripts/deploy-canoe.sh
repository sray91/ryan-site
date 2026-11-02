#!/usr/bin/env bash
# Deploy ryancahalane.com to Canoe (Ubuntu/systemd, service ryan-site on :3330, behind the
# advisor-canoe Cloudflare tunnel). Usage: npm run deploy:canoe
# Code lives in /opt/ryan-site; its .env.production stays on the server and is never copied.
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CANOE="canoe"; PORT=3330

echo "[deploy] 1: malware sweep (blocking) — see ~/Documents/security/2026-11-01-js-config-malware-incident.md"
hits=$(python3 -I ~/.config/git-guard/sweep.py "$PWD") || { echo "FAILED: sweep found:"; echo "$hits"; exit 1; }

echo "[deploy] 2: local production build (blocking)"
( export $(grep -E '^NEXT_PUBLIC_SANITY_(DATASET|PROJECT_ID)=' .env.local.production | tr -d '"' | xargs) && npx next build >/dev/null ) \
  || { echo "FAILED: next build — not deploying"; exit 1; }

echo "[deploy] 3: sync to $CANOE:/opt/ryan-site (keeps server .env.production)"
rsync -az --delete \
  --exclude=node_modules --exclude=.next --exclude=.git --exclude='.env*' --exclude=.claude --exclude='._*' \
  --exclude=data/moon --exclude=data/soundtrack \
  --filter='P .env*' --filter='P node_modules' --filter='P .next' \
  "$PWD"/ "$CANOE:/opt/ryan-site/"

echo "[deploy] 4: sweep, install, build and restart on Canoe"
ssh "$CANOE" "set -e; cd /opt/ryan-site && python3 -I ~/.config/git-guard/sweep.py /opt/ryan-site && \
  npm install --no-audit --no-fund --ignore-scripts >/dev/null && \
  set -a && . ./.env.production && set +a && ./node_modules/.bin/next build >/dev/null && sudo systemctl restart ryan-site"

echo "[deploy] 5: smoke test"
sleep 4
for p in / /about /blog /demos /demos/causal-101 /projects-home /demos/stability/index.html; do
  code=$(ssh "$CANOE" "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$PORT$p")
  [ "$code" = 200 ] || { echo "FAILED: $p returned $code"; exit 1; }
done
echo "[deploy] done: all pages 200 on Canoe:$PORT"
