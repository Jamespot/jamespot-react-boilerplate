# IMPORTANT
Le code des composants est défini dans jamespot-react-component

# Concepts

Nous utilisons la librarie redux-form pour gérer les formulaires. Elle permet de garder un état des valeurs du formulaire dans un store redux

Redux-form possède ses propres contrôles de l'intégrité des valeurs et de sa gestion des erreurs.
Si dans certains cas il est possible d'utiliser les contrôles HTML5, il est préférable de n'utiliser QUE redux-form
pour ces points.

Dans certains cas très précis, nous pouvons être amené à utiliser les composants input hors contexte redux-form.
Dans ces cas, nous devons utilisons les composants natif HTML ou ceux chartés avec StyledComponents

# Présentation d'un formulaire

Un formulaire redux-form englobé dans un décorateur reduxForm.
Dans ce formulaire nous pouvons placer un ensemble de Field qui correpondent chaqun à une zone de saisie
Les fields rendent un "component". Il peut être simples (html input) ou plus complexes (en intégrant la gestion des erreurs par exemple)

# Présentation des composants input

Dans ce projet nous fournissons un ensemble de champs qu'il est possible d'utiliser dans redux-form
Pour chacun des champs, nous fournissons :

-   Un composant Input (par exemple JRCFormEmailInput) qui correspond à l'input HTML hors contexte redux-form
-   Les propriétés associées à ce champ par exemple JRCFormEmailInputProps
-   Un composant Field (par exemple JRCFormEmailField) qui permet d'utiliser le composant dans redux-form. Dans le Field, les labels, la gestion des erreurs, leur affichage sont inclus
-   Les propriétés associées au Field

## Composition des fields

-   component définit l'agencement du label, du helper, des erreurs et toutes les metadonnées autour de l'input. Dans la plupart des cas nous utilisons JRCFormFieldRender mais nous pouvons réécrire ce composant pour gérer des cas particuliers (par exemple les checkbox)
-   render : Fonction définissant le rendu de l'input (zone de saisie)
-   validate : un tableau de fonction de validation (cf validation des formulaires)

-   label : L'élement à afficher avant ou après le formulaire. Cet élément peut être un texte ou un composant react
-   placeholder : Le texte à afficher dans le champs vide

### Cas particuliers

#### Checkbox

-   labelPosition : 'before' | 'after' determine si nous devons afficher le label avant ou après la checkbox
-   checkboxMode?: 'checkbox' | 'toggle' affiche une checkbox classique ou un boutton toggle

#### radio

-   options: [{ label: string; value: string }] la liste des options et leurs valeurs

#### range

-   min
-   max

#### select

-   options: [{ label: string; value: string }] la liste des options et leurs valeurs
-   isMulti : boolean Permet de choisir plusieurs valeurs
-   asyncPromise : Promise, permet d'aller récupérer dess éléments dynamiquement
-  customReactSelectStyle : permet de customisé le style de react-select (cf https://react-select.com/styles)

##### Exemple de select multi permettant de choisir une liste d'utilisateurs en autocomplet

```javascript
const promiseOptions = (inputValue: string) => {
    return new Promise((resolve) => {
        jamespot.user.autocomplete(inputValue).then((res: any) => {
            const options = res.map((juser: any) => ({
                label: juser.record.name,
                value: juser.record.id,
            }));
            resolve(options);
        });
    });
};
```

```javascript

<FormSelectField
     label="Hello"
     name="privacy"
     placeholder="placeholder"
     required={true}
     isMulti={true}
     asyncPromise={promiseOptions}/>

```

## userpicker

```javascript
<UserPickerField
    label="test"
    name="test"
    placeholder="test"
    required={true}
    isMulti={true}
/>
```

## Validation des formulaires

Ici nous traitons la validation de chaque champ du formulaire individuellement. Avec redux-form, il est également possible de valider les champs lors du submit pour contrôler la cohérence des données entre elles (cf https://redux-form.com/8.3.0/examples/submitvalidation/)

Pour chaque Field, nous pouvons passer un ensemble de contrôle de validation.

## Exemple de field text obligatoire limité à 10 caractère

```javascript
<FormTextField
    label="hello"
    placeholder="remplir le texte"
    name="title"
    required={true}
    maxLength={10}
/>

```

Liste des contrôles possibles (cf ReduxFormControls):

-   required?: boolean;
-   minLength?: number;
-   maxLength?: number;
-   minValue?: number;
-   maxValue?: number;
-   email?: boolean;
-   date?: boolean;

ReduxFormControls doit être complété si besoin
