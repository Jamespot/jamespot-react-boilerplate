# Test de l'application
Les tests se basent sur les librairies JEST et Enzyme.
Nous créons des snapshot de l'application pour vérifier les modifications de style

Pour lancer les tests, nous pouvons utiliser la commande 
```
    npm run test
```
Pour lancer les test en mode continu et les relancer automatiquement à chaque modification
```
npm run test:watch
```
Pour regénérer les snapshots
```
npm run test:update:snapshot
```

## Enzyme 
https://blog.ineat-group.com/2019/09/creer-et-tester-vos-composants-react-avec-jest-enzyme/



## Test fonctionnels (hors rendu)

Nous pouvons tester le comportement des actions, les méthodes utilitaires, les stores redux, les selectors etc...


Exemplee de test de l'application d'une action sur le reducer (cf GroupCreate.actions.test.tsx)

```javascript
    it('loading', () => {
        const action = GroupActions.createGroupStarted();
        let state: GroupCreateState = GroupsCreateReducer(initState, action);
        expect(get(state, 'formStatus.loading')).toBeTruthy();
        expect(get(state, 'formStatus.success')).toBeFalsy();
        expect(get(state, 'formStatus.error')).toBeFalsy();
    });

```
Exemple de test d'un selector cf GroupCreate.selector.test.tsx

```javascript
    it('sould be trye', () => {
        state.groupCreate.availableWidget.loading = true;
        const isLoading = widgetLoadingSelector(state);
        expect(isLoading).toBeTruthy;
    });

```


