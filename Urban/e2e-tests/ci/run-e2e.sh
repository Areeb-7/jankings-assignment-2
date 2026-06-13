#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WORKSPACE_DIR="$(cd "$ROOT_DIR/.." && pwd)"

echo "Workspace: $WORKSPACE_DIR"

# Start backend
echo "Starting backend..."
pushd "$WORKSPACE_DIR/backend" >/dev/null || exit 1
npm ci --silent
PORT=3010 nohup npm start > "$ROOT_DIR/ci/backend.log" 2>&1 &
popd >/dev/null

# Build and serve frontend
echo "Building and serving frontend..."
pushd "$WORKSPACE_DIR/frontend" >/dev/null || exit 1
npm ci --silent
npm run build --silent
npx http-server dist -p 5173 -c-1 > "$ROOT_DIR/ci/frontend.log" 2>&1 &
popd >/dev/null

# Wait for frontend
echo "Waiting for frontend at http://localhost:5173..."
for i in $(seq 1 60); do
  if curl -sSf http://localhost:5173 >/dev/null; then
    echo "frontend up"
    break
  fi
  sleep 1
done

# Wait for backend
echo "Waiting for backend at http://localhost:3010..."
for i in $(seq 1 60); do
  if curl -sSf http://localhost:3010/ >/dev/null 2>&1 || curl -sSf http://localhost:3010/health >/dev/null 2>&1; then
    echo "backend up"
    break
  fi
  sleep 1
done

# Run Maven tests
echo "Running Maven e2e tests..."
pushd "$ROOT_DIR" >/dev/null
mvn -f pom.xml -Dfrontend.url=http://localhost:5173 -Dbackend.url=http://localhost:3010 -Dheadless=true clean test
popd >/dev/null

echo "Done."
