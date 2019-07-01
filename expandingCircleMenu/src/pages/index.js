import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';
import MenuIcon from '../components/MenuIcon';

class MainPage extends PureComponent {
	state = {
		isMenuOpen: false,
	};

	onClickMenuIcon = () => {
		this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
	};

	render() {
		const { isMenuOpen } = this.state;

		console.log(isMenuOpen);

		return (
			<Container>
				<h1>Title</h1>
				<p>Paragraph</p>
				<MenuIcon handleOnClick={this.onClickMenuIcon} isOpen={isMenuOpen} />
			</Container>
		);
	}
}

export default MainPage;
