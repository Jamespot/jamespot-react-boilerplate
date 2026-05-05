# Imports

## Chemins relatifs uniquement

Tous les imports utilisent `./` ou `../`. Les imports absolus (via un alias `src/*` ou équivalent) sont interdits.

```typescript
// OK
import { Foo } from '../components/Foo/Foo';
import { Bar } from './Bar';

// Interdit
import { Foo } from 'src/components/Foo/Foo';
```

## Pas de barrel imports

Importer directement depuis le fichier source, jamais depuis un `index.ts` ou un re-export groupé.

```typescript
// OK
import { JRCButton } from '../components/JRCButton/JRCButton';

// Interdit
import { JRCButton } from '../components';
```

Conséquence : on ne crée pas de fichiers `index.ts` dans les dossiers de composants ou de hooks. Le nom du fichier doit refléter son contenu.

**Exception tolérée** : les rares fichiers `index.ts` qui servent de point d'entrée public d'un package partagé (typiquement les re-exports `src/types/index.ts` ou `src/store/index.ts` des packages consommés en externe) peuvent exister. Ils ne doivent pas proliférer.

## Pas de dépendances circulaires

Les cycles d'import sont interdits. Si un linter détecte un cycle, refactorer en extrayant le code partagé dans un fichier tiers.

## Pas d'`import React`

La configuration TypeScript utilise `jsx: "react-jsx"` (le runtime JSX automatique). Il ne faut **pas** importer `React` globalement, seulement les sous-imports nécessaires :

```typescript
// OK
import { useState, useCallback, type FC } from 'react';

// Interdit
import React, { useState } from 'react';
import * as React from 'react';
```

## Pas d'`export default`

Tous les exports sont nommés, directement à la déclaration.

```typescript
// OK
export const Foo: FC<Props> = (props) => { ... };
export const bar = () => { ... };

// Interdit
const Foo: FC<Props> = (props) => { ... };
export default Foo;

// Interdit aussi
const Foo: FC<Props> = (props) => { ... };
export { Foo };
```

## Imports nommés uniquement

Jamais d'`import X from '...'` (import par défaut). Toujours `import { X } from '...'`.

## Pourquoi ces choix

- Les imports relatifs rendent les déplacements de fichiers explicites (pas de magie de résolution).
- L'interdiction des barrels évite les imports transitifs non contrôlés et réduit la surface de build (tree-shaking plus efficace).
- L'interdiction de l'import `React` et des exports par défaut garantit que chaque symbole a un nom unique et traçable dans toute la base de code. Un grep sur le nom donne la liste exhaustive des usages.
- Ces règles sont un choix pragmatique adopté pour éviter des problèmes réels rencontrés sur le projet. Elles ne sont pas universellement considérées comme « best practice » en dehors de ce contexte.
