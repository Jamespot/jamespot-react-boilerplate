import React from 'react';

import { Little } from 'jamespot-user-api';
import { JRCTagProps } from 'jamespot-react-components';
import JRCore from 'jamespot-react-core';

const Tag = JRCore.registry.getLazyComponent<JRCTagProps<Little>>('Tag');

export const Results = ({ results }: { results: Little[] }) => {
    return (
        <>
            {results.map((entity) => (
                <Tag key={entity.id} uri={entity.uri} label={entity.title} />
            ))}
        </>
    );
};
