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
      message: '',
      rerender: true,
      continue: false,
    };
//  this.messageEntity = '';
    this.botMessage = '';
    this.url = "http://localhost:8080";
  }

  componentWillReceiveProps = async (nextProps) => {
    await this.setState({ data: nextProps.data });
    console.log(this.props.messageEntity);
    await this.chatbot(this.props.messageEntity);
  }

  /*
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
  */

  startRecording = () => {
    axios.get(this.url + "/audio").then(response => {
      var results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  test = (message, index) => {
    const text = 'From the comfort of our modern lives we tend to look back at the turn of the twentieth century as a dangerous time for sea travellers. With limited communication facilities, and shipping technology still in its infancy in the early nineteen hundreds, we consider ocean travel to have been a risky business. But to the people of the time it was one of the safest forms of transport. At the time of the Titanic’s maiden voyage in 1912, there had only been four lives lost in the previous forty years on passenger ships on the North Atlantic crossing.';
    axios.get(this.url + "/update?message=" + text).then(response => {
      var results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  messageSubmit = (e) => {
    e.preventDefault();
    this.props.messageSubmit(this.state.message, this.props.index, this.state.continue);
  }

  handleChangeMessage = (e) => {
		this.setState({message: e.target.value});
  }

  handleButtonClick = (e) => {
		this.setState({continue: e.target.value});
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

  chatbot = (entity, name) => {
   // this.setState({botMessage: this.props.botMessage});
    var num = this.props.index;
    if ((this.props.name != null && this.props.name != "") && num == 0) {
      num = 1;
      name = this.props.name;
    }
    if (num == 0) {
      this.botMessage = "Hi there, I'm Claire! What's your name?";
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 1) {
      this.botMessage = 'Hi ' + name + ', how was your day?';
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 2) {
      this.botMessage = `That's great! Tell me more about the ${entity[0].name}!`;
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 3) {
      this.botMessage = `Aww sorry to hear that! Why don't you tell me a bit more about the ${entity[0].name}?`;
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 4) {
      this.botMessage = "That's interesting! Is there anything else you wanted to chat about?"; // yes or no
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 5) {
      this.botMessage = "Aww don't worry, it's alright! Is there anything else you wanted to chat about?"; // yes or no
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 6) {
      this.botMessage = "What's up?";
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 7) {
      this.botMessage = "Okay, have a nice day! See you tomorrow!";
      this.setState({ rerender: !this.state.rerender });
    } else if (num == 8) {
      this.botMessage = "Tell me more about your day!";
      this.setState({ rerender: !this.state.rerender });
    } else {
      this.botMessage = '';
      this.setState({ rerender: !this.state.rerender });
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
    return (
      <div className="chatbot" style={{display: this.props.display}}>
       <div>
          {/* <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" /> */}
          {/* <button onClick={this.startRecording} type="button">Start</button> */}
          <p style={{fontSize: '50px', marginLeft: '80px', marginRight: '80px',}}>{this.botMessage}</p>
          <form id="messageBox" onSubmit={this.messageSubmit} className="messageBox" autoComplete="off">
            <textarea rows="1" cols="50" wrap="hard" style={{fontSize: '20px', height: '200px'}} name="message" className="message" placeholder="type a message..." onChange={this.handleChangeMessage}/>
            {this.props.yesno ?
            <div>
              <input type="submit" name="yes" value="yes" className="yesnoButton" onClick={this.handleButtonClick}/>
              <input type="submit" name="yes" value="no" className="yesnoButton" onClick={this.handleButtonClick}/>
            </div> : null}
            <input type="submit" value="send" className="sendButton"/>
          </form>
          {/*<button onClick={this.stopRecording} type="button">Stop</button>*/}
          {/* {<button onClick={this.test}>Test</button>} */}
        </div>
      </div> 
  
    );
  }
}

export default ChatbotContainer;
