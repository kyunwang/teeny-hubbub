// Radial based on: https://scotch.io/tutorials/developing-a-creative-upload-interaction-with-javascript-and-canvas

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const containerStyle = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${containerStyle}
  z-index: 1;
  background-color: rgba(244, 243, 239, 0.8);
  background-image: radial-gradient(
    ellipse at 50% 120%,
    rgba(4, 72, 59, 1) 10%,
    rgba(4, 72, 59, 0) 40%
  );
  background-position: 0 300px;
  background-repeat: no-repeat;

  opacity: 0;
  visibility: hidden;

  transition: 0.5s;

  &:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      background-position: 0 0;
      opacity: 1;
      visibility: visible;
      transition-property: opacity;
    `}
`;

const Canvas = styled.canvas`
  ${containerStyle}
  z-index: -1;
`;

const FileInput = styled.input`
  display: none;
`;

const IconContainer = styled.div`
  position: relative;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  padding: 15px;
  border-radius: 100%;
  background-color: #643853;

  path {
    fill: rgba(244, 243, 239, 1);
  }
`;

const DropContainer = props => {
  const { inputRef } = props;

  const [isDragging, setDragging] = React.useState(false);

  return (
    <Container isDragging={isDragging}>
      <FileInput
        accept="audio/*"
        name="audio_file"
        ref={inputRef}
        type="file"
      ></FileInput>

      <Canvas></Canvas>

      <IconContainer>
        <svg viewBox="0 0 470 470">
          <path d="m158.7 177.15 62.8-62.8v273.9c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-273.9l62.8 62.8c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.8-85.8c-2.5-2.5-6-4-9.5-4-3.6 0-7 1.4-9.5 4l-85.8 85.8c-5.3 5.3-5.3 13.8 0 19.1 5.2 5.2 13.8 5.2 19 0z"></path>
        </svg>
      </IconContainer>
    </Container>
  );
};

DropContainer.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
DropContainer.defaultProps = {};

export default DropContainer;
