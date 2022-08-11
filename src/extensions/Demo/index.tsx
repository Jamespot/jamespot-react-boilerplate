import React from 'react';
import { DemoAppConst } from './Demo.const';
import JRCore from 'jamespot-react-core';
import { ROUTES } from './routes/DemoLayout';
import { demoUserSlice } from './redux/demoUser.slice';

const Layout = React.lazy(() => import('./routes/DemoLayout'));
const Example = React.lazy(() => import('./routes/Example'));
const AnotherScreen = React.lazy(() => import('./routes/AnotherScreen'));

/**
 * Load reducer if any
 */
JRCore.store.add('demoUser', demoUserSlice.reducer);

/**
 * Register extension routes
 */
JRCore.router.addRoute({
    path: DemoAppConst.route,
    element: (
        <React.Suspense fallback={<></>}>
            <Layout />
        </React.Suspense>
    ),
    children: [
        {
            path: ROUTES.EXAMPLE.path,
            element: (
                <React.Suspense fallback={<></>}>
                    <Example />
                </React.Suspense>
            ),
        },
        {
            path: ROUTES.ANOTHER_SCREEN.path,
            element: (
                <React.Suspense fallback={<></>}>
                    <AnotherScreen />
                </React.Suspense>
            ),
        },
    ],
});
