# Pièges des clés du registre

Quand on récupère un composant via `jCore.registry.getLazyComponent('Name')`, la clé passée en argument **n'est pas toujours** le nom que l'on croit.

## Le piège

Certains composants ont leur clé de registre préfixée par `JRC`, d'autres non. Il n'y a pas de convention homogène — c'est à connaître au cas par cas.

Exemples observés :

| Clé réelle | Clé intuitive (fausse) |
|---|---|
| `JRCAvatar` | ~~`Avatar`~~ |
| `JRCCommentsBloc` | ~~`CommentsBloc`~~ |
| `Button` | (pas de préfixe ici) |
| `Modal` | (pas de préfixe ici) |

Passer une mauvaise clé ne fait **pas** échouer le code avec une erreur claire : le registre renvoie un composant de fallback vide, et en mode développement un `console.error` est émis. En production, le composant apparaît vide à l'écran sans message visible.

## Règle

**Toujours vérifier la clé exacte** dans le fichier de déclaration de types du package Jamespot qui fournit le registre, avant d'ajouter un `getLazyComponent()`.

Le fichier à consulter est typiquement `ext-component-list.d.ts` dans le build du package consommé. Ouvrir ce fichier, chercher le composant, copier-coller la clé **exactement**.

En cas de doute :

1. Chercher la clé sans préfixe (`Avatar`)
2. Si elle n'existe pas, chercher avec le préfixe (`JRCAvatar`)
3. Si elle n'existe toujours pas, demander à quelqu'un — ne **pas** inventer la clé.

## Pourquoi ce piège existe

Le design system interne a évolué dans le temps : certains composants ont été créés avant l'adoption du préfixe `JRC`, d'autres après. Les composants renommés ont gardé leur clé historique pour ne pas casser les consommateurs existants. Le résultat est un mélange hétérogène qu'il faut accepter et documenter.
