import React from 'react';
import styled from 'styled-components';
import { Content } from './Content';
import { ListContent } from '@components/ListContent';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
`;

const Left = styled.div`
  width: 15%;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Left />
      <Content />
      <ListContent />
    </Wrapper>
  );
};

export default App;
