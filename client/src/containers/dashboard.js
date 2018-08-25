import React, { Component } from 'react';
import WordCloudComponents from '../components/WordCloudComponent.js';
import randomColor from 'randomcolor';
import WordComponent from '../components/WordComponent.js';

class DashboardContainer extends Component {
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


  
  render() {
    const words =  {passenger: 10,
    ships: 2,
    North: 3,
    Atlantic: 10,
    crossing: 1 }
    return (
      <div style={{display: this.props.display}}>
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div className="dashboardComponents">
            <div>Overview</div>
            <div className="wordCloudContainer">
              <WordCloudComponents words={words}/>
            </div>
            
            <div>Graph</div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default DashboardContainer;
