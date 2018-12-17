import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';
import TrustButton from './Session/TrustButton.jsx';
import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';


class Deposit extends Component {

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
                <h1>Deposit</h1>
                <div className="deposit_in">
                  <form className="amount_form" onSubmit={this.handleFormSubmit}>
                    <input
                    className="amount_item"
                    placeholder="The Amount Of"
                    name="amount"
                    type="tel"
                    onChange={this.handleChange}
                    />
                    <div className="amount_item_name">XIR(Exir)</div>
                    <div className="amount_button">Accept XIR</div>
                    <input
                    className="amount_item"
                    placeholder="That Amount Will Be"
                    name="change"
                    type="tel"
                    onChange={this.handleChange}
                    />
                    <div className="amount_item_name">IRR(Rial)</div>
                    <input
                    className="amount_submit"
                    value="PAY"
                    type="submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
  }
}
  export default Deposit;