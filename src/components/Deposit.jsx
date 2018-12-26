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
      this.state = {
      price: null
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
    let amount =  e.target.value; 

    console.log(amount);
    
    this.Auth.convertDeposit(amount)
    .then((res) => {
        this.setState({
          rial : res.result
        });
    }).catch( (err) => {
      alert(err);
    });

  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.Deposit(this.state.amount)
      .then((res) => {
        window.location.replace(this.Auth.getDomain()+"/user/order/pay/" + res.order_id );
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return(
            <div className="centers">
              <div className="deposit">
                <div class="deposit_title">Deposit</div>
                <div className="deposit_in">
                  <form className="amount_form amount_change" onSubmit={this.handleFormSubmit}>
                    <input
                    className="amount_item"
                    placeholder=""
                    name="amount"
                    minLength="5"
                    type="tel"
                    onChange={this.handleChange}
                    />
                    <div className="amount_item_text"><div>Amount XIR(Exir)</div></div>
                    <div className="amount_button">Accept XIR</div>
                    <div className="amount_price">-{this.state.rial}-</div>
                    <div className="amount_item_text"><div>Amount will be IRR(Rial)</div></div>
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