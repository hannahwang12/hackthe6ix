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
  {"dream": [18, 0.8]},
  {"dog": [5, 0]},
  {"time": [10, 0.1]},
  {"alone": [8, -0.6]},
  {"weeks": [10, 0]},
  {"waiting": [16, -0.3]},  
  {"happy": [6, 0.8]},
  {"family": [21, 0.8]},
  {"sad": [12, -0.8]},
  {"summer": [15, 0]},
  {"pet": [7, 0]},
  {"love": [3, 0.9]},
  {"man": [3, 0]},
  {"garden": [5, 0.2]},
  {"wonder": [2, 0.5]},
  {"miss": [9, -0.4]},
  {"regret": [2, -0.8]},
  {"wish": [4, 0.1]},
  {"forgot": [8, 0]},
  {"said": [22, 0]},
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
    console.log(Object.values(word)[0][1]);
    return (<div style={{fontSize: (Object.values(word)[0][0] * 3), 
                         color: ((Object.values(word)[0][1]>0)?"#FFFF99":(Object.values(word)[0][1]==0?"#D3D3D3":"#FF0000")),
                         opacity: 0.8}}>{Object.keys(word)[0]}</div>);
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