import * as React from 'react';
import loadResource from './translation';
import { JLandAppConst, ROUTES } from './jland.const';
import JRCore, { TwoColLayoutProps } from 'jamespot-react-core';

export const TwoColLayout = JRCore.registry.getLazyComponent<TwoColLayoutProps>('TwoColLayout');

loadResource();

export default () => {
    const JLAND = J.applications.find((app) => app.name === "JLandHook");

    return JLAND ? <TwoColLayout description={JLAND} routes={ROUTES} extensionRoute={JLandAppConst.route} /> : <></>;
};
