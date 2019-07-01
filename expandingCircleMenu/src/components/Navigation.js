import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useSpring, animated, interpolate } from 'react-spring';
// import Navigation from './Navigation';

const Container = styled(animated.div)`
	position: fixed;
	top: 1.6rem;
	right: 1.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #27638d;
	height: 3rem;
	width: 3rem;
	border-radius: 50%;
	padding: 0.8rem;
`;

// class Navigation extends PureComponent {
// 	render() {
// 		return <Container>hello</Container>;
// 	}
// }
const config = { mass: 5, tension: 500, friction: 90 };
const scaling = {
	open: {
		transform: 'scale(100)',
		config,
	},
	closed: {
		transform: 'scale(1)',
		config,
	},
};

const Navigation = ({ isOpen }) => {
	const springScaling = useSpring(!isOpen ? scaling.closed : scaling.open);

	return <Container style={springScaling}></Container>;
};

Navigation.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Navigation;
