# Composants

## Réutiliser avant de créer

Toujours vérifier si un composant existant du design system couvre le besoin avant de créer du rendu custom. Le design system partagé est la source de vérité pour les composants UI réutilisables.

**Cela inclut les tags HTML natifs.** Avant d'utiliser `<a>`, `<button>`, `<input>`, `<table>`, etc., vérifier si le DS a un équivalent :

| Tag HTML | Composant DS |
|----------|-------------|
| `<a>` | `StyledHref` |
| `<button>` | `Button`, `IconButton` |
| `<input>` | `InputText`, `InputTextRaw`, etc. |
| `<select>` | `InputSelect`, `InputSelectRaw` |
| `<table>` | `List` (JRCList) |
| `<dialog>` | `Modal`, `ModalForm`, `SidePanelModal` |

Pour les composants stylisés, **étendre le composant DS**, pas le tag natif :

```tsx
// Correct
const CustomLink = styled(StyledHref)`font-weight: 600;`;

// Incorrect — perd les styles/accessibilité du DS
const CustomLink = styled.a`font-weight: 600;`;
```

Exceptions : contenu HTML généré (éditeur rich text), composants headless sans style.

## Accès aux composants

- Dans les packages applicatifs consommateurs : via le registre `jCore.registry.getLazyComponent('ComponentName')`.
- **Jamais** d'import direct depuis le package du design system (sauf pour les types).
- Noms imbriqués supportés : `'Calendar.CreateMeetingModal'`.

Chaîne de fallback du registre :
1. Registre commun (composants du design system)
2. Registre core (composants de l'application principale)
3. Composant « empty » si rien n'est trouvé (un `console.error` est émis en développement)

## Composition (inputs)

Les composants d'input utilisent deux couches :

- **Raw** (par exemple `RenderInput`, `JRCInputCheckboxRaw`) — `forwardRef` sur l'élément natif ou stylé, pas de logique formulaire.
- **Wrapper** (par exemple `JRCInputText`, `JRCInputCheckbox`) — intègre un renderer de champ de formulaire pour label, erreur, description, et connexion à `react-hook-form`.

Les Raw sont réutilisables indépendamment. Les Wrappers sont le point d'entrée standard dans les formulaires.

## Génériques dans les props

Les composants flexibles utilisent des génériques contraints avec une valeur par défaut :

```typescript
export type JRCTabsProps<T extends string = string> = DataCy & {
  entries: ItemEntriesProps<T>[];
  callback: (key: T) => void;
};
```

La valeur par défaut (`= string`) permet l'usage simple, le générique permet le typage fort quand c'est utile.

## 1 composant page = 1 vue

Si une extension gère plusieurs vues (liste, détail, création, édition), chaque vue est un composant page séparé dans `pages/`. L'orchestrateur (Dashboard ou routes.tsx) ne fait que du routing entre ces pages.

```
pages/
├── ListPage.tsx       # Vue liste
├── DetailPage.tsx     # Vue détail
├── CreatePage.tsx     # Vue création
└── EditPage.tsx       # Vue édition
```

Objectif : < 100 lignes pour l'orchestrateur. Un composant monolithique qui gère 4 vues est un signal de refacto.

### Anti-pattern : routing par state

Si un composant rend `<XPage />` ou `<YPage />` selon un flag interne (`editingX`, `showCreateY`, `selectedId`, etc.), c'est du routing implicite déguisé en state. À remplacer par des routes distinctes react-router avec `<Outlet />` dans le layout.

```tsx
// Anti-pattern — orchestrateur qui branche entre pages via state
if (editingQuestion) return <EditPage question={editingQuestion} .../>;
if (showCreateModal) return <CreatePage .../>;
if (selectedId !== null) return <DetailPage id={selectedId} .../>;
return <ListPage .../>;

// Correct — un layout avec <Outlet />, 4 routes enfants
jCore.router.addRoute({
    path: 'ext',
    element: <Layout />, // Container + <Outlet />
    children: [
        { path: '',         element: <ListPage /> },
        { path: 'new',      element: <CreatePage /> },
        { path: ':id',      element: <DetailPage /> },
        { path: ':id/edit', element: <EditPage /> },
    ],
});
```

Ce que ça débloque :
- URLs stables (rechargement, partage de lien)
- Back/forward navigateur naturel
- Pas de state éphémère perdu au reload
- Chaque page refetch ses données depuis ses params d'URL au lieu de les recevoir en prop de son parent

## `data-cy` pour les tests

Les composants qui supportent les sélecteurs de test utilisent le type `DataCy` :

```typescript
interface Props extends DataCy {
  label: string;
}

// Rendu : data-cy={dataCy && `${dataCy}-suffix`}
```
