# Extensions

## Accès aux briques partagées

- `jApi` et `jCore` via `libraries.ts` (renames de default imports) :
  ```typescript
  import { jApi, jCore } from '../../libraries';
  ```
- Tout le reste directement depuis le package source (voir `libraries-reexport.md` dans `.claude/rules/`) :
  ```typescript
  import { Toast, Application } from 'jamespot-front-business';
  import { useAppDispatch } from 'jamespot-react-core';
  import type { jFileLittle } from 'jamespot-user-api';
  ```

## Patterns d'enregistrement

### Route simple (le plus courant)

```typescript
const app = Application.selectors.selectById(jCore.store.getState(), MODULE_NAME);
if (app) {
  jCore.extensionAdd(name, () => import('./App'));
  jCore.routeAdd(route, name, anchor);
}
```

### Route + Store + Router (monorepo interne)

```typescript
jCore.store.add(Domain.slice.name, Domain.slice.reducer);
jCore.router.addRoute({
  path: route,
  element: <React.Suspense fallback={<></>}><Layout /></React.Suspense>,
  children: [...routes],
});
```

### Route + Store (extension externe)

Pour les extensions externes, utiliser `addExtensionStore` (pas `store.add`) — `store.add` est typé contre un union fixe `AsyncReducers` qui ne contient que les slices connus du monorepo :

```typescript
jCore.store.addExtensionStore(MySlice.slice.name, MySlice.slice.reducer);
jCore.router.addRoute({ path: route, element: <Layout /> });
```

### Widget bridge

```typescript
jCore.extensionAdd('WidgetName', () => import('./WidgetNameApp'));
```

Le composant App utilise `createExtension({ getAnchorId, component })` pour le mapping des props.

## Guard d'existence

Toute extension qui dépend d'une application doit vérifier son existence :

```typescript
// À l'enregistrement (index.tsx)
const app = Application.selectors.selectById(jCore.store.getState(), MODULE_NAME);
if (app) { /* enregistrer */ }

// Dans un composant
const app = useAppSelector(state => Application.selectors.selectById(state, MODULE_NAME));
if (!app) return <Navigate to="/ng/rr/404" />;
```

Les hooks (`Hook.selectors.selectHook`) déterminent les features ou routes disponibles :

```typescript
const hook = useAppSelector(state => Hook.selectors.selectHook(state, MODULE_NAME));
const routes = hook.allowAllDocuments ? allRoutes : myRoutes;
```

## Nettoyage au unmount

Les widgets doivent nettoyer leur état éditeur :

```typescript
useEffect(() => {
  return () => {
    if (uniqid) dispatch(WidgetEditor.slice.actions.flushEditor({ uniqid }));
  };
}, [dispatch, uniqid]);
```

## Traductions

Chaque extension charge ses traductions dans son `index.tsx` :

```typescript
import lang from './translation/lang.json';
jCore.translation.addResources(lang);
```

Voir `i18n.md` pour les conventions de clés.

## Constantes

Regroupées dans `{Name}.const.ts`. Le jeu de clés **varie selon le type d'extension** — inclure uniquement ce dont l'extension a besoin :

| Clé | Utilité | Exemple |
|-----|---------|---------|
| `appName` | ID passé à `Application.selectors.selectById` pour le guard d'existence | `'questionanswers'` |
| `moduleName` | ID passé à `Hook.selectors.selectHook` pour lire les features activées | `'questionAnswersHook'` |
| `extensionName` | Nom d'enregistrement via `jCore.extensionAdd(...)` (widgets, app legacy) | `'my-widget'` |
| `idAnchor` | Identifiant DOM pour les widgets qui se montent sur une ancre | `'my-widget-anchor'` |
| `route` | Route principale de l'extension | `'qr2026'` |
| `widgetRoute` | Route secondaire dédiée à un widget | `'qr2026-widget'` |

Exemple typique pour une extension qui dépend d'une Application et d'un Hook :

```typescript
export const MyExtConst = {
  appName: 'myapp',
  moduleName: 'myAppHook',
  route: 'my-ext',
};
```

Exemple pour un widget monté sur une ancre DOM :

```typescript
export const MyWidgetConst = {
  extensionName: 'my-widget',
  idAnchor: 'my-widget-anchor',
};
```

Jamais ces valeurs en dur dans les composants ou les appels.
