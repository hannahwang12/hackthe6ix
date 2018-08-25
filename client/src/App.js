import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import LoginComponent from './components/LoginComponent.js';
import ChatbotContainer from './containers/chatbot.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
  } 

  loginSubmit = (user, pass) => {
    axios.get(this.url + "/authenticate?username=" + user + "&password=" + pass).then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  render() {
    return (
      <div className="App">
        <LoginComponent loginSubmit={this.loginSubmit}/>
        <ChatbotContainer/>
      </div> 
  
    );
  }
}

export default App;
