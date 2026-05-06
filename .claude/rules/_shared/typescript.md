# TypeScript

Règles qui ne sont pas enforced par ESLint et qui impactent l'inférence et la qualité des types.

## Type-first, Zod suit

Le type TypeScript est la source de vérité. Le schéma Zod le valide à runtime, il ne le définit pas.

```typescript
// 1. Définir le type TS
export type jArticleLittle = Merge<jObjectLittle, { mainType: 'article' }>;

// 2. Créer le schéma Zod qui suit le type
const shape = jObjectLittleSchema.extend({ mainType: z.literal('article') });
export const jArticleLittleSchema = zSchema<jArticleLittle, typeof shape.shape>(shape);
```

Utiliser `z.infer<typeof schema>` seulement quand le schéma est la définition canonique (cas rare, types dérivés).

## Éviter les casts — préférer le narrowing

```typescript
// Interdit — masque les erreurs de type
const value = response as MyType;

// OK — type guard avec narrowing
if (isMyType(response)) {
  // response est typé MyType ici
}
```

Les type guards (`is` keyword) vivent dans des fichiers utilitaires centralisés (souvent un namespace `jEnsure` ou équivalent). Réutiliser avant d'en créer de nouveaux.

**`as never` et `as unknown as X` sont interdits** hors des exceptions listées plus bas. Ces casts signalent presque toujours qu'on contourne un typage qui existe déjà.

### Checklist avant de caster

Avant d'écrire `as X`, `as unknown as X` ou `as never`, dérouler cette liste :

1. **Le symbole est-il déjà typé ?** Ouvrir le fichier `.d.ts` du package (`node_modules/.../dist/src/...`) et chercher le nom. Pour les membres du registre, vérifier `ext-component-list.d.ts` et le composant cible.
   - Exemple : `jApi.network`, `jCore.tinymceCommonOptions`, `useDisplay` sont tous exportés par les packages Jamespot — pas besoin de caster.

2. **Le générique de la fonction est-il paramétrable ?** Les APIs du package prennent souvent un `<T>` contraint qu'il suffit de fournir.
   - Exemple : `jApi.article.create<ArticleCreation & { sendAlert?: boolean }>({...})` au lieu de `jApi.article.create({...} as never)`.
   - Exemple : `useDisplay<MyFormValues>(...)` pour que le `control` passé à un input dynamique soit typé correctement.

3. **`jamespot-user-api` garantit les types de retour de `jApi.*`.** L'appel `jApi.article.list({...}, { format: 'raw-view', formatExtension: ['comments'] })` renvoie un `ApiPagingResults<ArticleReturn<...>>` entièrement typé — on accède à `response.result.data` directement, sans cast. Si TS refuse, c'est qu'il manque un générique (voir point 2) ou une augmentation de type locale (voir point 4), pas qu'il faut caster.

4. **Le serveur renvoie un champ absent du type du package ?** Cas typique : certains champs ne sont peuplés qu'en `raw-view` et le package ne le modélise pas. Étendre par intersection locale, **avec un TODO** pour remonter au package :
   ```typescript
   // TODO: pousser ces champs dans jamespot-user-api (absents de ArticlesViewExtensions).
   type SocialQuestionWithComments = ArticlesViewExtensions<['comments']> & {
       tags?: jObjectAutocomplete[] | undefined;
       socialQuestionResponse?: number | undefined;
   };
   ```
   L'intersection locale documente *ce qui manque* dans le type du package — le cast masque tout. Le TODO garantit qu'on remontera la correction plutôt que de laisser la rustine.

5. **Le composant JRC vient-il de `getLazyComponent<K>(name)` ?** Les clés connues (celles listées dans `ext-component-list.d.ts`) renvoient le type du composant, props incluses. Si un `as never` semble nécessaire sur une prop, c'est que la prop transmise est effectivement mal typée — à corriger en amont, pas à caster.

### Appels API : passer par `jApi`, pas par `fetch`

Tout appel vers l'API Jamespot doit utiliser `jApi.*`, jamais un `fetch` direct. `fetch` prive des types garantis par le package, force des casts, et rate la gestion CSRF/abort/JSON/credentials centralisée.

Hiérarchie à respecter :

1. **`jApi.<domain>.<method>()`** quand la méthode existe (`jApi.article.list`, `jApi.object.getAccessHash`, `jApi.questionAnswer.selectResponse`, etc.). C'est le chemin typé de bout en bout.

