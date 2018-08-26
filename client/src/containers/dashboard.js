import React, { Component } from 'react';
import WordCloudComponents from '../components/WordCloudComponent.js';
import randomColor from 'randomcolor';
import axios from 'axios';
import WordComponent from '../components/WordComponent.js';

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
    axios.get(this.url + "/frequency?user=" + this.user).then(async response => {
      
    })
  }

  iterateWords = (word, freq) => {
    return <WordComponent word={word} freq={freq}/>
  }
  
  render() {
    // var words = {};
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
      <div style={{display: this.props.display}}>
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div className="dashboardComponents">
            <div>Overview</div>
            <div className="wordCloudContainer">
              <WordCloudComponents words={this.state.words}/>
            </div>
            
            <div>Graph</div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default DashboardContainer;
