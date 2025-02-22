import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';
import axios from 'axios';
import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';
import StellarBase from 'stellar-base';
import Popup from "reactjs-popup";
var base64 = require('base-64');
var StellarSdk = require('stellar-sdk');





class Withdrawed extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.signWithSecretKey = this.signWithSecretKey.bind(this);
    this.state = {
      price: null,
      public_key:null,
      secret_key:'',
      data: '',
      sam: '',
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });


if(e.target.name == "amount"){
    let amount =  e.target.value;
    this.Auth.convertIrrToXir(amount)
    .then((res) => {
        this.setState({
          rial : res.result
        });
    }).catch( (err) => {
      alert(err);
    });
  }
}

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.Withdrawed(this.state.amount, this.state.sheba)
      .then((res) => {
        this.signWithSecretKey(res.xdr);

      }).catch((err) => {
        alert(err);
      });
  }
  signWithSecretKey(sam){

    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    let keypair = StellarSdk.Keypair.fromSecret(this.props.secret);
    // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');

    let transaction = new StellarSdk.Transaction(sam);
    transaction.sign(keypair);
    let xdr = transaction.toEnvelope().toXDR('base64');
    const url = this.Auth.getDomain() + '/user/stellar/withdraw/submit';
    const formData = {
      xdr: xdr,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Auth.getToken()}`,
    };
    var config = { headers };
    return axios.post(url, formData, config)
      .then(response =>{
        if(response.status == 200){
          this.setState({
            hash: response.data.hash,
          })
        }
       });
  }


  render() {

    if(!this.state.hash)
    {
    return(
            <div className="centers">
              <div className="addaccount_box">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Withdrawal</div>
                    <div className="island__paddedContent">
                      <form onSubmit={this.handleFormSubmit}>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Amount XIR(Exir)</span>
                          </span>
                          <input
                          className="s-inputGroup__item S-flexItem-share"
                          placeholder="0"
                          name="amount"
                          minLength="5"
                          type="tel"
                          onChange={this.handleChange}
                          />
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>sheba</span>
                          </span>
                          <input
                          className="s-inputGroup__item S-flexItem-share"
                          placeholder=""
                          name="sheba"
                          type="text"
                          onChange={this.handleChange}
                          />
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Amount will be IRR(Rial)</span>
                          </span>
                          <div className="s-inputGroup__item S-flexItem-share addaccount_balance">  {this.state.rial}  </div>
                        </label>
                        <button className="s-button">submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
}
else if(this.state.hash)
{
  return(<div>
              <div className="addaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Account added</div>
                    <div className="island__paddedContent">
                      <label>
                        <div className="account-added">Your account has been successfully added.</div>
                        <a href="/#dashboard/account" className="s-button account_button_fee_xlm">Back to Accounts</a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
    </div>);
}
  }
}
  export default Withdrawed;