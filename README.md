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

Pour accéder à l'extension qui tourne sur votre serveur local sur votre plateforme, il est nécessaire d'installer et activer l'application "Extension UI React" via le gestionnaire d'applications (nécessite l'action d'un administrateur de plateforme) et de renseigner l'url http://localhost:3041. Une fois la configuration faite, vous pourrez accéder à votre application en suivant l'url : https;//<plateforme-url>/ng/rr/boilerplate/demo

## Accès à l'application en développement

**[Créer une plateforme de test](https://launch.jamespot.com/?utm_source=jamespot.io&utm_medium=react&utm_campaign=documentation) Jamespot**. Installez et configurer l'application "Extension UI React" :

-   cliquer sur le menu utilisateur > administration > applications
-   Installer l'application "Extension UI React"
-   Activer l'application et renseigner l'url http://localhost:3041 puis enregistrer

Après avoir lancé le serveur webpack (étape précédente), vous devriez avoir accès à votre application à l'url suivante : https://<plateforme>/ng/rr/

## Mise en production de l'application

Coming later

```shell
# build project
npm run build
```
