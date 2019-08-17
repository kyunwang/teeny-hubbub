import styled, { css } from 'styled-components';

const containerStyle = css`
  position: absolute;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  height: 100vh;
  width: 100vw;
`;

const DropField = styled.div`
  ${containerStyle}
  z-index: 1;

  /* background-color: #ebf2ea; */
  background-color: #1a1a1a;
`;

const Container = styled.div`
  ${containerStyle}
  background-color: rgba(0, 0, 0, 0.8);
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

      pointer-events: none;

      * {
        pointer-events: none;
      }
    `}
`;

const Canvas = styled.canvas`
  ${containerStyle} /* z-index: -1; */
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
  /* background-color: #643853; */
  background-color: #5659f9;
  /* background-color: #ebf2ea; */

  path {
    fill: rgba(244, 243, 239, 1);
  }
`;

export { DropField, Container, Canvas, FileInput, IconContainer };
