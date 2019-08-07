import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Card from './Card';

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
`;

const CardList = () => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <Container
      variants={variants}
      initial="hidden"
      animate="show"
      drag="x"
      dragConstraints={{ left: 0, right: 300 }}
      dragElastic={0.2}
    >
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

CardList.propTypes = {};
CardList.defaultProps = {};

export default CardList;
