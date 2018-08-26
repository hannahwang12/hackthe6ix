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
      rerender: false,
      words: {},
    //  yesno: false,
    };
    this.url = "http://localhost:8080"
    this.username = '';
    this.password = '';
    this.sentiment = '';
    this.entity = '';
    this.name = '';
    this.yesno = false;
  } 

  signupSubmit = (user, pass, email) => {
    axios.get(this.url + "/signup?username=" + user + "&password=" + pass + "&email=" + email).then(response => {
      var results = response.data;
      if (results === "exists") {
        this.setState({ error: "Someone else has already picked that name!"})
      }
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  loginSubmit = (user, pass) => {
    axios.get(this.url + "/authenticate?username=" + user + "&password=" + pass).then(response => {
      var results = response.data;
      console.log("Results: " + results);
      if (results === "valid") {
        this.setState({ loggedin: user, error: null, type: "senior" });
        this.username = user;
        this.setState({ rerender: !this.state.rerender });
      } else if ((results.indexOf('&') > -1) && results != "invalid") {
        this.setState({ loggedin: user, error: null, type: "senior" });
        this.name = results.split('&')[1];
        //console.log("Results: " + results);
        this.username = user;
        this.setState({ rerender: !this.state.rerender });
      } else {
        this.setState({ error: "Something's wrong with your login details!" });
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
        this.setState({ error: "Something's wrong with your login details!" });
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

  // getWordFrequencies = async () => {
  //   let words = {};
  //   await axios.get(this.url + "/frequency").then(response => {
  //     // console.log("hey");
  //     // console.log(response);
  //     console.log(response.data);
  //     words = response.data;
  //     this.setState({words: response.data});
  //   });
  //   console.log(words)
  //   return words;
  // }

  audioSubmit = () => {
    axios.get(this.url + "/audio").then(response => {
      this.results = response.data;
      // this.setState({searching: false});
      // this.setState({searched: true});
    });
  }

  messageSubmit = (message, index, yes) => {
    //console.log("messageSubmit: " + message)
    axios.get(this.url + "/message?message=" + message + "&index=" + index + "&yesno=" + yes).then(async response => {
      var results = response.data;
      var sentiment = results.sentiment;
      var entity = results.entity;
      this.entity = entity;
      if (entity.length < 1) {
        this.setState({index: 8});
      } else if (index == 0) {
        this.entity = entity.filter((elem) => elem.type == "PERSON")[0];
        await this.updateIndex(sentiment, entity, yes, this.entity.name); 
      } else {
        await this.updateIndex(sentiment, entity, yes);
      }
    })
  }

  updateIndex = (sentiment, entity, yes, name) => {
    if (this.state.index == 0 && name != null) {
      console.log("okay")
      axios.get(this.url + "/name?user=" + this.username + "&name=" + name)
      this.name = name;
      this.setState({index: 1});
    } else if (this.state.index == 1 || this.state.index == 8) {
      if (sentiment == 'positive') {
        this.setState({index: 2});// tell me more about entity
      } else {
        this.setState({index: 3});
      }
    } else if (this.state.index == 2 || this.state.index == 3) {
      this.yesno = true;
      if (sentiment == 'positive') {
        this.setState({index: 4});
      } else {
        this.setState({index: 5});
      }
    } else if (this.state.index == 4 || this.state.index == 5) {
      this.yesno = false;
    //  this.setState({index: 6});
      if (yes === 'yes') {
        this.setState({index: 6});
      } else {
        this.setState({index: 7});
        return;
      }
    } else if (this.state.index == 6) {
      // this.yesno = false;
      // if (yes) {
        if (sentiment == 'positive') {
          this.setState({index: 2}); // tell me more about entity
        } else {
          this.setState({index: 3});
        }
      // } else {
      // this.setState({index: 7});
      // }
      
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
        <LoginComponent display={(this.state.dialog != "login" || this.state.loggedin)?"none":"block"} caredisplay={(!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"} loginSubmit={this.loginSubmit}/>
        <LoginComponent display={(!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"} caredisplay={(!this.state.loggedin && this.state.dialog === "caregiver")?"block":"none"} loginSubmit={this.caregiverLoginSubmit}/>
        <SignupComponent display={(this.state.dialog === "signup" && !this.state.loggedin)?"block":"none"} signupSubmit={this.signupSubmit}/>
        <button onClick={this.signUp} style={{display: (this.state.dialog === "signup" || this.state.loggedin)?"none":"block"}} className="signu">Sign up</button>
        <button onClick={this.signUp} style={{display: (this.state.dialog === "signup" && !this.state.loggedin)?"block":"none"}} className="back">Back</button>
        <button onClick={this.display_caretaker} style={{display: (!this.state.loggedin && this.state.dialog != "caregiver")?"inline-block":"none"}} className="caretaker">I'm a caregiver</button>
        <button onClick={this.display_caretaker} style={{display: (!this.state.loggedin && this.state.dialog === "caregiver")?"inline-block":"none"}} className="back">Back</button>
        <p style={{display: this.state.error?"block":"none"}}>{this.state.error?this.state.error:"null"}</p>

        {(this.state.loggedin && this.state.type === "senior")?<ChatbotContainer audioSubmit={this.audioSubmit} messageSubmit={this.messageSubmit} messageSentiment={this.sentiment} messageEntity={this.entity} index={this.state.index} yesno={this.yesno} name={this.name}/>:null}
        {(this.state.loggedin && this.state.type === "caregiver")?<DashboardContainer username={this.username}/>:null}
      </div> 
    );
  }
}

export default App;
