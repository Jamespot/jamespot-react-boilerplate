# traduction

Pour récupérer un string (pour un label par exemple)
```javascript
    const intl = useIntl();
    ...
    {intl.formatMessage({
                            id: 'GROUP_CREATE_Field_Features',
                        })}
```

Pour récupérer une traduction directement dans un composant react

```javascript
    <FormattedMessage id="GROUP_CREATE_Save" />

```

Dans tous les cas, les fichiers de traduction doivent être présents dans le dossier translation

# Appel à l'api jamespot
L'appel à l'api se fait à partir d'une action qui est dispachée par un component.
L'api ne doit jamais être appelée directement depuis un component

Dispatch de l'action (cf GroupeCreate.form.wrapper.tsx)
```javascript
    const dispatch = useDispatch();
    const groupActions = useGroupActions(dispatch);

    // Dispatch get available widget on load
    React.useEffect(() => {
        groupActions.getGroupAvailableWidget();
    }, []);

    // submit du form
    const submitForm = (values: GroupCreateModel) => {
        groupActions.createGroup(values);
    };
```

Code de l'action dans GroupCreate.actions.tsx
```javascript
export const getGroupAvailableWidget = () => {
        return (dispatch: Dispatch) => {
            dispatch(getGroupAvailableWidgetStarted());
            jamespot.group
                .getApplications()
                .then((res: any) => {
                    const transformedToArray = Object.keys(res).map(
                        (key) => res[key]
                    );
                    dispatch(
                        getGroupAvailableWidgetSuccess({
                            list: transformedToArray,
                        })
                    );
                })
                .catch((err: { message: any }) => {
                    dispatch(getGroupAvailableWidgetFailure(err));
                });
        };
    };

```

Puis ajout des données dans le reducer (cf GroupCreate.reducer.tsx)

```javascript
case GroupActions.Type.GET_GROUP_AVAILABLE_WIDGET_SUCCESS:
            return set(state, 'availableWidget', {
                list: action.payload.list,
                loading: false,
            });
```

# style
Avec styled component nous pouvons récupérer les propriétés du formulaire
```javascript
const WidgetList = styled.div`
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.form.borderColor};
`;
```

Si le style n'est pas prioritaire par rapport à l'historique jamespot. Nous pouvons le spécifier
```javascript
const WidgetList = styled.div`
    &&&{
        overflow: hidden;
        border-radius: 6px;
        border: 1px solid ${(props) => props.theme.form.borderColor};
    }
`;
```

# Formulaire
Exemple de formulaire utilisant redux-form complet dans les fichiers
- GroupCreate.form.wrapper.tsx
- GroupCreate.form.tsx

