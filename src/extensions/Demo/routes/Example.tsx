import * as React from 'react';
import { DemoForm } from "../components/DemoForm";
import { Results } from "../components/DemoResults";
import { useDispatch, useSelector } from "react-redux";
import { DemoRootState, fetchSearchDemoUsers } from "../redux/demoUser.slice";

/**
 * This component is one of the entry of your application
 * Here, it is a basic search / display component with basic use of a reducer & the jamespot-user-api
 */
function Example() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSearchDemoUsers());
    }, []);

    const { entities, loading } = useSelector(
        (state: DemoRootState) => state.demoUser
    );

    return (
        <>
            <DemoForm />
            {!loading && <Results results={entities} />}
        </>
    )
}

export default Example;
