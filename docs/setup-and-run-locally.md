# Mise en place d'un environnement React

## Pré-requis
--------------------
- Node 16+
- npm 7+

## I. Initialisation des projets react
--------------------

### Cloner les repos
Mettre les dépôts suivants dans un même répertoire : 
```
git clone git@github.com:Jamespot/jamespot-react-core.git
git clone git@github.com:Jamespot/jamespot-user-api.git
git clone git@github.com:Jamespot/jamespot-react-components.git
git clone git@github.com:Jamespot/jamespot-react-extensions.git

ou

git clone https://github.com/Jamespot/jamespot-react-core.git
git clone https://github.com/Jamespot/jamespot-user-api.git
git clone https://github.com/Jamespot/jamespot-react-components.git
git clone https://github.com/Jamespot/jamespot-react-extensions.git


```

### Préparer les projets
Installer les dépendances et faire le build.

```
cd jamespot-user-api
npm ci
npm run build
cd ..

cd jamespot-react-components
npm ci
npm run build
cd ..

cd jamespot-react-core
npm ci
npm run build
cd ..

cd jamespot-react-extensions
npm ci
npm run build
cd ..
```

Utilisation de `npm ci` pour :
- assurer que chaque dev installe bien les versions du package-lock.js
- éviter que le package-lock.json soit modifié par les dev

## II. Run de l'environnement local
----------------------------

### Lancer le core
```
cd jamespot-react-core
npm run local
```

### Lancer les extensions
```
cd jamespot-react-extensions
npm run local
```

### lancer les projets react core et extensions

#### configurer une plateforme Solidarity

Voir fichier docs/plateforme_de_dev.md

#### core
```
cd jamespot-react-core
npm run local
```

#### extensions
```
cd jamespot-react-extensions
npm run local
```

# IV. Lancer storybook
----------------------------
```
cd jamespot-react-components
npm run storybook
```

# V. Lancer 2 projets en plus (boilerplate et appstudio)
----------------------------
En complément de `core` et `extension`, voici comment lancer d'autre projets react. 

## Clone + install repos
```
git clone https://github.com/Jamespot/jamespot-react-appstudio.git
git clone https://github.com/Jamespot/jamespot-react-boilerplate.git

cd jamespot-react-appstudio
npm install
cd ..

cd jamespot-react-boilerplate
npm install
cd ..
```

## Lancer boilerplate
```
cd jamespot-react-boilerplate
npm run local
```

## Lancer appstudio
```
cd jamespot-react-appstudio
npm run local
```

## Config proxy
Le proxy doit inclure des règles sur les routes `/react-boilerplate` et `/react-appstudio`

## config plateforme
Il faut indiquer à la plateforme de charger les 2 nouveaux bundles.
- Accéder à la page `https://jamespot.proxy:3443/admin/index.php?screen=custom`
- Dans le champs `Bloc HTML de pied de page` ajouter :
```
<script src="/react-appstudio/app.bundle.js"></script>
<script src="/react-boilerplate/app.bundle.js"></script>
```


# Divers
--------------------

## config webpack des projets 
Le fichier `webpack.config.js` inclut la config de build et de server local pour le dev.

Des conditions permettent des config différentes (exemple : local vs dev)

Les élements suivants peuvent être modifier suivant votre contexte :
- `public`
- `publicPath`
- `config.devServer.public`
- `config.output.publicPath`
- ...

## components build-dev
Suivant votre contexte vous pouvez lancer différement les projets. 

(exemple `npm run build-dev` dans le projet components)


# En cas de problème
--------------------

#### npm install qui ne passe pas
supprimer le `package-lock.json` et `node_modules` puis relancer `npm install`
