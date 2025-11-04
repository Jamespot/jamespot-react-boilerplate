import { jObjectLittle } from 'jamespot-user-api';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { jCore } from '../../../libraries';

const Tag = jCore.registry.getLazyComponent('Tag');

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xs}px;
`;

export const Results = ({ results }: { results: jObjectLittle[] }): ReactNode => {
  return (
    <Wrapper>
      {results.map((entity) => (
        <Tag key={entity.id} uri={entity.uri} label={entity.title} />
      ))}
    </Wrapper>
  );
};
