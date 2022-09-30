import * as React from 'react';
import { DemoForm } from '../components/DemoForm';
import { Results } from '../components/DemoResults';
import { useDispatch, useSelector } from 'react-redux';
import { DemoRootState, fetchSearchDemoUsers } from '../redux/demoUser.slice';
import { Link } from 'react-router-dom';
import {fetchSearchUsers, ONE_STRING, setWord, UserRootState, WordState} from "jamespot-front-business";

/**
 * This component is one of the entry of your application
 * Here, it is a basic search / display component with basic use of a reducer & the jamespot-user-api
 */
function Example() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSearchDemoUsers());
        dispatch(fetchSearchUsers());
        dispatch(setWord());
    }, [dispatch]);

    const { entities, loading } = useSelector((state: DemoRootState) => {
        // console.log(state);
        return state.demoUser;
    });

    const { entities: entities2, loading: loading2 } = useSelector((state: UserRootState) => {
        console.log(state);
        return state.user;
    });
    const { word } = useSelector((state: { word: WordState }) => state.word);

    return (
        <>
            <p>{ONE_STRING}-{word}</p>
            <button onClick={() => dispatch(setWord())}>button</button>
            <Link to="/ng/rr/boilerplate/demo/another-screen">Accéder à la deuxième page de démonstration</Link>
            <DemoForm />
            {loading === 'idle' && <Results results={entities} />}
            <br/>
            {loading2 === 'idle' && <Results results={entities2} />}
        </>
    );
}

export default Example;
