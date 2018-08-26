import React, { Component } from 'react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import WordComponent from '../components/WordComponent.js';
//import words from '../components/words.json'

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

const words = [
  ["1912": 10],
  ["At": 10],
  ["Atlantic": 10],
  ["But": 10],
  ["From": 10],
  ["North": 10],  
  ["With": 10],
  ["back": 10],
  ["been": 20],
  ["business": 10],
  ["cat": 9],
  ["century": 10],
]

class WordCloudComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  // iterateWords = (word, freq) => {
  //   return (<div style={{fontSize: freq * 2 }}>{word}</div>);
  // }

  iterateWords = (word) => {
    return (<div style={{fontSize: word[1] * 2 }}>{word[0]}</div>);
  }

  render() {
    return (
      <div className='cloud-outer'>
        <div className='cloud-inner'>
          <h3>Word Cloud</h3>
          <TagCloud 
            className='tag-cloud'
            style={{
              fontFamily: 'sans-serif',
              //fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              padding: 5,
            }}>
            {words.map((elem) => this.iterateWords(elem))}
          </TagCloud>
        </div>
      </div>
    /*  <div className="wordCloud">
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
          {this.iterateWords('test', 2)}
          <div>asdfasdfasfdasdfadf</div>
          {Object.keys(words).forEach((key) => {
            console.log(key);
            console.log(words[key]);
            this.iterateWords(key, words[key]);
          })}
          <div>word cloud text</div>
        </TagCloud>
      </div> */
    );
  }
}

export default WordCloudComponent;