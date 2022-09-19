import * as React from 'react';
import loadResource from './translation';
import { JLandAppConst } from './jland.const';
import JRCore, { TwoColLayoutProps } from 'jamespot-react-core';

export const TwoColLayout = JRCore.registry.getLazyComponent<TwoColLayoutProps>('TwoColLayout');

loadResource();

export const ROUTES = {
    LOGS: {
        path: '',
        key: 'LOGS',
        icon: 'fs-reporting',
        label: 'APP_JLand_Tab_Logs',
    },
    STATS: {
        path: 'stats',
        key: 'STATS',
        icon: 'fs-table-group',
        label: 'APP_JLand_Tab_Stats',
    },
};
console.log('!!')

export default () => {
    const JLAND = J.applications.find((app) => app.name === "JLandHook");

    return JLAND ? <TwoColLayout description={JLAND} routes={ROUTES} extensionRoute={JLandAppConst.route} /> : <></>;
};
