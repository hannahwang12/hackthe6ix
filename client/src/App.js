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
      loggedin: false,
      error: false,
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
      var results = response.data;
      if (results === "valid") {
        this.setState({ loggedin: user, error: false });
      } else {
        this.setState({ error: true });
      }
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  signUp = () => {
    this.setState({signup: !this.state.signup})
  }

  render() {
    return (
      <div className="App">
        <LoginComponent display={(this.state.signup || this.state.loggedin)?"none":"block"} loginSubmit={this.loginSubmit}/>
        <SignupComponent display={(this.state.signup && !this.state.loggedin)?"block":"none"} signupSubmit={this.signupSubmit}/>
        <button onClick={this.signUp} style={{display: (this.state.signup || this.state.loggedin)?"none":"block"}} className="loginButton">Sign up</button>
        <button onClick={this.signUp} style={{display: (this.state.signup && !this.state.loggedin)?"block":"none"}} className="loginButton">Back</button>
        <p style={{display: this.state.error?"block":"none"}}>Bad username or password (in friendly terms)</p>
      </div> 
  
    );
  }
}

export default App;
