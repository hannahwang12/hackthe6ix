import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

class ChatbotContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blob: '',
    };
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
  //  this.state.blob = recordedBlob;
    this.props.audioSubmit(recordedBlob);

    var myFile = this.blobToFile(recordedBlob, 'blob.mp3');
  //  fs.writeFile('audio.raw', recordedBlob, (err) => console.log('fs write file'));
  }

  blobToFile(blob, filename) {
    blob.lastModifiedDate = new Date();
    blob.name = filename;
    return blob;
  }

  render() {
    return (
      <div className="chatbot" style={{display: this.props.display}}>
        {/* <div>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        </div> */}
      </div> 
  
    );
  }
}

export default ChatbotContainer;
