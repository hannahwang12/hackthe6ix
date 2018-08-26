import React, { Component } from 'react';
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
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

export default GraphComponent;