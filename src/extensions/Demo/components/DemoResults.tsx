import { jObjectLittle } from 'jamespot-user-api';
import { jCore } from '../../../libraries';
import styled from 'styled-components';

const Tag = jCore.registry.getLazyComponent('Tag');

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xs}px;
`;

export const Results = ({ results }: { results: jObjectLittle[] }) => {
  return (
    <Wrapper>
      {results.map((entity) => (
        <Tag key={entity.id} uri={entity.uri} label={entity.title} />
      ))}
    </Wrapper>
  );
};
