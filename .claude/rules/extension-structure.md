# Structure d'une extension externe

Cette règle décrit l'organisation de fichiers attendue pour une extension Jamespot vivant dans son propre dépôt (projet externe).

Elle est spécifique aux projets externes — l'architecture du monorepo interne n'est pas reprise ici.

## Racine du projet

```
front/
├── src/
│   ├── App.tsx                 # Point d'entrée — importe l'extension et la monte
│   ├── libraries.ts            # Renames de default imports uniquement (voir libraries-reexport.md)
│   ├── styled.d.ts             # Augmentation DefaultTheme (voir styled-components.md)
│   └── extensions/
│       └── {Name}/
│           ├── index.tsx               # Bootstrap : traductions + routes
│           ├── routes.tsx              # Enregistrement des routes
│           ├── {Name}.const.ts         # Constantes (clés selon les besoins — voir extensions.md)
│           ├── {Name}Dashboard.tsx     # Wrapper racine avec Container (voir scroll-critical.md)
│           ├── pages/                  # Sous-pages routées (1 fichier = 1 vue)
│           │   ├── ListPage.tsx
│           │   ├── DetailPage.tsx
│           │   ├── CreatePage.tsx
│           │   └── EditPage.tsx
│           ├── hooks/                  # Hooks custom (requêtes, URL sync)
│           ├── services/               # Appels API encapsulés
│           ├── components/
│           │   └── Styled.tsx          # Styled-components partagés du projet
│           ├── translation/            # i18n (lang.json + loader)
│           └── utils/                  # Utilitaires (sanitize, formatters, etc.)
```

## Conventions

- **`index.tsx`** ne contient **pas de JSX**. Il ne fait que :
  1. charger les traductions via `jCore.translation.addResources()`
  2. enregistrer les routes via `jCore.router.addRoute()` ou `jCore.routeAdd()`
  3. enregistrer le store via `jCore.store.add()` si l'extension a un slice Redux
- **`routes.tsx`** est un fichier séparé qui exporte les routes. Garder `index.tsx` minuscule.
- **`{Name}.const.ts`** regroupe les constantes du projet (nom d'application, nom de hook, nom d'extension, route, identifiant d'ancrage DOM, etc. — le jeu exact dépend du type d'extension, voir `extensions.md`). Jamais ces constantes en dur dans les composants.
- **Aucun appel `jApi.*` direct dans les composants**. Tout appel à l'API passe par un fichier dans `services/`. Les composants appellent les services, les services appellent `jApi`. **En revanche**, passer des références `jApi` comme props à des composants JRC qui en ont besoin (ex : `handlers={{ file: jApi.file }}` pour `InputFileAdvancedRaw` ou `CommentsBloc`) est de l'injection de dépendances normale et n'est pas une violation.
- **Composants JRC** : chaque fichier fait ses propres `jCore.registry.getLazyComponent()` en haut du module. Pas de fichier centralisé (voir `jcomponents-centralization.md`).
- **State partagé** : utiliser un slice Redux (pas useReducer + Context) pour le state lu/écrit par plusieurs composants à différents niveaux de l'arbre. Voir `redux.md` pour la guidance.
- **1 page = 1 vue** : si l'extension a plusieurs vues (liste, détail, création, édition), les séparer en composants page dans `pages/`. L'orchestrateur (Dashboard ou routes.tsx) ne fait que du routing.
- **Pas de prop drilling profond**. Les composants reçoivent leurs données via le store Redux ou via des props à deux niveaux maximum.

## Pourquoi ce découpage

Cette structure facilite la réintégration ultérieure de l'extension dans le monorepo principal :
- Les services sont déjà isolés des composants → migration vers des slices Redux simple.
- Le state est déjà dans Redux → pas de migration Context → Redux à faire.
- Les composants JRC sont déjà appelés via le registre → aucun changement au pattern d'accès.
