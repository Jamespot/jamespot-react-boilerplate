import { ReactExtension, createExtension, mountRootExtension } from 'jamespot-react-core';
import { Widget } from './components/Widget';

type AppArgs = { anchorId: string };

const App: ReactExtension = createExtension({
  initExtension(args: AppArgs): void {
    mountRootExtension(App, <Widget />, args.anchorId);
  },
});

export default App;
