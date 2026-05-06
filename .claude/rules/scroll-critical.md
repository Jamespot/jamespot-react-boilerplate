# Scroll — critique

Le conteneur parent fourni par la plateforme donne une **hauteur fixe** à l'extension. Si le composant racine ne gère pas correctement le scroll, le contenu déborde ou devient inaccessible — sans message d'erreur visible.

## Règle

Le composant racine de l'extension doit utiliser le composant **`Container`** du design system pour gérer le scroll :

```tsx
const Container = jCore.registry.getLazyComponent('Container');

export const MyDashboard = () => (
    <Container>
        <MyContent />
    </Container>
);
```

**Ne pas créer de ScrollWrapper custom** (`styled.div` avec `height: 100%; overflow-y: auto`). Le composant `Container` du DS gère la hauteur et le scroll dans le contexte plateforme, avec la cohérence visuelle des autres extensions.

## Symptômes si la règle n'est pas respectée

- Le contenu déborde verticalement et n'est pas défilable.
- Des parties de l'interface sont invisibles et inaccessibles.
- En développement local, tout fonctionne bien parce que le viewport est plus grand — le bug n'apparaît qu'en production.
