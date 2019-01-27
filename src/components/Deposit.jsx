import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';
import axios from 'axios';
import TrustButton from './Session/TrustButton.jsx';
import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
var base64 = require('base-64');
var StellarSdk = require('stellar-sdk');


class Deposit extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.acceptClick = this.acceptClick.bind(this);
    this.acceptAsset = this.acceptAsset.bind(this);
      this.state = {
      price: null,
      secret_key:'',
      xdr: null,
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
    let amount =  e.target.value;
    
    this.Auth.convertXirToIrr(amount)
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

  acceptClick(e){

    e.preventDefault();
    this.Auth.DepositAcceptAsset()
      .then((res) => {
        this.acceptAsset(res.xdr);
      });
    // const url = this.Auth.getDomain() + '/user/stellar/asset/accept';
    // const formData = {
    //   public_key
    // };
    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.Auth.getToken()}`,
    // };
    // var config = { headers };
    // return axios.post(url, formData, config)
    //   .then(response =>{
    //     if(response.status == 200){
    //         this.setState({
    //           xdr : response.data.xdr,
    //         });
    //     }
    //     console.log(response)
    //    });
  }

  acceptAsset(kam){
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    let keypair = StellarSdk.Keypair.fromSecret(this.props.secret);
    //console.log(keypair);
    // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');
    let transaction = new StellarSdk.Transaction(kam);
    transaction.sign(keypair);
    let xdr = transaction.toEnvelope().toXDR('base64');

    const url = this.Auth.getDomain() + '/user/stellar/asset/accept/submit';
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
            res: response.data.hash,
          });
        }
       });
}

  render() {
    let data = <button onClick={this.acceptClick} className="s-button">Accept XIR</button>;
    if(this.state.res!=null)
    {
      data = <div className="accept_xir2">
              <div>XIR accepted</div>
             </div>;
    }
    let account = this.props.d.session.account;
    let allBalances = account.getSortedBalances();
    let  temp = allBalances.map(elem =>{
      
            if(elem.code=="EXIR")
            {
              return (<div className="accept_xir2">
              <div>XIR accepted</div>
             </div>);
            }
          })

    console.log(temp.length);
    if (temp.length > 1) {
      data  = temp ;
    }
    return(
              <div className="deposit_box">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Deposit</div>
                    <div className="island__paddedContent">
                      <form onSubmit={this.handleFormSubmit}>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Amount XIR(Exir)</span>
                          </span>
                          <input
                          className="s-inputGroup__item S-flexItem-share"
                          placeholder=""
                          name="amount"
                          minLength="5"
                          type="tel"
                          onChange={this.handleChange}
                          />
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Amount will be IRR(Rial)</span>
                          </span>
                          <div className="s-inputGroup__item S-flexItem-share addaccount_balance deposit_balance">  {this.state.rial}  </div>
                          {data}
                        </label>
                        <button className="s-button">pay</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          );
  }
}
  export default Deposit;