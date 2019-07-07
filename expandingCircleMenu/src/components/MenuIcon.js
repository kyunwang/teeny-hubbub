import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
	position: fixed;
	top: 1.6rem;
	right: 1.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.color.primary};
	height: 3.2rem;
	width: 3.2rem;
	border-radius: 50%;
	border-color: #fff;
	padding: 0.8rem;

	/* Above Navigation(NavContainer) - which is 998 */
	z-index: 999;

	transition: transform ${({ theme }) => theme.transition.duration.short}ms
		ease-in-out;

	&:hover {
		transform: scale(1.2);
	}
`;

const Bar = styled.div`
	display: inline-block;
	width: 20px;
	height: 2px;
	background: #fff;
	transform-origin: top left;
`;

const MenuIcon = ({ isOpen, handleOnClick }) => (
	<Container onClick={handleOnClick}>
		<Bar></Bar>
	</Container>
);

MenuIcon.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleOnClick: PropTypes.func.isRequired,
};

export default MenuIcon;
