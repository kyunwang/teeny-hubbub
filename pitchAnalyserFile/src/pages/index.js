import React from 'react';
// import styled from 'styled-components';
import Container from '../components/general/Container';
// import DropContainer from '../components/DropContainer';

import { fileAnalyse } from 'pitch-analyser';

class MainPage extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  fileInputRef = React.createRef();

  state = {};

  handleClick = () => {
    if (!this.fileInputRef.current.files[0]) return;

    // const audioURL = URL.createObjectURL(this.fileInputRef.current.files[0]);

    fileAnalyse({
      audioFile: this.fileInputRef.current.files[0],
      callback: result => {
        console.log(result);
      },
      returnCents: true,
    });
  };

  render() {
    return (
      <Container>
        {/* <DropContainer inputRef={this.fileInputRef} /> */}
        <input
          accept="audio/*"
          name="audio_file"
          ref={this.fileInputRef}
          type="file"
        ></input>
        <button onClick={this.handleClick}>Analyze</button>
      </Container>
    );
  }
}

export default MainPage;
