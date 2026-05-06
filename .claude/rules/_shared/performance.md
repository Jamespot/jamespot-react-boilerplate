# Performance

Pièges de re-render et de fetch dupliqué qui coûtent cher en production.

## Pas d'objet Redux entier dans les deps d'un hook React

Avec Redux Toolkit / Immer, **chaque action produit un nouveau state** même quand le champ lu n'a pas changé. Mettre `state` en deps de `useEffect`, `useCallback` ou `useMemo` re-déclenche le hook sur n'importe quelle mutation.

```tsx
// Interdit — state change à chaque action Redux
useEffect(() => { doFetch(state); }, [state]);

// OK — champs scalaires uniquement
useEffect(() => { doFetch(state); }, [state.tab, state.filters.query, state.sort, state.page]);

// OK aussi — clef string dérivée quand les champs sont nombreux ou contiennent des arrays
const fetchKey = `${state.tab}|${state.filters.keywords.join(',')}|${state.sort}|${state.page}`;
useEffect(() => { doFetch(state); }, [fetchKey]);
```

Pour les **tableaux/objets** dans le state (ex. `state.filters.keywords`), les sérialiser dans une clef string — les inclure tels quels casse la comparaison par référence de `useEffect`.

## Pas de `data` fetchée dans les deps d'un effet qui refetch

Classique : un effet annexe dépend de la donnée principale, chaque fetch principal refetch les données annexes.

```tsx
// Interdit — cascade infinie : fetch → data change → refetch annexe → re-render
useEffect(() => { loadCounts(groupId); }, [data, groupId]);

// OK — les compteurs ne dépendent que du scope
useEffect(() => { loadCounts(groupId); }, [groupId]);
```

Les paramètres d'un fetch sont ses **entrées** (groupId, filtres, tab), pas ses **sorties** (data, error).

## Un seul système de trigger par fetch

Ne pas mélanger un flag `shouldFetch` et une dep sur `state`. Choisir **une** source de vérité :

- **Pilotage par state Redux** (recommandé) : le `useEffect` écoute les champs scalaires. Tout handler qui dispatch une action déclenche mécaniquement le refetch.
- **Pilotage par flag explicite** : le `useEffect` n'écoute que le flag, reset à `false` après chaque fetch. Utile pour les fetch on-demand (retry, bouton refresh).

Le double pilotage cause des requêtes dupliquées (changement de state + flag remis à `true` = 2 triggers).

## `AbortController` pour tout fetch re-déclenchable

Si un fetch peut être re-déclenché (changement de filtre, retry, navigation), il doit abort l'ancien avant d'en lancer un nouveau. Sinon deux réponses peuvent arriver dans le désordre et écraser la bonne.

```tsx
const abortRef = useRef<AbortController | null>(null);

const doFetch = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const data = await fetchX(params, controller.signal);
    // ...
}, []);
```

## `eslint-disable-next-line react-hooks/exhaustive-deps` = signal d'alarme

Avant d'ajouter ce disable, identifier **pourquoi** la dep pose problème :

| Cause | Solution |
|-------|----------|
| Dep instable (objet/array recréé à chaque render) | Mémoïzer en amont (`useMemo`) ou extraire un scalaire |
| Dep qui déclenche une boucle de fetch | Utiliser une ref lue dans la closure, pas une dep |
| Effet voulu mount-only | Deps vides `[]` + commentaire explicite |
| On veut "ignorer" les changements de X | Bug — si X change, la logique est incorrecte |

Masquer le warning sans comprendre la cause introduit presque toujours un bug de données stales.

## Selectors Redux : pas de création d'objet à chaque call

Un selector qui retourne un **nouveau** tableau/objet à chaque appel fait re-render tous les composants consommateurs à chaque action :

```tsx
// Interdit — nouveau tableau à chaque call, re-render garanti
const selectActiveItems = (state: RootState) => state.items.filter(i => i.active);

// OK — selector identity, filtrage mémoïzé dans le composant
const selectItems = (state: RootState) => state.items;
const items = useAppSelector(selectItems);
const activeItems = useMemo(() => items.filter(i => i.active), [items]);

// OK — createSelector de Redux Toolkit (mémoïzation intégrée)
const selectActiveItems = createSelector([selectItems], items => items.filter(i => i.active));
```

## `useCallback` deps : primitives > objets

Un handler qui dépend d'un objet du state (`state.filters`) se recrée à chaque action Redux, même si les valeurs des champs n'ont pas changé. Conséquence : tous les composants enfants qui reçoivent ce handler re-render.

```tsx
// Instable — state.filters est un nouvel objet à chaque action Redux
const handleChange = useCallback((v) => {
    dispatch(apply({ ...state.filters, status: v }));
}, [dispatch, state.filters]);

// Stable — lire via ref, deps primitives
const filtersRef = useRef(state.filters);
filtersRef.current = state.filters;
const handleChange = useCallback((v) => {
    dispatch(apply({ ...filtersRef.current, status: v }));
}, [dispatch]);
```

Ce pattern n'est justifié que si le handler est passé à un composant memoïzé (`React.memo`) ou comme dep d'un autre hook — sinon la micro-optimisation ne vaut pas la complexité.
