import * as React from 'react';
import loadResource from '../translation';
import { DemoAppConst } from '../Demo.const';
import JRCore, { TwoColLayoutProps } from 'jamespot-react-core';

export const TwoColLayout = JRCore.registry.getLazyComponent<TwoColLayoutProps>('TwoColLayout');

loadResource();

import { demoUserSlice } from '../redux/demoUser.slice';
import {userSlice, wordReducer} from "jamespot-front-business";
import {ROUTES} from "../index";
/**
 * Load reducer if any
 */
JRCore.store.add('demoUser', demoUserSlice.reducer);
JRCore.store.add('demoUser2', userSlice.reducer);
JRCore.store.add('word', wordReducer);
JRCore.store.add('word2', wordReducer);

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
