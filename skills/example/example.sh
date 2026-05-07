#!/usr/bin/env bash
# Replace this with your skill's implementation.
set -euo pipefail

INPUT="${1:-}"
if [[ -z "$INPUT" ]]; then
  echo "Usage: $0 <input>" >&2
  exit 1
fi

echo "Result: $(echo "$INPUT" | tr '[:lower:]' '[:upper:]')"
