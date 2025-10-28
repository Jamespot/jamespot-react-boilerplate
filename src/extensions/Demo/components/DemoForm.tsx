import { FormEvent, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { jCore } from '../../../libraries';
import { fetchSearchDemoUsers, setKeyword } from '../redux/DemoUser';
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

export type DemoFormProps = {
  keyword: string;
};

export function DemoForm() {
  const dispatch = useExtensionsDispatch();
  const intl = useIntl();

  function handleSearchUsers(e: FormEvent<HTMLFormElement>) {
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

  useEffect(() => {
    dispatch(setKeyword(keyword));
  }, [dispatch, keyword]);

  return (
    <FormContainer onSubmit={handleSearchUsers}>
      <InputWrapper>
        <InputText
          name="keyword"
          control={control}
          label={intl.formatMessage({
            id: 'SAMPLE_Search_User',
          })}
          rules={{ required: true }}
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
}
