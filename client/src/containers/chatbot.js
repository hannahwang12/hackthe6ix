import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import fs from 'fs';

class ChatbotContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blob: '',
    };
    this.url = "http://localhost:8080";
  } 

  startRecording = () => {
    this.setState({
      record: true
    });
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    this.state.blob = recordedBlob;
  //  this.props.audioSubmit(recordedBlob);

    var myFile = this.blobToFile(recordedBlob, 'blob.mp3');
    fs.writeFile('audio.raw', recordedBlob, (err) => console.log('fs write file'));
  }

  blobToFile(blob, filename) {
    blob.lastModifiedDate = new Date();
    blob.name = filename;
    return blob;
  }

  test = (message, index) => {
    const text = 'From the comfort of our modern lives we tend to look back at the turn of the twentieth century as a dangerous time for sea travellers. With limited communication facilities, and shipping technology still in its infancy in the early nineteen hundreds, we consider ocean travel to have been a risky business. But to the people of the time it was one of the safest forms of transport. At the time of the Titanic’s maiden voyage in 1912, there had only been four lives lost in the previous forty years on passenger ships on the North Atlantic crossing.';
    axios.get(this.url + "/update?message=" + text).then(response => {
      var results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  render() {
    return (
      <div className="chatbot" style={{display: this.props.display}}>
       <div>
        {
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        }
          {//<button onClick={this.test}>Test</button>
        }
        </div>
      </div> 
  
    );
  }
}

export default ChatbotContainer;
