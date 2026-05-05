# Nommage

## Fichiers et dossiers

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Composant UI (design system) | `JRC{Name}.tsx` dans `JRC{Name}/` | `JRCAlert/JRCAlert.tsx` |
| Composant beta | Préfixe `BETA_`, dossier `Beta/` | `Beta/BETA_Calendar/` |
| Composant déprécié | Préfixe `Deprecated_`, dossier `Deprecated/` | `Deprecated/Deprecated_Tabs/` |
| Slice Redux | Dossier en minuscules du domaine | `store/calendar/calendar.ts` |
| Extension | Dossier PascalCase | `extensions/SearchBar/` |
| Widget bridge | `Bridge_JRC{Name}/` dans `Misc/` | `Misc/Bridge_JRCCover/` |
| Fichier de types | `{domain}.types.ts` | `calendar.types.ts` |
| Fichier de mock | `{domain}.mock.ts` | `calendar.mock.ts` |
| Fichier de test | `{domain}.test.ts` | `calendar.test.ts` |
| Fichier de styles | `{Name}.styles.tsx` | `JRCAlert.styles.tsx` |
| Fichier de constantes | `{Name}.const.ts` | `SearchBar.const.ts` |
| Fichier de screen | `{Name}.screen.tsx` | `SearchBar.screen.tsx` |
| Fichier lazy-load | `{Name}.app.tsx` | `SearchBar.app.tsx` |

## Pas de fichiers `index.ts`

Conséquence directe de la règle anti-barrel (voir `imports.md`). Le nom du fichier doit refléter son contenu, pas son rôle de point d'entrée d'un dossier.

**Exceptions tolérées** : les rares fichiers `index.ts` qui servent de point d'entrée public d'un package consommé en externe.

## Références croisées

- Les conventions de nommage des clés i18n sont dans `i18n.md`.
- Les conventions de nommage des exports Redux sont dans `redux.md`.
