import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="login">
          <input id="username" placeholder="username"/>
          <input id="password" type="password" placeholder="password"/>
        </div>
      </div>
    );
  }
}

export default App;
