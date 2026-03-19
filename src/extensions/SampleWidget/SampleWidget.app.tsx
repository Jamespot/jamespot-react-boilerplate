import { ReactExtension, createExtension } from 'jamespot-react-core';
import { Widget } from './components/Widget';

const App: ReactExtension = createExtension({
  component: () => <Widget />,
});

export default App;
