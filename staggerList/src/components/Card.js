import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 6.4rem;
  background-color: #fff;
  border-radius: 0.8rem;
  /* overflow: hidden; */
  margin-top: 1.2rem;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Card = () => {
  const item = {
    hidden: { opacity: 0, y: 200 },
    show: { opacity: 1, y: 0 },
    hover: {
      scale: 1.1,
      transition: { duration: 1 },
    },
    tap: { scale: 0.9 },
  };

  // const item = {
  //   hidden: { opacity: 0, transform: { translateY: '-300%' }, y: 200 },
  //   show: { opacity: 1, transform: { translateY: '-300%' }, y: 0 },
  // };

  return (
    <Container variants={item} whileHover="hover" whileTap="tap">
      <p>text</p>
    </Container>
  );
};

Card.propTypes = {};
Card.defaultProps = {};

export default Card;
