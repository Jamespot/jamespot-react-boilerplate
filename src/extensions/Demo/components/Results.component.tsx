import React from 'react';

import { UserModel } from 'jamespot-user-api';
import { JRCTagProps } from 'jamespot-react-components';

const Tag = J.react.registry.getLazyComponent<JRCTagProps<UserModel>>('Tag');

export const Results = ({ results }: { results: UserModel[] }) => {
    return (
        <>
            {results.map((entity) => (
                <Tag key={entity.id} uri={entity.uri} label={entity.title} />
            ))}
        </>
    );
};
