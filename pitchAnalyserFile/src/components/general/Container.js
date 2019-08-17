import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  /* height: 100vh; */
  /* width: 100vw; */
`;

const Container = props => <Wrapper {...props}>{props.children}</Wrapper>;

export default Container;
