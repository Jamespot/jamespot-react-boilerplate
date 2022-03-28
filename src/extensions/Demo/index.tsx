import { DemoApp } from './Demo.const';
import { demoUserSlice } from './redux/demoUser.slice';

J.react.store.add('demoUser', demoUserSlice.reducer);

J.react.extensionAdd(
    DemoApp.extensionName,
    () => import(/* webpackChunkName: "GroupCreate" */ './Demo.app')
);

J.react.routeAdd(
    DemoApp.route,
    DemoApp.extensionName,
    DemoApp.idAnchor,
    DemoApp.gabarit
);
