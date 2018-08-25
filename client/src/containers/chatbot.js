import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import fs from 'fs';

class ChatbotContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blob: '',
      message: '',
      rerender: true,
    };
//  this.messageEntity = '';
  this.botMessage = '';
  }

  componentWillReceiveProps = () => {
    this.chatbot(this.props.messageEntity);
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
    fs.writeFile('audio.raw', recordedBlob, (err) => console.log('fs write file'));
  }

  blobToFile(blob, filename) {
    blob.lastModifiedDate = new Date();
    blob.name = filename;
    return blob;
  }

  messageSubmit = (e) => {
    e.preventDefault();
    this.props.messageSubmit(this.state.message, this.state.index);
  }

  handleChangeMessage = (e) => {
		this.setState({message: e.target.value});
  }

  // updateIndex = (sentiment, entity, yes) => {
  //   if (this.index == 1) {
  //     if (sentiment == 'positive') {
  //       this.index = 2; // tell me more about entity
  //     } else {
  //       this.index = 3;
  //     }
  //   } else if (this.index == 2 || this.index == 3) {
  //     if (sentiment == 'positive') {
  //       this.index = 4;
  //     } else {
  //       this.index = 5;
  //     }
  //   } else if (this.index == 4 || this.index == 5) {
  //     if (yes) {
  //       this.index = 6;
  //     } else {
  //       this.index = 7;
  //       // call function to update firebase
  //       return;
  //     }
  //   } else if (this.index == 6) {
  //     if (sentiment == 'positive') {
  //       this.index = 2; // tell me more about entity
  //     } else {
  //       this.index = 3;
  //     }
  //   }
  //   console.log(this.index);
  // }

  chatbot = (entity) => {
   // this.setState({botMessage: this.props.botMessage});
    if (this.props.index == 1) {
      this.botMessage = 'Hi _____, how was your day?';
    } else if (this.props.index == 2) {
      this.botMessage = `That's great! Tell me more about the ${entity}!`;
    } else if (this.props.index == 3) {
      this.botMessage = `Aww sorry to hear that! Why don't you tell me a bit more about the ${entity}?`;
    } else if (this.props.index == 4) {
      this.botMessage = "That's interesting! Is there anything else you wanted to chat about?"; // yes or no
    } else if (this.props.index == 5) {
      this.botMessage = "Aww don't worry, it's alright! Is there anything else you wanted to chat about?"; // yes or no
    } else if (this.props.index == 6) {
      this.botMessage = "What's up?";
    } else if (this.props.index == 7) {
      this.botMessage = "Okay, have a nice day! See you tomorrow!";
    } else {
      this.botMessage = '';
    }
  }

  render() {
    // const sentiment = this.props.sentiment;
    // const entity = this.props.entity;
    // const yes = this.props.yes;
    // this.setState({index: this.props.index, botMessage: this.props.botMessage});
  //  this.state.botMessage = this.props.botMessage;
  //  this.chatbot();
 //   this.updateIndex(sentiment, entity, yes);
    console.log("yesno: " + this.props.yesno);
    return (
      <div className="chatbot" style={{display: this.props.display}}>
        <div>
          {/* <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button> */}
          <p>{this.botMessage}</p>
          <form id="messageBox" onSubmit={this.messageSubmit} className="messageBox" autoComplete="off">
            <input name="message" className="message" placeholder="type a message..." onChange={this.handleChangeMessage}/>
            {this.props.yesno ?
            <div>
              <input type="submit" value="yes" className="yesnoButton"/>
              <input type="submit" value="no" className="yesnoButton"/>
            </div> : null}
            <input type="submit" value="send" className="sendButton"/>
          </form>
        </div>
      </div> 
  
    );
  }
}

export default ChatbotContainer;
