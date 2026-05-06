# styled-components

## Props transientes (préfixe `$`)

Le préfixe `$` empêche la prop d'être transmise au DOM. Il est réservé aux **props calculées internes au style** :

```typescript
// $isActive est un flag interne calculé pour le style → préfixe $
const Box = styled.div<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
`;

// direction et variant sont des props publiques avec une sémantique → pas de $
<DirectionContainer direction={props.direction} variant={variant} />
```

Règle : si la prop vient des props publiques et a une sémantique au-delà du style, **pas** de `$`. Si elle est un flag interne calculé uniquement pour le rendu, **oui** `$`.

## Thème

Accès **direct** via `props.theme` dans les styled-components, ou via un hook de thème (`useThemeContext()`) dans les composants React.

```typescript
const Container = styled.div`
  gap: ${({ theme }) => theme.space.md}px;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;
```

**Jamais** de couleurs ou tailles en dur dans un styled-component. Toujours passer par `theme.color.*`, `theme.space.*`, `theme.font.weight.*`.

**Jamais** de helper intermédiaire comme `themeColor(theme, 'key', '#fallback')` ou `fontWeight(theme, 'key')`. L'accès au thème se fait directement via `theme.color.key`, `theme.font.weight.key`, `theme.space.key`.

**Pas de fallback pour le thème.** Le ThemeProvider est toujours présent dans l'arbre React de la plateforme. Les helpers avec fallback (`?? '#hex'`) sont interdits — si une clé thème n'existe pas, c'est le thème qui doit être enrichi, pas le composant qui doit hardcoder un fallback.

**Pas de cast pour accéder au thème.** `theme.color as Record<string, string>` (ou équivalent) est interdit. Si une clé manque dans le type `ThemeType`, c'est le type qui doit être corrigé (ou la clé ajoutée à la palette) — pas un cast qui masque l'erreur.

### Typage du thème

Le type `ThemeType` est exporté par `jamespot-react-components`. Pour que `theme` soit typé dans les styled-components, augmenter `DefaultTheme` dans un fichier `styled.d.ts` à la racine de `src/` :

```typescript
// src/styled.d.ts
import 'styled-components';
import type { ThemeType } from 'jamespot-react-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
```

Avec cette augmentation, `theme.color.primary` compile directement — pas besoin de cast ni de fallback.

### Props avec couleur

Quand un composant accepte une couleur en prop, le type doit référencer les clés du thème :

```typescript
interface Props {
  $color: keyof DefaultTheme['color'];
}

const Box = styled.div<Props>`
  color: ${({ theme, $color }) => theme.color[$color]};
`;
```

### Configs avec couleurs (constantes, types)

Les objets de configuration qui contiennent des couleurs (TIER_CONFIG, TREND_CONFIG, etc.) doivent utiliser des **clés thème** (`ColorsOrShades`), pas des hex :

```typescript
import type { ColorsOrShades } from 'jamespot-react-components';

const TIER_CONFIG: Record<Tier, { colorKey: ColorsOrShades; bgColorKey: ColorsOrShades }> = {
  guru: { colorKey: 'orange', bgColorKey: 'orangeLight' },
};

// Au rendu, résoudre via le thème :
<Badge $color={theme.color[cfg.colorKey]} $bg={theme.color[cfg.bgColorKey]} />
```

### Aucune couleur hors thème

Toute couleur vient de la palette — sans exception. Pas de hex littéral, pas de `rgb()` / `rgba()` avec des composantes numériques, pas de `var(--...)` local. Si une nuance manque, on enrichit la palette côté plateforme, on ne hardcode pas dans le composant.

Le pattern d'alpha dynamique `${theme.color.X}22` (8-digit hex alpha `#RRGGBBAA`) est toléré pour dériver un fond ou une bordure semi-transparente d'une couleur sémantique déjà issue du thème.

### Tokens disponibles

| Catégorie | Clés |
|-----------|------|
| `color` (familles) | `primary`, `secondary`, `green`, `red`, `lavender`, `navy`, `overseas`, `sky`, `sand`, `yellow` — chaque famille a `{Light, Medium, Strong, Dark}` (ex. `primaryLight`, `greenStrong`, `lavenderDark`) |
| `color` (neutres) | `grey0`-`grey6`, `black`, `white` |
| `color` (alpha) | `black10`, `black15`, `black20`, `transparent`, `transparentHexa` |
| `space` | `xs` (4), `sm` (8), `md` (16), `l` (24), `xl` (32) |
| `size` | `xs`, `sm`, `md`, `l`, `xl` |
| `font.weight` | `light`, `normal`, `medium`, `semiBold`, `bold` |
| `font` | `family`, `size`, `color`, `hrefColor`, `lineHeight` |
| `zIndex` | `toaster`, `modal`, `dropdown`, `tooltip`, `sidePanelModal`, ... |

## `font-size` en pixels

Les tailles de police sont exprimées en **pixels** (`font-size: 14px`), jamais en `rem` ou `em`. Cela garantit une cohérence visuelle avec le reste de la plateforme et évite les propagations d'échelle non désirées.

## Variantes via constantes

Pour les composants avec plusieurs variantes (par exemple un bouton), extraire le mapping dans une constante au lieu de chaîner des ternaires dans le JSX :

```typescript
const BUTTON_CONFIG: Record<Variant, Record<Color, ButtonType>> = {
  contained: { primary: { color: 'white', background: 'primary' }, ... },
  outlined: { ... },
};
```

Cela rend les variantes exhaustives et facilite l'ajout d'une nouvelle variante sans relire tout le JSX.

## Pas de `style={}` pour les props CSS

Les styles vont dans des styled-components, pas dans un objet `style`. Cela vaut même pour une seule ligne ou un composant d'usage unique.

- Tout bloc `style={{ color, background, padding, margin, border, fontSize, ... }}` est interdit.
- Le composant stylé a un nom, un typage des variants via props transientes (`$`), et vit à côté du JSX qui le consomme (fichier local ou `Styled.tsx` partagé si utilisé dans 2+ fichiers).
- Pour un padding/margin ajusté sur une instance d'un composant partagé, ajouter une prop transiente (`$marginTop`, `$marginBottom`) sur la styled-component plutôt que de contourner via `style`.

### Exception (rare et justifiée)

`style={}` est autorisé uniquement pour les **valeurs intrinsèquement dynamiques par instance** qui ne peuvent pas être pré-calculées :
- CSS custom properties (`--x`, `--y`) pilotant des keyframes, une par particule/élément.
- Positionnement calculé runtime (positions aléatoires, tailles issues de `ResizeObserver`).

Pour une variante avec un nombre fini de valeurs (S/M/L, primary/secondary, active/inactive), ce n'est **pas** dynamique — c'est un prop `$variant` sur la styled-component.