2. **`jApi.network.post<T>({ o, f, ...body }, signal?)`** pour les endpoints non encore exposés dans `jApi.*`. La méthode construit `/api-front/{o}/{f}`, gère headers, JSON, `credentials`, abort, et unwrap automatique vers `response.result`. Les erreurs sont normalisées en `{ error, errorMsg, messages }` — compatibles avec `isAbortError` / `getErrorMessage` (voir `error-handling.md`). Idem `jApi.network.get` pour un GET, `jApi.network.postCSRF` quand un token CSRF est requis.

   **Signal d'alarme — avant d'écrire `jApi.network.post<{...}>`** : si tu écris un type de retour à la main (par ex. `{ id: number; title: string; uri: string }`), c'est souvent qu'une méthode typée existe et que tu ne l'as pas cherchée. Exemple réel : `/api-front/spot/get/:id` → `jApi.group.getSpot(idSpot, Format.LITTLE)` renvoie un `jGroupLittle` complet. Ouvrir `node_modules/jamespot-user-api/dist/src/apis/<domain>/<domain>.d.ts` avant de caster à la main.

   Quand l'option 1 est disponible, les génériques de format (`Format.LITTLE | LIST | VIEW`) sont à passer explicitement — sans eux, `ApiReturn` tombe sur le `Default` (souvent `string`) et l'appelant perd le typage.

   ```typescript
   // Correct — endpoint custom /api-front/object/list/jamespot/article-list
   const res = await jApi.network.post<RawListResponse>(
       { o: 'object', f: 'list', namespace:'jamespot', view: 'articleList', type: 'socialQuestion', limit: 100 },
       signal,
   );
   const data = res.result;

   // Correct — endpoint avec segment dynamique /api-front/spot/get/:id
   const res = await jApi.network.post<SpotInfo>({ o: 'spot', f: `get/${groupId}` });
   ```

3. **`fetch()` natif : jamais.** Pas même en « fallback temporaire ». L'existence de `jApi.network.post/get` supprime la dernière excuse.

   ```typescript
   // Interdit — reconstruit à la main ce que jApi.network.post fournit déjà
   const res = await fetch('/api-front/object/list/jamespot/article-list', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json;charset=UTF-8' },
       body: JSON.stringify({ type: 'socialQuestion', limit: 100 }),
       credentials: 'include',
   });
   const json = (await res.json()) as { result: RawListResponse };
   ```

Si la méthode `jApi.<domain>.<method>()` manque, utiliser `jApi.network.post` **et** remonter au package pour qu'une méthode typée soit ajoutée (TODO dans le code, issue côté package).

### Exceptions acceptées

- `as any` dans les **tests** pour les mocks partiels.
- `as unknown as <T>` pour `forwardRef` générique (limitation React).
- Cast typé et commenté (`as TinyMCECommonOptions`) pour passer un champ que le composant accepte au runtime mais qui n'est pas dans le type public — toujours accompagné d'un commentaire expliquant le pourquoi.

## Pas de `React.FC` / `FC`

Ne pas typer les composants avec `FC<Props>`. Typer les props directement dans les paramètres :

```typescript
// Correct
export const Button = ({ label, onClick }: ButtonProps) => { ... };

// Incorrect
export const Button: FC<ButtonProps> = ({ label, onClick }) => { ... };
```

Pourquoi : `FC` ajoute implicitement `children: ReactNode` (souvent non voulu), empêche les props par défaut, et n'apporte rien que l'inférence TypeScript ne fasse déjà.

## Pas de non-null assertion (`!`)

Préférer le narrowing ou un fallback explicite :

```typescript
// Éviter
const item = list.find(x => x.id === id)!;

// Préférer
const item = list.find(x => x.id === id);
if (!item) throw new Error('Item not found');
```

## Variables inutilisées

Vérifier d'abord si la variable peut être supprimée. Le préfixe `_` est un dernier recours pour les cas où la variable est structurellement obligatoire :

```typescript
// La variable est imposée par la signature du callback
array.map((_item, index) => index);
const [_first, second] = useSomething();
```

## Génériques — préserver l'inférence

Ne pas casser l'inférence en annotant inutilement :

```typescript
// Laisser TS inférer quand possible
const result = await extra.jApi.calendar.listEvents(params, { format: Format.VIEW });
// TS infère le type retour depuis le générique Format.VIEW

// Ne pas faire
const result: ApiWrapper<CalendarEventView[]> = await extra.jApi.calendar.listEvents(params, { format: Format.VIEW });
// Redondant et fragile — si le type retour change, le cast masque l'erreur
```

Pour les `createAsyncThunk`, les trois génériques sont obligatoires car Redux Toolkit ne peut pas les inférer :

```typescript
createAsyncThunk<ReturnType, ArgType, ThunkApiConfig & RejectValue>(...)
```

## Unions > Enums (sauf constantes stables)

Préférer les string unions pour les petits ensembles sémantiques :

```typescript
// Préférer
type Loading = 'idle' | 'pending';

// Acceptable pour les constantes stables exportées
enum Format { LITTLE = 'raw-little', LIST = 'raw-list', VIEW = 'raw-view' }
type FormatType = `${Format}`;  // Template literal → string union
```

## Types utilitaires du projet

Avant de créer des types utilitaires, vérifier ceux qui existent déjà dans les fichiers d'utilitaires de types du projet :

- `Merge<A, B>` — écrase les champs de A par ceux de B
- `Readable<T>` — aplatit les intersections pour la lisibilité IDE
- `ExclusifyUnion<T>` — union exclusive (pas d'overlap entre membres)

Ne pas redéfinir localement ce qui existe déjà globalement.

## Réutiliser les types fournis par les packages

Les types publics des packages Jamespot (`jFileLittle`, `jObjectLittle`, `jArticleLittle`, `AutocompleteLittle`, etc.) sont la source de vérité pour les formes de données échangées avec l'API. Ne **jamais** les redéfinir localement — les importer et les composer.
