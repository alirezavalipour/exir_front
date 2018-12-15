import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';


class SetPassword extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();


    this.Auth.setpassword(this.state.password)
      .then((res) => {
        console.log(res);
        window.location.replace('/#accounts');
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return(
            <div className="center">
              <div className="set_password">
                <h1>Setpassword</h1>
                <form  className="personal" onSubmit={this.handleFormSubmit}>
                  <input
                    className="form-item"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <input
                    className="form-item"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          );
  }
}
  export default SetPassword;
