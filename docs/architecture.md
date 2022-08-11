# Architecture de Jamespot React Boilerplate

## Introduction

Au sein d'une plateforme Jamespot, un environnement React tourne côté navigateur et permet d'executer des applications
développées avec le projet Jamespot React Boilerplate (JRB) se basant sur la stack React Jamespot.

La stack React Jamespot est composée des projets suivants :

-   [jamespot-user-api](https://www.npmjs.com/package/jamespot-user-api) : utilitaire permettant de faire appel à l'api jamespot
-   [jamespot-react-component](https://www.npmjs.com/package/jamespot-react-components) : bibliothèque de composants graphiques
-   [jamespot-react-core](https://www.npmjs.com/package/jamespot-react-core) : instantie react et les différentes librairies utilisées

Ces trois projets sont en dépendances de JRB et sont disponibles publiquement sur npmjs. Elles seront installées et
devront être utilisées pour les développements.

## Présentation des librairies utilisées

<!-- TODO add configuration location / use -->

|     Librairie     |    Usage    | Description                                                                                       |
| :---------------: | :---------: | :------------------------------------------------------------------------------------------------ |
|  Babel & Webpack  |   bundle    | bundle des projets                                                                                |
|         -         |    React    | Framework                                                                                         |
|         -         | Typescript  | Le projet est typé avec Typescript                                                                |
| React Router Dom  |   router    | mise en place des routes                                                                          |
|   Redux Toolkit   | store Redux | gestion du store de l'application. Elle peut être utilisée avec Redux DevTools dans le navigateur |
|       Redux       | store Redux | nous avons déprécié son usage. Préférer Redux Toolkit                                             |
|  React Hook Form  | formulaires | gestion des formulaires (validation, manipulation, gestion des erreurs, etc.)                     |
|    Redux Form     | formulaires | nous avons déprécié son usage. Préférer React Hook Form                                           |
| Styled Components |     css     | stylisation css                                                                                   |
|    React-intl     | traductions | gestion des clés de traduction                                                                    |
| Eslint / Prettier |   qualité   | style de code Prettier                                                                            |

## Architecture du code JRB

Sous src/extensions se trouve le code des extensions.

> extension : une ou plusieurs application React avec un scope fonctionnel défini.

Exemple : les favoris contiennent 2 extensions :

-   la modal présente dans le menu utilisateur
-   la page classique avec vue tableau.

Ces deux extensions partagent un store commun.

-   src/extensions/[MonApp]/index.tsx : déclare les routes, le(s) extension(s) et éventuellement le reducer associé
-   src/extensions/[MonApp]/Layout/ : componsants de types Layout ou Routes
-   src/extensions/[MonApp]/components/ : composants
-   src/extensions/[MonApp]/redux/ : reducers
-   src/extensions/[MonApp]/translation/ : traductions

## Instantiation d'une extension

Pour initialiser une extension, il suffit d'ajouter des routes via le router react-router-dom encapsulé dans jamespot-react-core : `JRCore.router.addRoute()`

## Utilisation du framework jamespot-user-api

La documentation de jamespot-user-api est disponible dans la librairie elle-même sous : "nodes_modules/jamespot-user-api/documentation/index.htm".

L'api peut être appelé comme suit:

```typescript
import jamespot from 'jamespot-user-api';
import type { Little } from 'jamespot-user-api';

type ArticleType = Little & {
    // custom article type
}

jamespot.article.get<ArticleType>({ uri: "article/325" }).then((article) => {
    ...
});
```

> Remarque : les objets Jamespot étendent le type minimum `Little`.

> Remarque 2 : les API de création / modification / suppression sont protégés par un token CSRF. La récupération du token est géré par la librairie jamespot-user-api.

> Remarque 3 : il est conseillé d'utiliser jamespot-user-api avec la librairie redux-toolkit autant que possible. Cela facilite et uniformise le workflow des appels api. Un exemple est disponible dans le projet Demo.

## Utilisation du framework jamespot-react-components

Les composants peuvent être visualisés au sein du Storybook. Celui-ci est généré est disponible dans la librie elle-même sous : "nodes_modules/jamespot-react-components/storybook-static/index.html"

Les composants doivent être importés via la registry :

```typescript
import { JRCButtonProps } from 'jamespot-react-components';
import JRCore from 'jamespot-react-core';

const TemplateTwoColumns = JRCore.registry.getLazyComponent<JRCButtonProps>('Button');

export function Component() {
    return <Button>mon beau bouton</Button>;
}
```

La registry permet de charger les composants dynamiquement.
