import { ReactNode, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { jCore } from '../../../libraries';
import { fetchSearchSampleRouteUsers } from '../redux/SampleRouteUser';
import { useExtensionsDispatch } from '../redux/Store';

const InputText = jCore.registry.getLazyComponent('InputText');
const Button = jCore.registry.getLazyComponent('Button');

/**
 * The components are styled with direct styling or with styled components
 */
const FormContainer = styled.form`
  display: flex;
  align-items: end;
  gap: ${(props) => props.theme.space.sm}px;
  margin-bottom: ${(props) => props.theme.space.md}px;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.space.xs}px;
`;

type FormProps = {
  query: string;
};

export const Form = (): ReactNode => {
  const dispatch = useExtensionsDispatch();
  const intl = useIntl();

  const submit = useCallback(
    (data: FormProps) => {
      dispatch(fetchSearchSampleRouteUsers(data));
    },
    [dispatch],
  );

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      query: '',
    },
    criteriaMode: 'all',
  });

  return (
    <FormContainer onSubmit={handleSubmit(submit)}>
      <InputWrapper>
        <InputText
          name="query"
          control={control}
          label={intl.formatMessage({
            id: 'SAMPLE_Search_User',
          })}
          margin={'0'}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button type="submit" noMargin={true}>
          <FormattedMessage id="SAMPLE_Search" />
        </Button>
      </ButtonWrapper>
    </FormContainer>
  );
};
