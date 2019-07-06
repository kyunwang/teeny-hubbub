import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';
import MenuIcon from '../components/MenuIcon';
import Navigation from '../components/Navigation';

class MainPage extends PureComponent {
	state = {
		isMenuOpen: false,
	};

	onClickMenuIcon = () => {
		this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
	};

	render() {
		const { isMenuOpen } = this.state;

		return (
			<Container>
				<MenuIcon handleOnClick={this.onClickMenuIcon} isOpen={isMenuOpen} />
				<Navigation isOpen={isMenuOpen} />
			</Container>
		);
	}
}

export default MainPage;
