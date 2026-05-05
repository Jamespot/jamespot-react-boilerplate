#!/usr/bin/env bash
#
# Synchronise les règles Claude Code depuis le claude-workspace vers ce projet.
#
# Source par défaut : ~/jamespot/claude-workspace
#   (override via la variable d'env CLAUDE_WORKSPACE)
#
# Cible : <ce-projet>/.claude/rules/
#
# Lancement : `pnpm sync:rules`
#
set -euo pipefail

WS="${CLAUDE_WORKSPACE:-$HOME/jamespot/claude-workspace}"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$PROJECT_ROOT/.claude/rules"

SRC_FRONTEND="$WS/.claude/rules/frontend"
SRC_BOILERPLATE="$WS/.claude/docs/boilerplateRules"

# --- Pré-vérification : tous les chemins sources doivent exister avant tout side-effect

require_dir() {
  local path="$1"
  local hint="$2"
  if [ ! -d "$path" ]; then
    echo "✗ Dossier introuvable : $path"
    [ -n "$hint" ] && echo "  $hint"
    exit 1
  fi
}

require_dir "$WS" \
  "Configurez la variable d'env CLAUDE_WORKSPACE ou clonez le workspace au chemin par défaut (~/jamespot/claude-workspace)."
require_dir "$SRC_FRONTEND" \
  "Attendu dans le workspace : .claude/rules/frontend/"
require_dir "$SRC_FRONTEND/_shared" \
  "Attendu dans le workspace : .claude/rules/frontend/_shared/"
require_dir "$SRC_FRONTEND/ui" \
  "Attendu dans le workspace : .claude/rules/frontend/ui/"
require_dir "$SRC_FRONTEND/domain" \
  "Attendu dans le workspace : .claude/rules/frontend/domain/"
require_dir "$SRC_BOILERPLATE" \
  "Attendu dans le workspace : .claude/docs/boilerplateRules/"

mkdir -p "$TARGET"

# 1. _shared/ (sans _monorepo/) — sync authoritative (--delete)
rsync -a --delete --exclude='_monorepo/' "$SRC_FRONTEND/_shared/" "$TARGET/_shared/"

# 2. ui/ et domain/ — sync authoritative
rsync -a --delete "$SRC_FRONTEND/ui/" "$TARGET/ui/"
rsync -a --delete "$SRC_FRONTEND/domain/" "$TARGET/domain/"

# 3. boilerplateRules/ — fichiers à la racine (pas de --delete pour préserver les rules custom du projet)
cp "$SRC_BOILERPLATE/"*.md "$TARGET/"

echo "✓ Rules synchronisées depuis $WS"
echo "  Cible : $TARGET"
