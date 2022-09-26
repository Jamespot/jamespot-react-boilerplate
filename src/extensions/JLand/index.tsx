import React from 'react';
import { JLandAppConst } from './jland.const';
import JRCore from 'jamespot-react-core';
import { ROUTES } from './jland.const';

if (J.applications.find((app) => JLandAppConst.moduleName === app.name)) {
    const Layout = React.lazy(() => import('./JLand.app'));
    const JLandLog = React.lazy(() => import('./components/JLandLog'));
    const JLandStat = React.lazy(() => import('./components/JLandStat'));

    JRCore.router.addRoute({
        path: JLandAppConst.route,
        element: (
            <React.Suspense fallback={<></>}>
                <Layout />
            </React.Suspense>
        ),
        children: [
            {
                path: ROUTES.LOGS.path,
                element: (
                    <React.Suspense fallback={<></>}>
                        <JLandLog />
                    </React.Suspense>
                ),
            },
            {
                path: ROUTES.STATS.path,
                element: (
                    <React.Suspense fallback={<></>}>
                        <JLandStat />
                    </React.Suspense>
                ),
            },
        ],
    });
}
