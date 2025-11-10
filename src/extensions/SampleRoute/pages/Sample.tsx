import { ReactNode, useEffect } from 'react';
import { jCore } from '../../../libraries';
import { Form } from '../components/Form';
import { Results } from '../components/Results';
import { fetchSearchSampleRouteUsers } from '../redux/SampleRouteUser';
import { useExtensionsDispatch, useExtensionsSelector } from '../redux/Store';

const Loader = jCore.registry.getLazyComponent('Loader');

/**
 * This component is one of the entry of your application
 * Here, it is a basic search / display component with basic use of a reducer & the jamespot-user-api
 */
const Sample = (): ReactNode => {
  const dispatch = useExtensionsDispatch();

  useEffect(() => {
    dispatch(fetchSearchSampleRouteUsers({}));
  }, [dispatch]);

  const { entities, loading } = useExtensionsSelector((state) => state.extensions.sampleRouteUser);

  return (
    <>
      <Form />
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
