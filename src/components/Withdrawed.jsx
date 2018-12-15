import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';


class Withdrawed extends Component {

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
            <div className="center">
              <div className="deposit">
                <h1>withdrawed</h1>
                <div className="deposit_in_first">
                  <form className="amount_form_first" onSubmit={this.handleFormSubmit}>
                    <input
                    className="amount_item"
                    placeholder="The Amount Of"
                    name="amount"
                    type="password"
                    onChange={this.handleChange}
                    />
                    <select>
                      <option>XIR(Exir)</option>
                      <option>XLM(Lumen)</option>
                    </select>
                  </form>
                </div>
                <div className="deposit_in_second">
                  <form className="amount_form_second" onSubmit={this.handleFormSubmit}>
                    <input
                    className="amount_item"
                    placeholder="That Amount Will Be"
                    name="change"
                    type="password"
                    onChange={this.handleChange}
                    />
                    <select>
                      <option>IRR</option>
                      <option>USD</option>
                    </select>
                  </form>
                </div>
                <a>Check Trustline</a>
                <div></div>
                <a>pay</a>
              </div>
            </div>
          );
  }
}
  export default Withdrawed;
