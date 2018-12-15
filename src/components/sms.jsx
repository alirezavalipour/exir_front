import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';


class sms extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.activeClick = this.activeClick.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();


    this.Auth.sms(this.state.temporary_code)
      .then((res) => {
        window.location.replace('/#setpassword');
      })
      .catch((err) => {
        alert(err);
      });
  }

  activeClick() {
    document.getElementById("verify").setAttribute("class", "enable");
  }

  render() {
    return(
            <div className="center">
              <div className="verify_sms">
                <h1>Verify</h1>
                <div>please enter code for login</div>
                <form  className="verifysms" onSubmit={this.handleFormSubmit}>
                  <input
                    className="code"
                    placeholder=""
                    name="temporary_code"
                    type="tel"
                    onChange={this.handleChange}
                  />
                  <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                  />
                </form>
                <div id="timer" className="timer">
                  <ReactCountdownClock seconds={120}
                    color="#0000ff"
                    alpha={0.5}
                    size={85} 
                    onComplete={this.activeClick}
                  />
                </div>
                <a id="verify" className="disable">resend code to phone number</a>
              </div>
            </div>)
  }
}
  export default sms;
