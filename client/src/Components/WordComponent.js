import React, { Component } from 'react';
import randomColor from 'randomcolor';

const styles = {
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  },
  color: () => randomColor({
    hue: 'blue'
  }),
};

class WordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  render() {
    return (
      <div style={{fontSize: this.props.freq * 5 }}>{this.props.word}</div>
    );
  }
}

export default WordComponent;