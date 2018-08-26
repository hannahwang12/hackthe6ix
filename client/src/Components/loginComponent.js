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
      <div style={{display: this.props.display}} className = "frame">
        <h1 className="title">cl<b>ai</b>re</h1>
        <h2 style={{display: this.props.caredisplay}} className="title">For caregivers</h2>
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe_s" display="none" frameBorder="0"></iframe>
        <form id="login" onSubmit={this.loginSubmit} className="login" target="dummyframe_s" autoComplete="off"> 
          <input name="username" className="loginField" placeholder="username" value={this.state.username} onChange={this.handleChangeUser}/>
          <input name="password" className="loginField" type="password" placeholder="password" value={this.password} onChange={this.handleChangePass}/>
          <input type="submit" value="Log in" className="login1"/>
        </form>
      </div> 
    );
  }
}

export default LoginComponent;
