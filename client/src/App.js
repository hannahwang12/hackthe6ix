import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import SignupComponent from './components/SignupComponent.js';
import LoginComponent from './components/LoginComponent.js';
import ChatbotContainer from './containers/chatbot.js'
import CaretakerContainer from './containers/caretaker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      loggedin: false,
    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
  } 

  signupSubmit = (user, pass, email) => {
    axios.get(this.url + "/signup?username=" + user + "&password=" + pass + "&email=" + email).then(response => {
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  loginSubmit = (user, pass) => {
    axios.get(this.url + "/authenticate?username=" + user + "&password=" + pass).then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  signUp = () => {
    this.setState({signup: !this.state.signup})
  }

  audioSubmit = (blob) => {
    console.log(blob);
    axios.get(this.url + "/audio?blob=" + blob.blobURL).then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  render() {
    return (
      <div className="App">
        {/* <LoginComponent display={(this.state.signup || this.state.loggedin)?"none":"block"} loginSubmit={this.loginSubmit}/> */}
        {/* <SignupComponent display={(this.state.signup || !this.state.loggedin)?"block":"none"} signupSubmit={this.signupSubmit}/> */}
        {/* <button onClick={this.signUp} style={{display: (this.state.signup || this.state.loggedin)?"none":"block"}} className="loginButton">Sign up</button> */}
        {/* <button onClick={this.signUp} style={{display: (this.state.signup || !this.state.loggined)?"block":"none"}} className="loginButton">Back</button> */}
        {/* <ChatbotContainer audioSubmit={this.audioSubmit}/> */}
        <CaretakerContainer/>
      </div> 
  
    );
  }
}

export default App;
