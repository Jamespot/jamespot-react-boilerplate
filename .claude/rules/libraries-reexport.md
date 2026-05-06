# Re-export centralisé via `libraries.ts`

## Rôle limité

`libraries.ts` ne sert qu'à **renommer les imports default** des packages Jamespot dont l'export par défaut est un namespace global.

```typescript
// src/libraries.ts — UNIQUEMENT des renames de default imports
import JamespotUserApi from 'jamespot-user-api';
import JRCore from 'jamespot-react-core';

export const jApi = JamespotUserApi;
export const jCore = JRCore;
```

## Tout le reste s'importe directement depuis le package source

```typescript
// Correct — import direct depuis le package
import { Toast, Application } from 'jamespot-front-business';
import { useDisplay, useAppDispatch } from 'jamespot-react-core';
import type { jFileLittle } from 'jamespot-user-api';

// Incorrect — ne PAS re-exporter dans libraries.ts
import { Toast } from '../../libraries';       // ❌
import { useDisplay } from '../../libraries';   // ❌
import { useAppDispatch } from '../../libraries'; // ❌
```

## Ce qui va dans libraries.ts

| OK | Pas OK |
|----|--------|
| `jApi` (rename de default) | `Toast` (named export) |
| `jCore` (rename de default) | `useDisplay` (named export) |
| | `useAppDispatch` (named export) |
| | Types (import directement) |
| | Helpers custom (`toastError`, etc.) |

## Pourquoi

- **Traçabilité** : `import { Toast } from 'jamespot-front-business'` dit clairement d'où vient Toast. `import { Toast } from '../../libraries'` le masque.
- **Tree-shaking** : le bundler ne peut pas éliminer les exports inutilisés d'un fichier qui re-exporte tout.
- **Simplicité** : un fichier qui ne fait que 2 renames est trivial à maintenir.
