import React from 'react';
import './stylesheet.css';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ""
    };
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name
    });
  }
  render() {
    return (
      <div id="drum-machine">
        <div id="outer-display">
          <p id="display">{this.state.display}</p>
        </div>
        <PadBank
          updateDisplay={this.displayClipName}
          />
      </div>
    )
  }
}

const activeStyle = {
  backgroundColor: "#16a4f8",
  boxShadow: "0px 0px 10px #1694f8"
};

const inactiveStyle = {
  backgroundColor: "#565458"
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  activatePad() {
    if (this.state.padStyle == activeStyle) {
      this.setState({
        padStyle: inactiveStyle
      });
    } else {
      this.setState({
        padStyle: activeStyle
      });
    }
  }
  
  handleKeyPress(e) {
    if (e.keyCode == this.props.keyCode) {
      this.playSound();
    }
  }
  
  playSound() {
    var sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0.00;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.clipId}
        onMouseDown={this.playSound}
        style={this.state.padStyle}
      >
        <audio 
          src={this.props.clip}
          id={this.props.keyTrigger}
          className="clip"
        />
        <p>{this.props.keyTrigger}</p>
      </div>
    )
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    padBank = bankOne.map( (x, i, bank) => {
      return(
        <DrumPad
          clip={bank[i].url}
          clipId={bank[i].id}
          keyCode={bank[i].keyCode}
          keyTrigger={bank[i].keyTrigger}
          updateDisplay={this.props.updateDisplay}
        />
      );
    });
    return (
    <div id="pad-bank">{padBank}</div>
    )
  }
}


export default App;
