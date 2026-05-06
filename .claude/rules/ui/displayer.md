# Displayer (système de formulaires dynamiques)

## Règle de priorité

**Toujours utiliser le système displayer** pour afficher ou éditer des champs issus d'un modèle (user, article, spot, etc.). Ne pas créer de formulaires custom quand le displayer peut couvrir le besoin.

Le displayer mappe automatiquement les configurations de champs du backend vers des composants React (affichage, saisie, recherche). Il gère la validation, les valeurs par défaut, et l'inclusion automatique des champs obligatoires.

## Fichiers clés

```
src/displayer/
├── useDisplay.tsx              # 3 hooks principaux
├── types.ts                    # Système de types
├── formatter.tsx               # Mapping widget → composants
├── DisplayForm.component.tsx   # Composant formulaire
├── components/inputs/          # Composants d'input (un par type de widget)
└── components/DisplayRender.tsx # Composants d'affichage
```

## Les trois hooks

### `useDisplay(fields, type, bypassRequiredFields?)`

Hook de base. Retourne un `Displayer` (tableau de `DisplayerElement`) avec les composants `render`, `input`, et `search` pour chaque champ.

```typescript
const config = useDisplay(['firstname', 'lastname', 'email'], 'user');

// Chaque élément a : name, label, mandatory, widget, components.{render, input, search}
config.map(({ components, ...attr }) => (
  <components.render object={userData} attribute={attr} />
));
```

- `fields: 'all'` → tous les champs du modèle
- `fields: string[]` → sélection de champs par nom
- `type` → type de modèle (`'user'`, `'article'`, `'spot'`, etc.)
- **Comportement non évident** : si `bypassRequiredFields` est `false` (défaut), les champs obligatoires du modèle sont automatiquement ajoutés même s'ils ne sont pas dans `fields`.

### `useDisplayForm(fields, type, forceMandatory?)`

Pour les formulaires. Retourne un tuple `[config, defaultValues]` prêt à passer à `react-hook-form`.

```typescript
const [config, defaultValues] = useDisplayForm(['firstname', 'email'], 'user');

// config[i] = { Input, name, label, description, mandatory, widget }
// defaultValues = { firstname: '', email: '' }
```

Valeurs par défaut par type de widget :
- `checkbox`, `taxonomy`, `audience` → `[]`
- `select` → `{ label, value }` depuis `widget.params.defaultValue`
- Tous les autres → `''`

### `useDisplayList(fields, type)`

Pour les tableaux de données. Retourne des colonnes prêtes à l'emploi.

```typescript
const columns = useDisplayList(fields, 'user');
// [{ id, header, cell, enableSorting }]
```

Le tri est activé pour `orientedlinks`, `taxonomy`, ou si `field.config.enableSorting`.

## Définition des champs

Les hooks acceptent plusieurs formes de champs :

| Forme | Usage |
|-------|-------|
| `'firstname'` | Champ simple par nom |
| `{ includes: 'tags' }` | Tous les champs taxonomy du modèle |
| `{ includes: '_attachedFiles' }` | Champ fichier synthétique |
| `{ name: 'publishTo', options: { ... } }` | Champ configurable (audience) |
| `{ name, extra: { label, mandatory, widget } }` | Définition custom complète |
| `{ name, render: Component }` ou `{ name, input: Component }` | Override de composant |

## Champs spéciaux

- `'publishTo'` → widget audience, toujours créé (même si absent du modèle)
- `'sendAlert'`, `'alertAuthor'` → widgets toggle, créés à la volée
- `{ includes: 'tags' }` → injecte tous les champs `taxonomy` du modèle
- `{ includes: '_attachedFiles' }` → injecte un champ `file` synthétique

## Pattern formatter

Chaque type de widget est mappé vers trois composants via `formatField()` :

```typescript
formatDate(configuration) → {
  ...configuration,
  components: {
    render: DisplayDate,      // Affichage (listes, détails)
    input: InputDate,         // Saisie (formulaires)
    search: SearchDate,       // Filtre (recherche)
  }
}
```

Les formatters complexes (checkbox, select, taxonomy) sont des **higher-order functions** qui capturent les options à la création :

```typescript
// Le formatter crée une factory qui bind les options
formatCheckbox(config) → {
  components: {
    input: InputCheckbox(widgetToOptions(config.widget), { checkboxMode: 'checkbox' })
  }
}
```

## Composants via registre

Tous les composants d'input utilisent le registre commun pour accéder aux composants du design system. Ne pas importer directement les composants du design system dans les inputs du displayer.

## Transformation des valeurs (soumission)

Au moment de la soumission, les valeurs frontend sont transformées pour le backend :

| Type | Frontend | Backend |
|------|----------|---------|
| audience | `[{ uri: '...' }, ...]` | `'uri1,uri2,...'` |
| taxonomy | `[{ title: '...' }, ...]` | `'title1,title2,...'` |
| toggle | `true / false` | `'1' / '0'` |
| autres | tel quel | tel quel |

## Contraintes

- Le modèle doit exister dans le store Redux. Si le modèle n'existe pas, `useDisplay` retourne `[]` silencieusement.
- Les composants d'input passent `rules={{ required: props.mandatory }}` à react-hook-form — la validation obligatoire est automatique.
- Les composants d'affichage utilisent des type guards et retournent `null` si le type ne correspond pas.
- Les champs `search` créent des sous-champs avec suffixes `.start` et `.end` (pour date et datetime).
