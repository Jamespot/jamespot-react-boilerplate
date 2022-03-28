import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import type { ReactExtension } from 'jamespot-react-core';

import loadResource from './translation';
import { JRCThemeProviderProps } from 'jamespot-react-components';
import { Demo } from './components/Demo.screen';
import { DemoApp } from './Demo.const';

loadResource();

const ThemeProvider =
    J.react.registry.getLazyComponent<JRCThemeProviderProps>('ThemeProvider');

const App: ReactExtension = {
    initExtension: function (): void {
        const appNode = document.getElementById(DemoApp.idAnchor);
        ReactDOM.unmountComponentAtNode(appNode);

        ReactDOM.render(
            <Provider store={J.react.store}>
                <IntlProvider
                    locale={J.react.locale}
                    messages={J.react.translation.get(J.react.locale)}
                >
                    <React.Fragment>
                        <React.Suspense fallback={<></>}>
                            <ThemeProvider>
                                <Demo />
                            </ThemeProvider>
                        </React.Suspense>
                    </React.Fragment>
                </IntlProvider>
            </Provider>,
            appNode
        );
    },
};

export default App;
