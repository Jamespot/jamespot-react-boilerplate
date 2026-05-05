# Pas de `console.log` dans le code commité

## Règle

`console.log` est interdit dans le code commité. Seuls `console.warn` et `console.error` sont autorisés — pour signaler un avertissement ou une erreur réelle.

## Application ESLint

```js
// eslint.config.js (extrait)
'no-console': ['error', { allow: ['warn', 'error'] }]
```

## Pourquoi

- Un `console.log` oublié pollue la console du navigateur en production. Sur une plateforme avec beaucoup d'extensions cohabitant, le bruit s'accumule vite.
- Risque de leak d'information (objets utilisateur, payloads d'API, tokens) sans s'en rendre compte.
- En tant que rule de discipline, force à utiliser le **debugger** ou un mécanisme de log structuré pour le débogage, et à nettoyer après soi.

## Pour déboguer pendant le développement

Utiliser `console.warn` ou `console.error` localement, ou passer par les outils du navigateur (breakpoints, watch). Si un log doit rester dans le code, c'est qu'il signale une condition réelle (`console.warn` pour un état inattendu mais récupérable, `console.error` pour une erreur effective) — pas un message de débogage qu'on a oublié de retirer.
