# Navigation

## Pas de `window.location` dans les composants React

**Ne jamais utiliser `window.location`, `window.history`, ou `document.location` directement.** Utiliser les hooks de react-router-dom.

```tsx
// Correct
const navigate = useNavigate();
navigate('/new-page');                              // navigation SPA
navigate('/same-page?tab=x', { replace: true });    // remplacer l'entrée history

const location = useLocation();
const params = new URLSearchParams(location.search); // lire les params

// Interdit
window.location.href = '/new-page';                // full page reload
window.history.replaceState(null, '', url);          // désynchronise react-router
```

## Pourquoi

- `window.location.href = ...` provoque un **full page reload** — perte de l'état React, des stores Redux, et des connexions WebSocket.
- `window.history.replaceState/pushState` ne déclenche pas les listeners de react-router — l'URL change mais les composants ne re-rendent pas.
- Le routeur gère les transitions, les animations, les scroll restorations.

## Exceptions (avec commentaire obligatoire)

- Navigation vers des pages legacy hors SPA (`/?action=...`)
- Navigation cross-extension depuis un widget sans accès au routeur de la page cible
- Redirect en réponse à un événement serveur (SSE, WebSocket)

## Piège : `useLocation` dans un `useEffect` mount-only

Quand on remplace `window.location.search` par `location.search` dans un `useEffect([], [])`, ajouter `location` aux deps du `useEffect` le déclenche à chaque changement d'URL. Si l'effet doit rester mount-only, utiliser `eslint-disable-next-line react-hooks/exhaustive-deps` avec un commentaire explicatif.
