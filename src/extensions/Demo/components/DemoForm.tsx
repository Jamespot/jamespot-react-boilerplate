import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { fetchSearchDemoUsers, setKeyword } from '../redux/demoUser.slice';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import JRCore from 'jamespot-react-core';

/**
 * The components are styled with direct styling or with styled components
 */
const FormContainer = styled.form`
    display: flex;
`;

const InputWrapper = styled.div`
    width: 100%;
`;

const ButtonWrapper = styled.div`
    height: 99px;
    line-height: 99px;
`;

export type DemoFormProps = {
    keyword: string;
};

const InputText = JRCore.registry.getLazyComponent('InputText');
const Button = JRCore.registry.getLazyComponent('Button');

export function DemoForm() {
    const dispatch = useDispatch();
    const intl = useIntl();

    function handleSearchUsers(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(fetchSearchDemoUsers());
    }

    const { control } = useForm<DemoFormProps>({
        defaultValues: {
            keyword: '',
        },
        criteriaMode: 'all',
    });

    const keyword = useWatch({
        control,
        name: 'keyword',
    });

    React.useEffect(() => {
        dispatch(setKeyword(keyword));
    }, [dispatch, keyword]);

    return (
        <FormContainer onSubmit={handleSearchUsers}>
            <InputWrapper>
                <InputText
                    name="keyword"
                    label={intl.formatMessage({
                        id: 'DEMO_SEARCH_USER',
                    })}
                    rules={{ required: true }}
                    control={control}
                />
            </InputWrapper>
            <ButtonWrapper>
                <Button type="submit">
                    <FormattedMessage id="DEMO_SEARCH" />
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
}
