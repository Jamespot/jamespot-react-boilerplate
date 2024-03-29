import * as React from 'react';
import loadResource from '../translation';
import { DemoAppConst } from '../Demo.const';
import JRCore from 'jamespot-react-core';

export const TwoColLayout = JRCore.registry.getLazyComponent('TwoColLayout');

loadResource();

/**
 * Details of the app routes configured in index.tsx
 */
export const ROUTES = {
    EXAMPLE: {
        path: '',
        key: 'EXAMPLE',
        icon: 'fs-reporting',
        label: 'APP_Demo_Tab_Example',
    },
    ANOTHER_SCREEN: {
        path: 'another-screen',
        key: 'ANOTHER_SCREEN',
        icon: 'fs-table-group',
        label: 'APP_Demo_Tab_AnotherScreen',
    },
};

/**
 * App description that will be displayed in the left column
 * Alternatively, if you are writing an extension which has a backend hook, you can get the hook description with:
 * const DESCRIPTION = J.applications.find((app) => app.name === DemoAppConst.moduleName);
 */
const DEMO_DESCRIPTION = {
    icon: 'icon-edit',
    color: '#EA80CA',
    label: 'DEMO_APP_TITLE',
    description: 'DEMO_APP_DESC',
};

/**
 * The layout defines how your app is going to be presented. You may use the TwoColLayout or a custom one.
 * The TwoColLayout handles a left app descriptive column and a main one.
 */
export default () => {
    return <TwoColLayout description={DEMO_DESCRIPTION} routes={ROUTES} extensionRoute={DemoAppConst.route} />;
};
