import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';
import MenuIcon from '../components/MenuIcon';

class MainPage extends PureComponent {
  state = {
    isMenuOpen: false,
  };

  onClickMenuIcon = () => {};

  render() {
    const { isMenuOpen } = this.state;

    return (
      <Container>
        <h1>Title</h1>
        <p>Paragraph</p>
        <MenuIcon onClick={this.onClickMenuIcon} isOpen={isMenuOpen} />
      </Container>
    );
  }
}

export default MainPage;
