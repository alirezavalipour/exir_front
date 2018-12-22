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
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();


    this.Auth.Withdrawed(this.state.amount, this.state.sheba)
      .then((res) => {
        console.log(res);
        //window.location.replace('/#login');
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return(
            <div className="centers">
              <div className="withdrawed">
                <div className="withdrawed_title">Withdrawal</div>
                <div className="withdrawed_in">
                  <form className="amount_form" onSubmit={this.handleFormSubmit}>
                    <input
                    className="amount_item"
                    placeholder=""
                    name="amount"
                    type="tel"
                    onChange={this.handleChange}
                    />
                    <div className="amount_item_text"><div>Amount XIR(Exir)</div></div>
                    <input
                    className="amount_item"
                    placeholder=""
                    name="sheba"
                    type="text"
                    onChange={this.handleChange}
                    />
                    <div className="amount_item_text"><div>Sheba</div></div>
                    <div className="amount_price">5454564</div>
                    <div className="amount_item_text"><div>Amount will be IRR(Rial)</div></div>
                    <input
                    className="amount_submit"
                    value="Submit"
                    type="submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
  }
}
  export default Withdrawed;
