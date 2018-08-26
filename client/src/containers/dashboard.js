import React, { Component } from 'react';
import WordCloudComponents from '../components/WordCloudComponent.js';
import randomColor from 'randomcolor';
import axios from 'axios';
import WordComponent from '../components/WordComponent.js';
import GraphComponent from '../components/GraphComponent.js';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: {},
    };
    this.url = 'http://localhost:8080'
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
  
  componentDidMount() {
    axios.get(this.url + "/frequency?user=" + this.props.username).then(async response => {
      console.log(response.data); 
    })
  }

  iterateWords = (word, freq) => {
    return <WordComponent word={word} freq={freq}/>
  }
  
  render() {
    var words =  {passenger: 10,
    ships: 2,
    North: 3,
    Atlantic: 10,
    crossing: 1 }
        // const response = axios.get(this.url + "/frequency").then(async response => {
    //   // console.log("hey");
    //   // console.log(response);
    //   console.log(response)
   //   await this.setState({words: response.data});
   //   words = response.data;
      // console.log(this.state.words);
    // })
    // console.log(this.state.words)

    // const words = this.props.words;
    // console.log(words)
    console.log(this.state.words)

    return (
      <div>
        <h2>Dashboard</h2>
        <div className="dashboard">
          
          <div className="dashboardComponents">
            <div className="wordCloudContainer">
              <WordCloudComponents words={this.state.words}/>
            </div>
            <div className="graphContainer">
              <h3>Sentiment Graph</h3>
              <GraphComponent />
            </div>
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default DashboardContainer;
