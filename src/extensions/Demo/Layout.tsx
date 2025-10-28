import { jCore } from '../../libraries';
import { DemoAppConst, ROUTES } from './Demo.const';

const TwoColLayout = jCore.registry.getLazyComponent('TwoColLayout');

/**
 * App description that will be displayed in the left column
 * Alternatively, if you are writing an extension which has a backend hook, you can get the hook description with:
 * const DESCRIPTION = J.applications.find((app) => app.name === DemoAppConst.moduleName);
 */
const SAMPLE_DESCRIPTION = {
  icon: 'edit',
  color: '#EA80CA',
  label: 'SAMPLE_App_Title',
  description: 'SAMPLE_App_Description',
};

/**
 * The layout defines how your app is going to be presented. You may use the TwoColLayout or a custom one.
 * The TwoColLayout handles a left app descriptive column and a main one.
 */
const Layout = () => {
  return <TwoColLayout description={SAMPLE_DESCRIPTION} routes={ROUTES} extensionRoute={DemoAppConst.route} />;
};

export default Layout;
