# Composants JRC — appel au registre dans chaque composant

## Pas de fichier centralisé

Les appels `jCore.registry.getLazyComponent()` se font **dans chaque fichier qui en a besoin**, en haut du module (hors du composant).

```tsx
// En haut du fichier (niveau module, pas dans le composant)
import { jCore } from '../../../libraries';

const Button = jCore.registry.getLazyComponent('Button');
const Tooltip = jCore.registry.getLazyComponent('Tooltip');

export const MyComponent = () => (
    <Button>Click <Tooltip content="Info">?</Tooltip></Button>
);
```

## Pas de JComponents.tsx

**Ne pas créer** de fichier centralisé listant tous les composants JRC. Chaque composant déclare ses propres dépendances.

## Pourquoi

- **Code splitting** : le bundler crée des chunks par route. Si tous les getLazyComponent sont dans un seul fichier, tous les composants JRC sont chargés d'un coup, même si seule la page liste est affichée.
- **Colocation** : les dépendances d'un composant sont visibles dans son propre fichier, comme n'importe quel import.
- **Maintenance** : ajouter un composant JRC ne nécessite pas de toucher un fichier tiers.

## Vérification des clés

Avant d'ajouter un `getLazyComponent('Name')`, vérifier la clé exacte dans le fichier de déclaration de types du package (`ext-component-list.d.ts`). Certaines clés ont le préfixe `JRC` (ex: `JRCAvatar`, `JRCCommentsBloc`), d'autres non (ex: `Button`, `Modal`). Voir `registry-keys-pitfalls.md` pour les détails.
