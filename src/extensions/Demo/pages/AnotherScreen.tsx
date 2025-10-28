import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

/**
 * This is another route component that you can try to change
 */
function AnotherScreen() {
  const intl = useIntl();
  return (
    <>
      <p>
        <FormattedMessage id="ANOTHER_SCREEN_Edit_File" />
        <pre style={{ display: 'inline' }}>./src/extensions/Demo/pages/AnotherScreen.tsx</pre>.
      </p>

      <Link to="/ng/rr/boilerplate/demo/another-screen">{intl.formatMessage({ id: 'LINK_Sample' })}</Link>
    </>
  );
}

export default AnotherScreen;
