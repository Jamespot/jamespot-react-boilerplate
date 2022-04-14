import React from 'react';
import { DemoAppConst } from './Demo.const';
import { demoUserSlice } from './redux/demoUser.slice';

const DemoApp = React.lazy(
    () => import(/* webpackChunkName: "DemoApp" */ './Demo.app')
);

JRCore.store.add('demoUser', demoUserSlice.reducer);

JRCore.extensionAdd(
    DemoAppConst.extensionName,
    () => import(/* webpackChunkName: "GroupCreate" */ './Demo.app')
);

JRCore.router.addRoute({
    path: DemoAppConst.route,
    element: (
        <React.Suspense fallback={<></>}>
            <DemoApp />
        </React.Suspense>
    ),
});
