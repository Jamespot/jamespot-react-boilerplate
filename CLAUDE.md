# CLAUDE.md — Jamespot React Boilerplate

Boilerplate pour démarrer une **extension Jamespot externe** en React. À forker et personnaliser pour chaque nouveau projet d'extension. Le projet vit dans son propre dépôt — il n'est pas dans le monorepo principal.

## Structure du projet

```
jamespot-react-boilerplate/
├── .claude/
│   └── rules/                # Règles auto-loaded (auto-load récursif)
│       ├── _shared/          # Universelles
│       ├── ui/               # Composants, styles, accessibilité, navigation, displayer
│       ├── domain/           # Extensions, redux
│       └── *.md              # Spécifiques projet externe (libraries-reexport, scroll-critical, etc.)
├── docs/
│   └── architecture.md       # Documentation de l'architecture
├── production/               # Scripts de build/upload pour la mise en prod
├── src/
│   ├── index.ts              # Point d'entrée — importe les extensions
│   ├── libraries.ts          # Renames default imports : jApi, jCore (voir libraries-reexport.md)
│   └── extensions/
│       ├── SampleRoute/      # Exemple d'extension route-based
│       └── SampleWidget/     # Exemple de widget
├── webpack.config.cjs        # Webpack — externals, port dev, HTTPS
├── eslint.config.js          # ESLint flat config
├── tsconfig.json
├── .prettierrc.json
├── styled-components.d.ts    # Augmentation DefaultTheme
└── externals.d.ts            # Types des externals
```

## Démarrage

```bash
pnpm install --frozen-lockfile
pnpm dev      # webpack-dev-server HTTPS sur https://localhost:3040
```

L'extension se déploie sur une plateforme Jamespot via `pnpm build:theme` puis `pnpm publish:theme` (voir `README.md`).

## Spécificités du boilerplate

- **Dev server** : `https://localhost:3040` (HTTPS obligatoire — la plateforme Jamespot est en HTTPS).
- **Externals webpack** : chargés depuis `jamespot-react-core/externals.json` dans `webpack.config.cjs`. Cela évite que React, Redux, styled-components, etc. soient bundlés dans l'extension — ils sont fournis au runtime par la plateforme.
- **Prettier** : `tabWidth: 2` (différent du monorepo interne qui est en 4). Si l'extension est réintégrée dans le monorepo, prévoir un reformatage.
- **ESLint** : flat config (`eslint.config.js`), sans la règle custom `no-barrel-imports` qui n'existe que dans le monorepo. Les autres conventions d'imports (relatifs, pas de barrel, pas de `import React`, pas d'`export default`) restent et sont documentées dans `.claude/rules/_shared/imports.md`.
- **Pas de Jest** par défaut. Si vous ajoutez des tests, vous définissez votre propre stratégie.
- **TypeScript 5.9+**, **React 19**, **react-router-dom v6**, **react-hook-form v7**, **styled-components v6**.

## Libs Jamespot — où trouver les types

Les 4 packages Jamespot consommés par le boilerplate sont dans `devDependencies` :

| Package | Rôle |
|---|---|
| `jamespot-user-api` | Client HTTP, types TS, schémas Zod (default export = `jApi`) |
| `jamespot-front-business` | Slices Redux partagés (Toast, Application, Hook, etc.) |
| `jamespot-react-components` | Design system (composants UI réutilisables, theme) |
| `jamespot-react-core` | App React, registre de composants, dual router (default export = `jCore`) |

Une fois `pnpm install` joué, ces packages sont installés dans `node_modules/`. Les types sont à consulter directement dans le build distribué :

| À chercher | Chemin (après `pnpm install`) |
|---|---|
| Types et méthodes de `jApi.<domain>` | `node_modules/jamespot-user-api/dist/src/apis/<domain>/<domain>.d.ts` |
| Types Jamespot (`jArticleLittle`, `jObjectLittle`, `jFileLittle`, etc.) | `node_modules/jamespot-user-api/dist/src/types/` |
| Slices et selectors `Toast`, `Application`, etc. | `node_modules/jamespot-front-business/dist/` |
| Types des composants JRC et `ThemeType` | `node_modules/jamespot-react-components/dist/` |
| **Clés du registre** (`getLazyComponent('Name')`) | `node_modules/jamespot-react-core/build/src/registry/ext-component-list.d.ts` |
| **Liste des externals** (libs partagées avec la plateforme) | `node_modules/jamespot-react-core/externals.json` |
| Hooks typés `useAppDispatch`, `useAppSelector` | `node_modules/jamespot-react-core/build/` |

Avant de caster un type ou de réinventer une méthode API, **toujours consulter ces fichiers** — la règle `.claude/rules/_shared/typescript.md` détaille la checklist.

## Auto-loading des rules

Le dossier `.claude/rules/` est **auto-loaded** récursivement par Claude Code au démarrage. Tu n'as rien à faire, les règles sont en contexte.

### Synchronisation depuis le claude-workspace

Pour mettre à jour les règles communes depuis la source canonique (`~/jamespot/claude-workspace`) :

```bash
pnpm sync:rules
```

Le script `script/sync-claude-rules.sh` :

- Copie `_shared/` (sans `_monorepo/`), `ui/`, `domain/` depuis `<workspace>/.claude/rules/frontend/` via `rsync --delete`
- Copie les fichiers de `<workspace>/.claude/docs/boilerplateRules/` à la racine de `.claude/rules/` (sans `--delete` — les règles custom du projet à la racine ne sont pas écrasées)
- Bash + rsync (disponibles partout dans l'équipe). Pour Windows pur, prévoir Git Bash ou WSL.

Override du chemin source via la variable d'env `CLAUDE_WORKSPACE` si l'arbre n'est pas à `~/jamespot/claude-workspace`.

### Règles propres au projet

Ajouter directement de nouveaux `.md` à `.claude/rules/` (un fichier court par règle). Le script de sync ne les touchera pas.

## Voir aussi

- `docs/architecture.md` — architecture détaillée du boilerplate
- `.claude/rules/extension-structure.md` — arbo type d'une extension externe (App.tsx, libraries.ts, services/, pages/)
- `.claude/rules/libraries-reexport.md` — rôle limité de `libraries.ts`
- `.claude/rules/scroll-critical.md` — utilisation obligatoire du composant `Container` du DS
- `README.md` — guide de mise en route et de mise en production
