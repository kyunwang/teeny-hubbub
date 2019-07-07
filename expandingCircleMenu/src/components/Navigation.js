import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useSpring, useTransition, useTrail, animated } from 'react-spring';
import { Link } from 'gatsby';

const defLinks = [
	{ title: 'Pineapple', link: '/pineapple' },
	{ title: 'Strawberry', link: '/strawberry' },
	{ title: 'Peach', link: '/peach' },
	{ title: 'Banana', link: '/banana' },
];

const NavContainer = styled.div`
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
	background: ${({ theme }) => theme.color.secondary};
	height: 3.2rem;
	width: 3.2rem;
	border-radius: 50%;
	padding: 0.8rem;
`;

const LinksContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: relative;
	top: 50%;
	right: 2.4rem;
	bottom: auto;
	transform: translateY(-50%);
	font-size: 3rem;
	text-align: right;
	line-height: 1.2;

	${({ theme }) =>
		theme.breakpoint.small(`
			top: 40%;
			font-size: 2.4rem;
	`)}
`;

const LinkItem = styled(animated.li)`
	position: relative;
	display: inline-block;
	transform-origin: top right;
	overflow: hidden;
	color: ${({ theme }) => theme.color.primary};
`;

const StyledTitle = styled.p`
	position: relative;

	${({ theme }) => `
		transition: opacity 666ms ${theme.transition.bezier.easeOutQuint},
								transform 666ms ${theme.transition.bezier.easeOutQuint};
	`}

	&:hover {
		transform: translateX(-12%);
	}

	&::before {
		content: '';
		display: inline-block;
		position: absolute;
		height: 2px;
		width: 1.2rem;
		background: ${({ theme }) => theme.color.primary};
		right: -8%;
		top: 50%;
		transform: translateY(-50%);
	}
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
		delay: 300,
		config,
	},
};

const Navigation = ({ isOpen }) => {
	const springScaling = useSpring(!isOpen ? scaling.closed : scaling.open);

	const springLinks = useTrail(defLinks.length, {
		from: { opacity: 0, transform: 'scale(0)' },
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'scale(1)' : 'scale(0)',
		reverse: isOpen ? false : true,
	});

	return (
		<NavContainer>
			<NavBG style={springScaling}></NavBG>

			<LinksContainer>
				{springLinks.map((props, index) => (
					<LinkItem key={defLinks[index].title} style={props}>
						<Link>
							<StyledTitle>{defLinks[index].title}</StyledTitle>
						</Link>
					</LinkItem>
				))}
			</LinksContainer>
		</NavContainer>
	);
};

Navigation.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Navigation;
