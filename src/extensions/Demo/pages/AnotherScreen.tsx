import { FormattedMessage } from 'react-intl';

/**
 * This is another route component that you can try to change
 */
function AnotherScreen() {
  return (
    <p>
      <FormattedMessage id="ANOTHER_SCREEN_Edit_File" />
      <pre style={{ display: 'inline' }}>./src/extensions/Demo/pages/AnotherScreen.tsx</pre>.
    </p>
  );
}

export default AnotherScreen;
