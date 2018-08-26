import React, { Component } from 'react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import WordComponent from '../components/WordComponent.js';
import words from '../components/words.json'

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

  getWordFrequencies = () => {
    const words = this.props.getWordFrequencies();
  }

  iterateWords = (word, freq) => {
    console.log('iterate')
    return <WordComponent word={word} freq={freq}/>
  }

  render() {
    const words = this.props.words;
    console.log('render')
    console.log(words)
    Object.keys(words).forEach((key) => {
            console.log(key);
            console.log(words[key]);
            return this.iterateWords(key, words[key]);
          })
    return (
      <div className="wordCloud">
        <TagCloud 
          className="tag-cloud"
          style={{
            fontFamily: 'sans-serif',
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'blue',
            padding: 5,
            width: '100%',
            height: '100%'
          }}>
          {Object.keys(words).forEach((key) => {
            console.log(key);
            console.log(words[key]);
            return this.iterateWords(key, words[key]);
          })}
          <div>word cloud text</div>
        </TagCloud>
      </div>
    );
  }
}

export default WordCloudComponent;