# Accessibilité (RGAA)

## Objectif

Tous les composants UI doivent respecter le RGAA (Référentiel Général d'Amélioration de l'Accessibilité). Concrètement :

- **Sémantique HTML** — utiliser les éléments natifs (`button`, `input`, `nav`, `dialog`, etc.) avant de recourir à des `div` avec des rôles ARIA.
- **Rôles et attributs ARIA** — `role`, `aria-label`, `aria-selected`, `aria-controls`, `aria-expanded`, etc. quand l'élément natif ne suffit pas.
- **Navigation clavier** — tout élément interactif doit être accessible au clavier (Tab, Enter/Space, flèches, Home/End).
- **Gestion du focus** — `tabIndex` dynamique, indicateur de focus visible, pas de piège clavier.
- **Contenu non visuel** — composant `SROnly` pour le texte destiné aux lecteurs d'écran, lien `SkipToContent` pour la navigation rapide.
- **Contraste et lisibilité** — utiliser les tokens du thème qui garantissent les ratios de contraste.

## Règles immédiates

- **Pas de `<div onClick>`**. Toujours un `<button>` ou un composant partagé équivalent.
- Les `<label>` manuels doivent être liés au champ via `htmlFor` — ou, mieux, privilégier les composants partagés avec label intégré plutôt que les variantes `…Raw`.
- **`aria-label`** sur tous les contrôles interactifs qui n'ont pas de label visible textuel.
- **Live regions** (`role="status"`, `aria-live="polite"`) pour les annonces dynamiques (succès, erreur, chargement).
- HTML sémantique : `<table>` pour les tableaux, `<mark>` pour les surlignages, `<nav>` pour les zones de navigation, etc.

## Cycle de vie des composants (design system)

| Préfixe / dossier | Signification | Obligation accessibilité |
|-------------------|--------------|------------------------|
| `0-RGAA/Category/` | Composant conforme | Tests d'interaction + couverture statement 100% |
| `untested/` | Composant en cours | Pas encore testé mais doit viser la conformité |
| `BETA_` | Composant expérimental | Pas d'obligation |
| `Deprecated_` | Composant à supprimer | Pas d'obligation |

L'objectif est de migrer progressivement les composants `untested/` vers `0-RGAA/`.

## Tests d'accessibilité (Storybook)

Les composants `0-RGAA/` valident leur accessibilité via des interaction tests Storybook :

```typescript
const meta: Meta<typeof Component> = {
  title: '0-RGAA/Category/Component',
  tags: ['testing'],              // Obligatoire — filtre du test runner
};

export const Play: Story = {
  args: { onClick: fn() },        // fn() de storybook/test, pas jest.fn()
  parameters: { mode: 'test' },   // Obligatoire
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('Navigation clavier', async () => {
      await userEvent.tab();
      await expect(canvas.getByRole('button')).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalled();
    });
  },
};
```

Ces tests doivent couvrir : interactions souris, navigation clavier, et états (focus, disabled, selected).

## Helpers disponibles

- `SROnly` — composant pour le texte masqué visuellement mais lu par les lecteurs d'écran.
- `SkipToContent` — lien d'évitement pour la navigation rapide.
- `FocusVisibleOutline` — helper pour l'indicateur de focus.
- `useRef<(HTMLElement | null)[]>()` — pattern pour la navigation clavier dans les listes (tabs, menus).
