import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import LoginComponent from './components/LoginComponent.js';
import SignupComponent from './components/SignupComponent.js';
import ChatbotContainer from './containers/chatbot.js'
import DashboardContainer from './containers/dashboard.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: "login", //signup, login, caregiver
      loggedin: false, //none, senior, caregiver
      error: null,
      type: false, //none, senior, caregiver
    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
  } 

  signupSubmit = (user, pass, email) => {
    axios.get(this.url + "/signup?username=" + user + "&password=" + pass + "&email=" + email).then(response => {
      var results = response.data;
      if (results === "exists") {
        this.setState({ error: "A user with this username already exists!"})
      }
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  loginSubmit = (user, pass) => {
    axios.get(this.url + "/authenticate?username=" + user + "&password=" + pass).then(response => {
      var results = response.data;
      if (results === "valid") {
        this.setState({ loggedin: user, error: null, type: "senior" });
      } else {
        this.setState({ error: "Bad username or password!" });
      }
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  caregiverLoginSubmit = (user, pass) => {
    axios.get(this.url + "/cgauthenticate?username=" + user + "&password=" + pass).then(response => {
      var results = response.data;
      if (results === "valid") {
        this.setState({ loggedin: user, error: null, type: "caregiver" });
      } else {
        this.setState({ error: "Bad username or password!" });
      }
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  signUp = () => {
    if (this.state.dialog != "signup") {
      this.setState({dialog: "signup", error: null})
    } else {
      this.setState({dialog: "login", error: null})
    }
  }

  display_caretaker = () => {
    if (this.state.dialog != "caregiver") {
      this.setState({dialog: "caregiver", error: null});
    } else {
      this.setState({dialog: "login", error: null});
    }
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
    console.log(this.state.loggedin && this.state.type === "senior");
    console.log(this.state.loggedin && this.state.type === "caregiver");
    return (
      <div className="App">
        {/*this.state.type == "senior" or "caregiver" to determine which screen to show}*/}
        <p style={{display: (!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"}}>Caregiver view</p>
        <LoginComponent display={(this.state.dialog != "login" || this.state.loggedin)?"none":"block"} loginSubmit={this.loginSubmit}/>
        <LoginComponent display={(!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"} loginSubmit={this.caregiverLoginSubmit}/>
        <SignupComponent display={(this.state.dialog === "signup" && !this.state.loggedin)?"block":"none"} signupSubmit={this.signupSubmit}/>
        <button onClick={this.signUp} style={{display: (this.state.dialog === "signup" || this.state.loggedin)?"none":"block"}} className="loginButton">Sign up</button>
        <button onClick={this.signUp} style={{display: (this.state.dialog === "signup" && !this.state.loggedin)?"block":"none"}} className="loginButton">Back</button>
        <button onClick={this.display_caretaker} style={{display: (!this.state.loggedin && this.state.dialog != "caregiver")?"block":"none"}} className="loginButton">Caretaker?</button>
        <button onClick={this.display_caretaker} style={{display: (!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"}} className="loginButton">Back</button>
        <p style={{display: this.state.error?"block":"none"}}>{this.state.error?this.state.error:"null"}</p>
        <ChatbotContainer display={(this.state.loggedin && this.state.type === "senior")?"block":"none"} audioSubmit={this.audioSubmit} />
        <DashboardContainer display={(this.state.loggedin && this.state.type === "caregiver")?"flex":"none"}/>
      </div> 
  
    );
  }
}

export default App;
