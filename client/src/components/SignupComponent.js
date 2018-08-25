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
    this.props.signupSubmit(this.state.username, this.state.password, this.state.email);
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
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe_l" display="none" frameBorder="0"></iframe>
        <form id="signup" onSubmit={this.signupSubmit} className="login" target="dummyframe_l" autoComplete="off">
          <input name="email" className="loginField" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail}/>
          <input name="username" className="loginField" placeholder="username" value={this.state.username} onChange={this.handleChangeUser}/>
          <input name="password" className="loginField" type="password" placeholder="password" value={this.password} onChange={this.handleChangePass}/>
          <input type="submit" value="Submit" className="loginButton"/>
        </form>
      </div> 
    );
  }
}

export default SignUpComponent;
