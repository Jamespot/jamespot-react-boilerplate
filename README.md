# Jamespot React Boilerplate

## Présentation

Ce projet permet de créer une nouvelle application Jamespot en react. Celle-ci pourra être intégré à votre plateforme. Vous pourrez ainsi développer votre application Jamespot en toute autonomie !

Vous pouvez retrouver la documentation relative à l'univers React Jamespot dans le repertoire `docs`.

## Architecture

L'architecture est présentée dans le document [docs/architecture.md](docs/architecture.md).

Une extension de démonstration est disponible sur ce projet. N'hésitez pas à la consulter et la modifier.

## Lancement du projet

Le projet nécessite Node 16 et NPM 7.

> Remarque : Le projet ne build pas à partir de la version NPM 8.7

1. cloner le projet
2. installer les dépendances
3. Lancer le "serveur webpack"

```shell
git clone https://github.com/Jamespot/jamespot-react-boilerplate
npm ci

# launch webpack dev server
npm run local
```

## Accès à l'application en développement

**[Créer une plateforme de test](https://launch.jamespot.com/?utm_source=jamespot.io&utm_medium=react&utm_campaign=documentation) Jamespot**. Installez et configurer l'application "Extension UI React" :

-   cliquer sur le menu utilisateur > administration > applications
-   Installer l'application "Extension UI React"
-   Activer l'application et renseigner l'url http://localhost:3041 puis enregistrer

Après avoir lancé le serveur webpack (étape précédente), vous devriez avoir accès à votre application à l'url suivante : https://< plateforme-url >/ng/rr/boilerplate/demo

## Mise en production de l'application

Pour la livraison de votre extension, il faudra produire le bundle javascript et l'uploader sur la plateforme destination. Cela place votre plateforme dans le thème "React JS" qui contiendra votre bundle.

Pour cela vous devrez :
- produire le bundle : `npm run build`
- renseigner les variables dans le script `production/make.sh`
- utiliser le script `production/make.sh`. Cela upload votre bundle, crée le thème "React JS"  qui va contenir votre bundle, et paramètre la plateforme pour utiliser ce thème.
- paramétrer l'application "Extension UI React" pour déclarer que l'extension est disponible à l'adresse suivante : `/themes/EXT-reactjs/js/jamespot-react-extensions`

L'application devrait maintenant être disponible !
