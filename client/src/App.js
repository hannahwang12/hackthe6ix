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
      index: '0',
    //  yesno: false,
    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
    this.sentiment = '';
    this.entity = '';
    this.yesno = false;
    
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

  audioSubmit = () => {
    axios.get(this.url + "/audio").then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  messageSubmit = (message, index) => {
    console.log("messageSubmit: " + message)
    axios.get(this.url + "/message?message=" + message + "&index=" + index).then(async response => {
      var results = response.data;
      var sentiment = results.sentiment;
      var entity = results.entity;
      this.entity = entity;
      console.log("just before update");
      await this.updateIndex(sentiment, entity, true); // ADD YES
    })
  }

  updateIndex = (sentiment, entity, yes) => {
    if (this.state.index == 0) {
      console.log("set")
      this.setState({index: 1});
      console.log("set")
    } else if (this.state.index == 1) {
      if (sentiment == 'positive') {
        this.setState({index: 2});// tell me more about entity
      } else {
        this.setState({index: 3});
      }
    } else if (this.state.index == 2 || this.state.index == 3) {
    //  this.yesno({yesno: true});
      if (sentiment == 'positive') {
        this.setState({index: 4});
      } else {
        this.setState({index: 5});
      }
    } else if (this.state.index == 4 || this.state.index == 5) {
      this.yesno = true;
      this.setState({index: 6});
      // if (yes) {
      //   this.setState({index: 6});
      // } else {
      //   this.setState({index: 7});
      //   // call function to update firebase
      //   return;
      // }
    } else if (this.state.index == 6) {
      this.yesno = false;
      if (yes) {
        // if (sentiment == 'positive') {
        //   this.setState({index: 2}); // tell me more about entity
        // } else {
        //   this.setState({index: 3});
        // }
      } else {
        this.setState({index: 7});
      }
      
    }
  }

  /*
  chatbot = (entity) => {
  //  console.log(this.botMessage);
    switch (this.state.index) {
      case 1:
        this.state.botMessage = 'Hi _____, how was your day?';
        break;
      case 2:
        this.state.botMessage = `That's great! Tell me more about ${entity}!`;
        break;
      case 3:
        this.state.botMessage = `Aww sorry to hear that! Why don't you tell me a bit more about ${entity}?`;
        break;
      case 4:
        this.state.botMessage = "That's interesting! Is there anything else you wanted to chat about?"; // yes or no
        break;
      case 5: 
        this.state.botMessage = "Aww don't worry, it's alright! Is there anything else you wanted to chat about?"; // yes or no
        break;
      case 6:
        this.state.botMessage = "What's up?";
        break;
      case 7:
        this.state.botMessage = "Okay, have a nice day! See you tomorrow!";
        break;
      default:
        this.state.botMessage = "";
        break;
     }
  //   console.log(this.state.botMessage);
    }
    */

  render() {
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
        <ChatbotContainer display={(this.state.loggedin && this.state.type === "senior")?"block":"none"} audioSubmit={this.audioSubmit} messageSubmit={this.messageSubmit} messageSentiment={this.sentiment} messageEntity={this.entity} index={this.state.index} yesno={this.yesno}/>
        <DashboardContainer display={(this.state.loggedin && this.state.type === "caregiver")?"flex":"none"}/>
      </div> 
  
    );
  }
}

export default App;
