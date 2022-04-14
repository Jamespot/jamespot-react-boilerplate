import * as React from 'react';
import loadResource from './translation';
import { Demo } from './components/Demo.screen';
import { ExtensionProviderProps } from 'jamespot-react-core';

loadResource();

const ExtensionProvider =
    JRCore.registry.getLazyComponent<ExtensionProviderProps>(
        'ExtensionProvider'
    );

const App = () => (
    <React.Suspense fallback={<></>}>
        <ExtensionProvider>
            <Demo />
        </ExtensionProvider>
    </React.Suspense>
);

export default App;
