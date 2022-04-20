import * as React from 'react';
import loadResource from './translation';
import { Demo } from './components/Demo.screen';
import { ExtensionProvider } from 'jamespot-react-core';

loadResource();

const App = () => (
    <React.Suspense fallback={<></>}>
        <ExtensionProvider>
            <Demo />
        </ExtensionProvider>
    </React.Suspense>
);

export default App;
