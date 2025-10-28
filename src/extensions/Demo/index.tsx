import { lazy, Suspense } from 'react';
import { jCore } from '../../libraries';
import { DemoAppConst, ROUTES } from './Demo.const';
import { DemoUser } from './redux/DemoUser';
import loadResource from './translation';

const Layout = lazy(() => import('./Layout'));
const Sample = lazy(() => import('./pages/Sample'));
const AnotherScreen = lazy(() => import('./pages/AnotherScreen'));

loadResource();

/**
 * Load reducer if any
 */
jCore.store.addExtensionStore(DemoUser.slice.name, DemoUser.slice.reducer);

/**
 * Register extension routes
 */
jCore.router.addRoute({
  path: DemoAppConst.route,
  element: (
    <Suspense fallback={<></>}>
      <Layout />
    </Suspense>
  ),
  children: [
    {
      path: ROUTES.EXAMPLE.path,
      element: (
        <Suspense fallback={<></>}>
          <Sample />
        </Suspense>
      ),
    },
    {
      path: ROUTES.ANOTHER_SCREEN.path,
      element: (
        <Suspense fallback={<></>}>
          <AnotherScreen />
        </Suspense>
      ),
    },
  ],
});
