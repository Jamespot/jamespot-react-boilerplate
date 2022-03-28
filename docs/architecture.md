
# Architecture React
L'architecture mise en place permet d'executer plusieures applications React au sein de Jamespot.
Pour cela, nous utilisons plusieurs projets:
- jamespot-react-core : Ce projet est chargé sur toutes les pages. Il permet d'initialiser l'univers React et de partager un ensemble d'éléments entre toutes les applications (routes, store, components).
- Les projets d'application (cf boilerplate) : Les projets d'application instancient une application dans l'univers React. Ils consomment les services fournis par jamespot-react-core.
- jamespot-react-component : C'est une bibliothèque de composants graphiques. Chaque composant est enregistré dans la registry, le core. Les applications peuvent consommer les composants en faisant appel à la registry. Il est possible de créer plusieurs bibliothèques de composants.
- jamespot-user-api : Utilitaires permettant de faire appel à l'api jamespot.

# Description de l'architecture d'un projet d'application

Ce projet npm à une structure classique avec les fichiers de conf à la racine (package.json, tsconfig, webpack, jest...).

Le fichier src/App.tsx est notre point d'entré du projet. Ce fichier déclare l'objet qui va référencer Core et chacune des Applications.
Cet objet sera exposé dans le front pour maitriser le chargement des applications et initialiser l'environnement JS (langue, ressources...).

## Extension
***

Dans le répertoire src/extensions, pour chaque application nous allons créer un répertoire dédié.
Dans ce répertoire il y aura la structure suivante :

- src/extensions/[MonApp]/[MonApp].app.tsx : Fichier chargé par /src/App.tsx et qui permey de charger l'application,
- src/extensions/[MonApp]/.tsx : Déclare la route et la charge,
- src/extensions/[MonApp]/components/ : Repertoire contenant components,
- src/extensions/[MonApp]/actions/ : Repertoire contenant les actions,
- src/extensions/[MonApp]/reducer/ : Repertoire contenant le reducer et les selectors,
- src/extensions/[MonApp]/translation/ : Fichier de traduction.


# Librairies utilisées dans l'application :

- Install webpack + react + typescript
    https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

- Install Jest :
    - https://jestjs.io/docs/en/tutorial-react
    - https://www.robinwieruch.de/react-testing-jest
    - https://basarat.gitbooks.io/typescript/docs/testing/jest.html

- Install Enzyme :
    - https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675

- Install storybook
    - https://storybook.js.org/docs/guides/guide-react/
    - Storybook with type https://medium.com/@dandobusiness/setting-up-a-react-typescript-storybook-project-5e4e9f540568

- Absolute path
    - https://medium.com/hackernoon/absolute-imports-with-create-react-app-4c6cfb66c35d
    - In __tests__ the tsconfig add @src to import in absolute

