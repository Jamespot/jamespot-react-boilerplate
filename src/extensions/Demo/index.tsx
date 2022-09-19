import React from 'react';
import { DemoAppConst } from './Demo.const';
import JRCore from 'jamespot-react-core';

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

const Layout = React.lazy(() => import(/* webpackChunkName: "JeanCharles" */'./routes/DemoLayout'));
const Example = React.lazy(() => import('./routes/Example'));
const AnotherScreen = React.lazy(() => import('./routes/AnotherScreen'));


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
