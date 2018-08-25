import React, { Component } from 'react';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    
  }

  loginSubmit = (e) => {
    e.preventDefault();
    this.props.loginSubmit(this.state.username, this.state.password);
  }

  handleChangeUser = (e) => {
		this.setState({username: e.target.value});
  }

  handleChangePass = (e) => {
		this.setState({password: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Old People Chatbot</h1>
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" display="none" frameBorder="0"></iframe>
        <form id="login" onSubmit={this.loginSubmit} className="login" target="dummyframe" autoComplete="off"> 
          <input id="username" classname="loginField" placeholder="username" value={this.state.username} onChange={this.handleChangeUser}/>
          <input id="password" classname="loginField" type="password" placeholder="password" value={this.password} onChange={this.handleChangePass}/>
          <input type="submit" value="submit" className="loginButton"/>
        </form>
      </div> 
    );
  }
}

export default LoginComponent;
