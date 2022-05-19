import { ReactExtensionProps } from 'jamespot-react-core';

export const DemoAppConst: ReactExtensionProps = {
    extensionName: 'Demo',
    route: 'boilerplate/demo', // App url will be /ng/rr/boilerplate/demo
    idAnchor: 'boilerplate/demo', // The extension will be injected on a div with this id
    reducerName: 'demoReducer', // If we use reduce, we can specify the reducer name
    gabarit: 'app-1-cols',
};
