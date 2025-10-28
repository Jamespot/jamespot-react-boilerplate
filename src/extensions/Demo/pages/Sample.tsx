import { useEffect } from 'react';
import { DemoForm } from '../components/DemoForm';
import { Results } from '../components/DemoResults';
import { fetchSearchDemoUsers } from '../redux/DemoUser';
import { useExtensionsDispatch, useExtensionsSelector } from '../redux/Store';
import { jCore } from '../../../libraries';

const Loader = jCore.registry.getLazyComponent('Loader');

/**
 * This component is one of the entry of your application
 * Here, it is a basic search / display component with basic use of a reducer & the jamespot-user-api
 */
const Sample = () => {
  const dispatch = useExtensionsDispatch();

  useEffect(() => {
    dispatch(fetchSearchDemoUsers({}));
  }, [dispatch]);

  const { entities, loading } = useExtensionsSelector((state) => state.extensions.demoUser);

  return (
    <>
      <DemoForm />
      {loading === 'pending' && (
        <div>
          <Loader size="m" />
        </div>
      )}
      {loading === 'idle' && <Results results={entities} />}
    </>
  );
};

export default Sample;
