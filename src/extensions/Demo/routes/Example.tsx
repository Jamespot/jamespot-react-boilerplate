import * as React from 'react';
import { DemoForm } from '../components/DemoForm';
import { Results } from '../components/DemoResults';
import { useDispatch, useSelector } from 'react-redux';
import { DemoRootState, fetchSearchDemoUsers } from '../redux/demoUser.slice';
import { Link } from 'react-router-dom';

/**
 * This component is one of the entry of your application
 * Here, it is a basic search / display component with basic use of a reducer & the jamespot-user-api
 */
function Example() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSearchDemoUsers());
    }, []);

    const { entities, loading } = useSelector((state: DemoRootState) => state.demoUser);

    return (
        <>
            <Link to="/ng/rr/boilerplate/demo/another-screen">Accéder à la deuxième page de démonstration</Link>
            <DemoForm />
            {loading === 'idle' && <Results results={entities} />}
        </>
    );
}

export default Example;
