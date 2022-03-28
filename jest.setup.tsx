/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

const EmptyComponent = (props: any) => {
    return <>{props.children}</>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRegistry = (name: string): any => {
    return EmptyComponent;
};
(global as any).J = {
    react: {
        registry: {
            getLazyComponent: jest.fn(mockRegistry),
        },
    },
};
