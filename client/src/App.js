import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Old People Chatbot</h1>
        <div className="login"> 
          <input id="username" classname="loginField" placeholder="username"/>
          <input id="password" classname="loginField" type="password" placeholder="password"/>
          <div className="loginButton">login</div>
        </div>
     
     
     
      </div> 
  
    );
  }
}

export default App;
