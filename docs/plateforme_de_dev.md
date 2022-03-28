# Mise en place d'un environnement de dev React

## Création d'une plateforme de test

Une plateforme de test est ... Solidarity...
Pour créer une nouvelle plateforme :
1. Créer une plateforme sur la metaadmin de solidarity: [lien](https://solidarity0203-1.jamespot.pro/metaadmin/mvc.php?path=/login)
	1. Le project name correspond à l'url de la plateforme
	2. Laisser BaseLine vide
	3. Renseigner l'email, le nom, le prénom et le mot de passe (règle de sécurité)
	4. Renseigner Vertical a "unit-test" (cela importe des données qui sont nécessaires pour jouer les tests selenium)
2. Consulter la plateforme et importer les utilisateurs (fichier csv dans le projet [branches](https://github.com/Jamespot/branches)
3. Vérifier que la plateforme est disponible en allant sur l'url dans la page de détail de la plateforme

## Déployer une version sur la plateforme
Créer et commiter une entrée dans le fichier branches.json du projet [branches](https://github.com/Jamespot/branches) en suivant le modèle des autres branches. Il est nécessaire de renseigner le nom de branche des projets react et du projet j-pro. Pour Jamespot-pro, indiquez un nom générique, par exemple "plateforme-maxime". Ce nom sera utiliser pour créer l'url de la plateforme.

La création de l'entrée dans le fichier (et toute modification ultérieure) va lancer un déploiement.

Après 5 minutes, à la fin du déploiement, le [fichier de suivi des déploiements](https://github.com/Jamespot/MEP-branches/blob/master/code/deployed) est mise à jour automatiquement. Cela signifie que la plateforme est déployée et est accessible par l'url indiqué dans le fichier. Attendre quelques minutes si une erreur 503 apparait.

Il se peut qu'il faille changer le mdp de l'utilisateur via la metaadmin.

## Activer le mode de développement
1. Se rendre sur la plateforme et se connecter puis renseigner à la fin de l'url /admin (...jamespot.pro/admin/)
2. Aller dans "Advanced" > "Modules"
3. Ajouter dans l'url "&advanced=true"
4. Ajouter une entrée dans "Custom hooks" :
	1. JDevHook
	2. JDevHook
	3. jamespot/jpro/hooks/platform/JDevHook.i.php
	4. "Jamespot\Jpro\Hooks" (avec les guillemets)

## Installer le Hook de dev
1. Aller dans le gestionnaire d'application
2. Installer Jamespot DevHook
3. Option 1) Vous développez complétement en local avec l'ensemble du projet react-extentions .Passer le Hook et renseigner dans les deux champs pour récupérer le build en local puis valider :
* http://localhost:3030
* http://localhost:3040
* laisser le dernier champs vide
3. Option 3) Vous développez uniquement sur votre projet de manière indépendance. Passer le Hook et renseigner dans les trois champs pour récupérer le build en local puis valider :
* /react-core
* /react-extensions
* http://localhost:3041

Les développements React sont maintenant accessibles en ajoutant les deux paramètres à l'url : ?debug_REACT_USE_LOCAL=1 dès la fin du nom de domaine (ex: https://jpro-gitbranch-feature-qa-group.jamespot.pro/?debug_REACT_USE_LOCAL=1). Cela met en cache deux variables qui indiquent de charger le bundle react. Il est alors possible de naviguer dans l'application.
