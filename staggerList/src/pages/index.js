import React from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';

import CardList from '../components/CardList';

const Wrapper = styled.div`
  width: 28rem;
  height: 54rem;
  background: #fbf9f3;
`;

export default () => (
  <Container>
    {/* <h1>Title</h1>
    <p>Paragraph</p> */}
    <Wrapper>
      <CardList />
    </Wrapper>
  </Container>
);
