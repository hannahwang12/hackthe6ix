import React, { Component } from 'react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import WordComponent from '../components/WordComponent.js';

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

class WordCloudComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  iterateWords = (word, freq) => {
    return <WordComponent word={word} freq={freq}/>
  }

  render() {
    const words = this.props.words;
    return (
      <div className="wordCloud">
        <TagCloud 
          className="tag-cloud"
          style={{
            fontFamily: 'sans-serif',
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: () => randomColor({
              hue: 'blue'
            }),
            padding: 5,
            width: '100%',
            height: '100%'
          }}>
          {Object.entries(words).map((elem) => this.iterateWords(elem[0], elem[1]))}
        </TagCloud>
      </div>
    );
  }
}

export default WordCloudComponent;