import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { fetchSearchDemoUsers, setKeyword } from '../redux/demoUser.slice';
import { JRCButtonProps, JRCInputFieldProps } from 'jamespot-react-components';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

const FormContainer = styled.div`
    display: flex;
`;

const InputWrapper = styled.div`
    width: 100%;
`;

const ButtonWrapper = styled.div`
    height: 99px;
    line-height: 99px;
`;

export type DemoFomProps = {
    keyword: string;
};

const InputTitle =
    JRCore.registry.getLazyComponent<JRCInputFieldProps<DemoFomProps>>(
        'InputText'
    );
const Button = JRCore.registry.getLazyComponent<JRCButtonProps>('Button');

export const DemoForm: React.FC<any> = () => {
    const dispatch = useDispatch();
    const intl = useIntl();

    function handleSearchUsers() {
        dispatch(fetchSearchDemoUsers());
    }
    const { control } = useForm<DemoFomProps>({
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
    }, [keyword]);

    return (
        <FormContainer>
            <InputWrapper>
                <InputTitle
                    name="keyword"
                    label={intl.formatMessage({
                        id: 'DEMO_SEARCH_USER',
                    })}
                    rules={{ required: true }}
                    control={control as any}
                />
            </InputWrapper>
            <ButtonWrapper>
                <Button onClick={handleSearchUsers}>
                    <FormattedMessage id="DEMO_SEARCH" />
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};
