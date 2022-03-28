import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DemoRootState } from '../redux/demoUser.slice';
import { DemoForm } from './Demo.form';
import { Results } from './Results.component';

const DemoContainer = styled.div`
    padding: 40px;
`;

export const Demo: React.FC<any> = () => {
    const { entities, loading } = useSelector(
        (state: DemoRootState) => state.demoUser
    );

    return (
        <DemoContainer>
            <DemoForm />
            <div>
                {loading === 'pending' ? (
                    <span>Loading</span>
                ) : (
                    <Results results={entities} />
                )}
            </div>
        </DemoContainer>
    );
};
