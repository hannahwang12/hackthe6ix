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
  }
};


class CaretakerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  // getFrequency = (text) => {
  //   // const words = text.split(' ');
  //   const freq = text.replace(/[.]/g, '')
  //   .split(/\s/)
  //   .reduce((map, word) =>
  //     Object.assign(map, {
  //       [word]: (map[word])
  //         ? map[word] + 1
  //         : 1,
  //     }),
  //     {}
  //   );
  //   console.log(freq);
  // }
// iterateWords = (words) => {
//   for (var key in words) {
//     return <WordComponent word={key} freq={words[key]}/>
//   }
// }

iterateWords = (word, freq) => {
  return <WordComponent word={word} freq={freq}/>
}
  
  

  render() {
    const words =  {passenger: 10,
    ships: 2,
    North: 3,
    Atlantic: 10,
    crossing: 1 }
    return (
      <div>
        <h1>Dashboard</h1>
        <div>Overview</div>
        <div>Graph</div>
        <div className="app-outer">
        <div className="app-inner">
          <TagCloud 
            className="tag-cloud"
            style={{
              fontFamily: 'sans-serif',
              fontSize: 30,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: () => randomColor(),
              padding: 5,
              width: '100%',
              height: '100%'
            }}>
            {Object.entries(words).map((elem) => this.iterateWords(elem[0], elem[1]))}
          </TagCloud>
        </div>
        </div>
      </div>
    );
  }
}

export default CaretakerContainer;
