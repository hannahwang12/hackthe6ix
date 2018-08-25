import React, { Component } from 'react';

const styles = {
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
};

class WordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  render() {
    return (
      <div style={{fontSize: this.props.freq * 10}}>{this.props.word}{this.props.freq}</div>
    );
  }
}

export default WordComponent;