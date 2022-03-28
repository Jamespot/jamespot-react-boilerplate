
# Convention de nommage des fichiers

Pour une meilleure lisibilité de quel fichier je suis en train d'éditer, le nommage est important !
C'est pour cela que dans les projets react, il est souvent mis en avant de mettre en suffixe ce que représente le fichier.
En effet, il y a souvent le même nom qui ressort pour cet ensemble à plusieurs niveaux: Screen, Component, Utils, Actions, Reducer...
Donc, cela peux ce traduire comme ceci :

- Hello.screen.tsx : Ecran général appelant un wrapper. Nous ajoutons le template de page dans ce fichier.
- Hello.wrapper.tsx : Englobe un ou plusieurs composants, map les actions, le reducer, les traductions pour que les composants puissent se concentrer uniquement sur l'affichage.
- Hello.component.tsx : React component.
- Hello.utils.tsx : Object utils
- Hello.reducer.tsx : Redux reducer
- Hello.actions.tsx : Redux actions
- Hello.app.tsx : App contain all component/utils/... need to work
