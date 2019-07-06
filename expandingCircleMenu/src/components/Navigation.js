import React, {
	PureComponent,
	useRef,
	useState,
	useEffect,
	useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
	useSpring,
	useTransition,
	useTrail,
	animated,
	interpolate,
} from 'react-spring';
// import Navigation from './Navigation';
import { Link } from 'gatsby';

const defLinks = [
	{ title: 'Pineapple', link: '/pineapple' },
	{ title: 'Strawberry', link: '/strawberry' },
	{ title: 'Peach', link: '/peach' },
	{ title: 'Banana', link: '/banana' },
];

const NavContainer = styled.div`
	font-family: 'josefin sans', 'work sans', sans-serif;
	font-style: italic;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	/* Below menu icon - which is 999*/
	z-index: 998;
`;

const NavBG = styled(animated.div)`
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

const NavLinksContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: relative;

	top: 50%;
	right: 2.4rem;
	bottom: auto;
	transform: translateY(-50%);

	font-size: 3rem;
	text-align: right;
	color: #fff;
	line-height: 1.2;

	${({ theme }) =>
		theme.breakpoints.small(`
			top: 40%;
			font-size: 2.4rem;
	`)}
`;

const NavLink = styled(animated.li)`
	position: relative;
	display: inline-block;
	transform-origin: top right;
	/* line-height: 1.2; */
`;

// Spring config
const config = { mass: 5, tension: 500, friction: 120 };
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

	//  likely use trail
	const transitions = useTransition(defLinks, link => link.link, {
		from: { opacity: 0, transform: 'scale(0)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
		update: {
			opacity: isOpen ? 1 : 0,
			transform: isOpen ? 'scale(1)' : 'scale(0)',
		},
		// reverse: isOpen ? false : true,
		trail: 150,
	});

	return (
		<NavContainer>
			<NavBG style={springScaling}></NavBG>
			<NavLinksContainer>
				{transitions.map(({ item, props, key }) => (
					<NavLink key={key} style={props}>
						{item.title}
					</NavLink>
				))}
			</NavLinksContainer>
		</NavContainer>
	);
};

Navigation.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Navigation;
