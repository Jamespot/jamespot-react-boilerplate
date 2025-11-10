import { lazy, Suspense } from 'react';
import { jCore } from '../../libraries';
import { SampleRouteExtensionConst, ROUTES } from './SampleRoute.const';
import { SampleRouteUser } from './redux/SampleRouteUser';
import loadResource from './translation';

const Layout = lazy(() => import('./Layout'));
const Sample = lazy(() => import('./pages/Sample'));
const AnotherScreen = lazy(() => import('./pages/AnotherScreen'));

loadResource();

/**
 * Load reducer if any
 */
jCore.store.addExtensionStore(SampleRouteUser.slice.name, SampleRouteUser.slice.reducer);

/**
 * Register extension routes
 */
jCore.router.addRoute({
  path: SampleRouteExtensionConst.route,
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
