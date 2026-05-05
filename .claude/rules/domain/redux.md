# Redux (State Management)

## Outillage

Redux Toolkit obligatoire. Pas de Redux vanilla.

## Pattern Domain Export

Chaque domaine expose un objet unique qui regroupe slice, actions, et selectors :

```typescript
export const Calendar = {
  slice: calendarSlice,
  actions: { fetchEvents, updateEvent, ...calendarSlice.actions },
  selectors: { selectEvents, selectLoading },
  getRTHandlers?: getCalendarRTHandlers,  // optionnel — WebSocket
};
```

Ce pattern est la convention principale. Il permet un point d'accès unique par domaine.

## `ThunkApiConfig`

Toujours utiliser `ThunkApiConfig` comme troisième générique de `createAsyncThunk`. Il fournit le typage pour `state`, `dispatch`, et `extra.jApi` :

```typescript
export const fetchData = createAsyncThunk<
  ReturnType,
  ArgsType,
  ThunkApiConfig          // Toujours présent
>('domain/fetchData', async (args, { extra }) => {
  return await extra.jApi.domain.method(args);
});
```

L'API est injectée via le middleware thunk (`extraArgument: { jApi }`). Ne **jamais** importer `jApi` directement dans les actions — toujours passer par `extra`.

## Types d'état

```typescript
type DomainState = {
  loading: 'idle' | 'pending';  // Pas de boolean, string literal
  data: DataType | null;
};

type DomainRootState = {
  domain: DomainState;
};
```

Le loading utilise des string literals (`'idle' | 'pending'`), pas des booléens. Cela permet d'étendre les états si besoin (ex: `'failed'`).

## Gestion des erreurs dans les thunks

Voir `error-handling.md` pour le pattern complet. En résumé : extraire `.result` du wrapper, vérifier `isAbortError()`, afficher un Toast, puis `rejectWithValue()`.

## Entity Adapter

Utilisé pour les domaines avec des collections d'entités identifiées :

```typescript
const adapter = createEntityAdapter<EntityType, string>({
  selectId: (entity) => entity.name,
});
```

## Reducers asynchrones

Le store supporte l'ajout dynamique de reducers :

```typescript
store.add('calendar', Calendar.slice.reducer, 'app-calendar');
store.addExtensionStore('searchBar', SearchBarReducer, 'app-search');
```

Les slices du package métier sont chargés à la demande. Les extensions ajoutent leurs propres reducers via `addExtensionStore`.

## Pourquoi ce pattern

Le Domain Export est un choix d'équipe. L'alternative (exporter slice, actions, selectors séparément) est valide mais crée de la fragmentation dans un contexte avec plusieurs contributeurs. L'objet unique force la colocalisation.
