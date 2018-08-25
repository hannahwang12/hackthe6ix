import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import LoginComponent from './components/LoginComponent.js';
import SignupComponent from './components/SignupComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
  } 

  signupSubmit = (user, pass, email) => {
    axios.get(this.url + "/authenticate?username=" + user + "&password=" + pass + "&email=" + email).then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  loginSubmit = (user, pass) => {
    //read from firebase to check
  }

  signUp = () => {
    this.setState({signup: !this.state.signup})
  }

  render() {
    return (
      <div className="App">
        <LoginComponent display={this.state.signup?"none":"block"} loginSubmit={this.loginSubmit}/>
        <SignupComponent display={this.state.signup?"block":"none"} signupSubmit={this.signupSubmit}/>
        <button onClick={this.signUp} style={{display: this.state.signup?"none":"block"}} className="loginButton">Sign up</button>
        <button onClick={this.signUp} style={{display: this.state.signup?"block":"none"}} className="loginButton">Back</button>
      </div> 
  
    );
  }
}

export default App;
