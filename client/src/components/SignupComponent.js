import React, { Component } from 'react';

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    
  }

  signupSubmit = (e) => {
    e.preventDefault();
    this.props.signupSubmit(this.state.username, this.state.password);
  }

  handleChangeEmail= (e) => {
    this.setState({email: e.target.value});
  }

  handleChangeUser = (e) => {
		this.setState({username: e.target.value});
  }

  handleChangePass = (e) => {
		this.setState({password: e.target.value});
  }

  render() {
    return (
      <div style={{display: this.props.display}}>
        <h1 className="title">Signup</h1>
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" display="none" frameBorder="0"></iframe>
        <form id="login" onSubmit={this.signupSubmit} className="login" target="dummyframe" autoComplete="off">
          <input id="email" classname="loginField" placeholder="email" value={this.email} onChange={this.handleChangePass}/>
          <input id="username" classname="loginField" placeholder="username" value={this.state.username} onChange={this.handleChangeUser}/>
          <input id="password" classname="loginField" type="password" placeholder="password" value={this.password} onChange={this.handleChangePass}/>
          <input type="submit" value="submit" className="loginButton"/>
        </form>
      </div> 
    );
  }
}

export default SignUpComponent;
