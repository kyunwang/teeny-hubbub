// Radial based on: https://scotch.io/tutorials/developing-a-creative-upload-interaction-with-javascript-and-canvas

import React, {
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import anime from 'animejs';

import { PureComponent } from 'react';

const containerStyle = css`
  position: absolute;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  height: 100vh;
  width: 100vw;
`;

const DropField = styled.div`
  ${containerStyle}
  z-index: 1;

  /* background-color: #ebf2ea; */
  background-color: #1a1a1a;
`;

const Container = styled.div`
  ${containerStyle}
  background-color: rgba(0, 0, 0, 0.8);
  background-position: 0 300px;
  background-repeat: no-repeat;

  opacity: 0;
  visibility: hidden;

  transition: 0.5s;

  &:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  ${({ isDragging }) =>
    isDragging &&
    css`
      background-position: 0 0;
      opacity: 1;
      visibility: visible;
      transition-property: opacity;

      pointer-events: none;

      * {
        pointer-events: none;
      }
    `}
`;

const Canvas = styled.canvas`
  ${containerStyle} /* z-index: -1; */
`;

const FileInput = styled.input`
  display: none;
`;

const IconContainer = styled.div`
  position: relative;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  width: 80px;
  height: 80px;
  padding: 15px;
  border-radius: 100%;
  /* background-color: #643853; */
  background-color: #5659f9;
  /* background-color: #ebf2ea; */

  path {
    fill: rgba(244, 243, 239, 1);
  }
`;

// Random utility
function rand(value) {
  return Math.random() * value - value / 2;
}

const particles = [];
let iconParticlesCount = 1;
let animatingUpload = false;
let playingIconAnimation = false;
let iconAnimationFrame;

let context;
let canvasWidth;
let canvasHeight;

class DropContainer extends PureComponent {
  static propTypes = {
    inputRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
  };
  static defaultProps = {};

  inputRef = createRef(null);
  iconRef = createRef(null);
  canvasRef = createRef(null);

  state = {
    isDragging: false,
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;

    canvasWidth = canvas.width = canvas.offsetWidth;
    canvasHeight = canvas.height = canvas.offsetHeight;
    context = canvas.getContext('2d');

    // this.
    this.initIconParticles();
    this.initIconAnimation();

    // playIconAnimation();

    window.addEventListener('resize', () => {
      // const canvas = this.canvasRef.current;
      canvas.width = window.innerHeight;
      canvasWidth = canvas.width = canvas.offsetWidth;
      canvasHeight = canvas.height = canvas.offsetHeight;
      this.resetAll();
      // this.loadingInit();
    });

    // window.addEventListener('dragover', event => {
    //   this.overrideEventDefaults(event);
    // });
    // window.addEventListener('drop', event => {
    //   this.overrideEventDefaults(event);
    // });
  }

  componentWillUnmount() {
    // window.removeEventListener('dragover', this.overrideEventDefaults);
    // window.removeEventListener('drop', this.overrideEventDefaults);
  }

  overrideEventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  createParticle = args => {
    const options = args || {};

    const particle = {
      x: options.x,
      y: options.y,
      vx: options.vx,
      vy: options.vy,
      life: 0,
      death: options.death || Math.random() * 200,
      size: options.size || Math.floor(Math.random() * 2 + 3),
    };

    particles.push(particle);
  };

  addIconParticles = () => {
    const iconRect = this.iconRef.current.getBoundingClientRect(); // Get icon dimensions

    let i = iconParticlesCount; // How many to add?

    while (i--) {
      const particle = {
        x: iconRect.left + iconRect.width / 2 + rand(iconRect.width - 10),
        y: iconRect.top + iconRect.height / 2,
        vx: 0,
        vy: Math.random() * 2 * iconParticlesCount,
      };

      this.createParticle(particle);
    }
  };

  // Update & remove dead ones
  updateParticles = () => {
    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index];

      if (particle.life > particle.death) {
        particles.splice(index, 1);
      } else {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
      }
    }
  };

  // Clear canvas and redraw everything
  renderParticles = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index];

      context.fillStyle = `rgba(86, 89, 249, ${1 -
        particle.life / particle.death})`;
      // context.fillStyle = `rgba(255, 255, 255, ${1 -
      //   particle.life / particle.death})`;
      context.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
  };

  // Add 100 particles for the icon (without render), so the animation will not look empty at first
  initIconParticles = () => {
    let iconParticlesInitialLoop = 100;
    while (iconParticlesInitialLoop--) {
      this.addIconParticles();
      this.updateParticles();
    }
  };

  // Alternating animation for the icon to translate in the `y` axis
  initIconAnimation = () => {
    const iconAnimation = anime({
      targets: this.iconRef.current,
      translateY: -10,
      duration: 800,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true,
      autoplay: false, // don't execute the animation yet, only on `drag` events (see later)
    });

    this.setState({ iconAnimation });
  };

  // // Loop to redraw the particles on every frame
  loop = () => {
    this.addIconParticles(); // add new particles for the upload icon
    this.updateParticles(); // update all particles
    this.renderParticles(); // clear `canvas` and draw all particles
    iconAnimationFrame = requestAnimationFrame(this.loop); // loop
  };

  resetAll = () => {
    // animatingUpload = false;
    // cancelAnimationFrame(iconAnimationFrame);
    // this.pauseIconAnimation();
    // anime({
    //   targets: this.iconRef.current,
    //   translateY: 0,
    //   scale: 1,
    //   duration: 0,
    // });
    // particles = [];
    // iconParticlesCount = 1;
    // this.renderParticles();
    // this.initIconParticles();
    // this.initIconAnimation();
  };

  uploadIconAnimation = () => {
    const iconRect = this.iconRef.current.getBoundingClientRect();

    iconParticlesCount += 2; // add more per frame for speed up
    anime.remove({
      targets: this.iconRef.current,
      translateY: {
        value: -canvasHeight / 2 - iconRect.height,
        duration: 1000,
        easing: 'easeInBack',
      },
      scale: {
        value: '+=0.1',
        duration: 2000,
        elasticity: 800,
        complete: () => {
          // reset all animation
          setTimeout(this.resetAll, 0);
        },
      },
    });
  };

  // Play the icon animation (`translateY` and particles)
  playIconAnimation = () => {
    const { iconAnimation } = this.state;

    if (!playingIconAnimation) {
      playingIconAnimation = true;
      iconAnimation.play();
      iconAnimationFrame = requestAnimationFrame(this.loop);
    }
  };

  pauseIconAnimation = () => {
    const { iconAnimation } = this.state;

    if (playingIconAnimation) {
      playingIconAnimation = false;
      iconAnimation.pause();
      cancelAnimationFrame(iconAnimationFrame);
    }
  };

  onDragEnter = e => {
    this.overrideEventDefaults(e);

    if (!animatingUpload) {
      this.playIconAnimation();
      this.setState(() => ({ isDragging: true }));
    }
  };

  onDragLeave = e => {
    this.overrideEventDefaults(e);

    if (!animatingUpload) {
      this.pauseIconAnimation();
      this.setState(() => ({ isDragging: false }));
    }
  };

  onDrop = e => {
    this.overrideEventDefaults(e);

    if (!animatingUpload) {
      let droppedFiles = e.dataTransfer.files; // The dropped files
      let filesCount = droppedFiles.length;

      if (filesCount) {
        console.log(22222);
        animatingUpload = true;

        let index = filesCount;

        while (index--) {
          this.addParticlesOnDrop(
            e.pageX + (index ? rand(100) : 0),
            e.pageY + (index ? rand(100) : 0),
            200 * index
          );
        }

        // Hide the upload component after the animation
        setTimeout(() => {
          this.setState({ isDragging: false });
        }, 1500 + filesCount * 150);

        // Trigger submission or the like here if needed
      }
    } else {
      this.pauseIconAnimation();
    }
  };

  // Create particles on dropping
  addParticlesOnDrop = (x, y, delay) => {
    //
    let index = delay ? 0 : 20;
    const iconRect = this.iconRef.current.getBoundingClientRect();

    while (index--) {
      const particle = {
        x: x + rand(30),
        y: y + rand(30),
        vx: rand(2),
        vy: rand(2),
        death: 60,
      };
      this.createParticle(particle);
    }

    // Add particles on drop location
    anime({
      targets: { x, y },
      x: iconRect.left + iconRect.width / 2,
      y: iconRect.top + iconRect.height / 2,
      duration: 500,
      delay: delay || 0,
      easing: 'easeInQuad',
      run: anim => {
        const target = anim.animatables[0].target;
        let index = 10;
        while (index--) {
          const particle = {
            x: target.x + rand(30),
            y: target.y + rand(30),
            vx: rand(2),
            vy: rand(2),
            death: 60,
          };
          this.createParticle(particle);
        }
      },
      complete: this.uploadIconAnimation, // end of the anim
    });
  };

  render() {
    const { isDragging } = this.state;
    const { inputRef } = this.props;

    return (
      <DropField
        onDragEnter={this.onDragEnter}
        // onDragStart={this.onDragEnter}
        // onDragOver={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragEnd={this.onDragLeave}
        onClick={this.onDragEnter}
        onDrag={this.overrideEventDefaults}
        onDragStart={this.overrideEventDefaults}
        onDragEnd={this.overrideEventDefaults}
        onDragOver={this.overrideEventDefaults}
        onDrop={this.onDrop}
        isDragging={isDragging}
      >
        <Container isDragging={isDragging}>
          <FileInput
            accept="audio/*"
            name="audio_file"
            ref={inputRef}
            type="file"
          ></FileInput>

          <Canvas ref={this.canvasRef}></Canvas>

          <IconContainer ref={this.iconRef}>
            <svg viewBox="0 0 470 470">
              <path d="m158.7 177.15 62.8-62.8v273.9c0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5v-273.9l62.8 62.8c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.8-85.8c-2.5-2.5-6-4-9.5-4-3.6 0-7 1.4-9.5 4l-85.8 85.8c-5.3 5.3-5.3 13.8 0 19.1 5.2 5.2 13.8 5.2 19 0z"></path>
            </svg>
          </IconContainer>
        </Container>
      </DropField>
    );
  }
}

export default DropContainer;
