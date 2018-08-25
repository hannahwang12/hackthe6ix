import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import './Components/loginComponent.js'
import loginComponent from './Components/loginComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.username = '';
    this.password = '';
  } 

  loginSubmit = (user, pass) => {
    axios.get("/authenticate?username=" + user + "&password=" + pass).then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  render() {
    return (
      <div className="App">
        <loginComponent submit={this.loginSubmit}/>
      </div> 
  
    );
  }
}

export default App;
