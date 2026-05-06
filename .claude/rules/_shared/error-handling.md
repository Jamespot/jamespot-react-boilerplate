# Gestion d'erreurs

## Codes d'erreur API

La couche réseau utilise un code numérique :

| Code | Signification |
|------|--------------|
| `error === 0` | Succès |
| `error > 0` | Erreur applicative → `{ error, errorMsg, messages }` |
| `error === -1` | Requête annulée (AbortSignal) → `{ error: -1, aborted: true }` |

## Pattern standard dans les thunks Redux

```typescript
try {
  const res = await extra.jApi.domain.method(args);
  return res.result;  // Extraire .result, pas le wrapper complet
} catch (error: unknown) {
  if (!isAbortError(error)) {
    dispatch(Toast.actions.error({ label: getErrorMessage(error) }));
  }
  return rejectWithValue({ error: 1, errorMsg: 'Message utilisateur' });
}
```

Règles :
- **Toujours** extraire `.result` du wrapper `ApiWrapper<T>` dans le thunk — le state Redux ne stocke pas le wrapper.
- **Toujours** vérifier `isAbortError()` avant de logger ou afficher une erreur — un abort n'est pas une erreur.
- **Toujours** afficher un Toast d'erreur pour les erreurs non-abort.
- **Toujours** `rejectWithValue()` pour que le slice puisse réagir dans `rejected`.

## Utilitaires

```typescript
import { isAbortError, getErrorMessage } from '../../utils/errors.utils';
```

- `isAbortError(error)` — détecte les erreurs d'annulation (`{ aborted: true }`).
- `getErrorMessage(error, defaultMsg?)` — extrait `errorMsg`, puis `message`, puis le défaut.

## Catch silencieux

Pour les opérations non-critiques où l'échec est attendu ou acceptable :

```typescript
try {
  window.localStorage.setItem(key, JSON.stringify(value));
} catch (_err) {
  // Silencieux — quota localStorage dépassé, pas critique
}
```

Utiliser uniquement quand l'échec n'a pas d'impact fonctionnel (localStorage, analytics, etc.). Toujours préfixer la variable avec `_` et commenter pourquoi le catch est silencieux.

## AbortSignal

Les méthodes API acceptent `signal?: AbortSignal` pour permettre l'annulation :

```typescript
const controller = new AbortController();
const res = await jApi.calendar.listEvents(params, { signal: controller.signal });
// controller.abort() annule la requête
```

Un hook utilitaire (`useAbortController`) gère automatiquement l'abort au unmount du composant qui le consomme.

## Règle du Toast

Les notifications utilisateur passent **toujours** par le système Toast partagé (`Toast.actions.success`, `Toast.actions.error`, etc.). Jamais d'`alert()` natif, jamais de message inline custom reconstitué à la main dans chaque composant.
