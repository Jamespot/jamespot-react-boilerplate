import React from 'react';
import { DemoAppConst } from './Demo.const';
import { demoUserSlice } from './redux/demoUser.slice';

const DemoApp = React.lazy(
    () => import(/* webpackChunkName: "DemoApp" */ './Demo.app')
);

J.react.store.add('demoUser', demoUserSlice.reducer);

J.react.extensionAdd(
    DemoAppConst.extensionName,
    () => import(/* webpackChunkName: "GroupCreate" */ './Demo.app')
);

J.react.router.addRoute({
    path: DemoAppConst.route,
    element: (
        <React.Suspense fallback={<></>}>
            <DemoApp />
        </React.Suspense>
    ),
});
