import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';


class Contactus extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.activeClick = this.activeClick.bind(this);
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      window.location.replace('/#dashboard');
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();


    this.Auth.sms(this.state.code)
      .then((res) => {
        console.log(res);
        window.location.replace('/#login');
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
            <div id="contactus" className="contactus">
              <div>
                <div className="contactussubject">Contact us<div className="contactussubjectin"></div></div>
                <div className="contactusform">
                  <form className="contactusformin">
                    <input className="contactusformin_name" type="text" placeholder="First name or Last name"></input>
                    <input className="contactusformin_email" type="email" placeholder="Email"></input>
                    <input className="contactusformin_phone" type="tel" placeholder="Telephon number"></input>
                    <textarea className="contactusformin_describe" type="text" placeholder="Subscribe"></textarea>
                    <input className="contactusformin_signin" type="button" value="Register" src="" ></input>
                  </form>
                </div>
              </div>
            </div>
          );
  }
}
  export default Contactus;
