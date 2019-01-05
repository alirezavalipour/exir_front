import React, { Component } from 'react';
import AuthService from './AuthService.jsx';
import axios from 'axios';
import Popup from "reactjs-popup";
import Stellarify from '../lib/Stellarify';
import Printify from '../lib/Printify';
import AssetCard2 from './AssetCard2.jsx';
import RemoveTrustLink from './Session/RemoveTrustLink.jsx';
import _ from 'lodash';
import directory from '../../directory';
var base64 = require('base-64');
var StellarSdk = require('stellar-sdk');

const isValidPublicKey = input => {
  try {
    StellarSdk.Keypair.fromPublicKey(input);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleSubmitSignXdr = this.handleSubmitSignXdr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.acceptClick = this.acceptClick.bind(this);
    this.state = {
      public_key: '',
      name: '',
      amount: '',
      secret_key:'',
    };
  }

  handleSubmitForm(e) {
    e.preventDefault();
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    let keypair = StellarSdk.Keypair.fromSecret(this.state.secret_key);
    console.log(keypair);
    // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');
    let transaction = new StellarSdk.Transaction(this.state.xdr);
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

        }
         console.log(response)
       });
}

  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account?type=add';
    const formData = {
      public_key: this.state.public_key,
      name: this.state.name,
      amount: this.state.amount,
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

        }
         console.log(response)
       });
  }

  handleChange(e) {

    this.setState(
      {
        [e.target.name]: e.target.value,
    });
    if (e.target.name=="public_key" && isValidPublicKey(e.target.value) ) {
      this.props.d.session.handlers.logInWithPublicKey(e.target.value);
    }

    let amount =  e.target.value; 
    
    this.Auth.convertDeposit(amount)
    .then((res) => {
        this.setState({
          rial : res.result
        });
    });
    /*this.setState({
      balance: this.props.d.session.account.getSortedBalances()
    });*/
  }

  acceptClick(e){
    const url = this.Auth.getDomain() + '/user/stellar/asset/accept';
    const formData = {
      public_key: this.state.public_key,
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
              xdr : response.data.xdr,
            })
        }
         console.log(response)
       });
  }

  handleSubmitSignXdr(e){

  }

  render() {
/*    let balance = null;
    if (this.state.balance) {
      for ( let i=0;i < this.state.balance.length ;i++ ) {
        if(this.state.balance[i].code==="XLM")
        {
          balance = this.state.balance[i].balance;
        }
      }
    }
    let price = 2 - balance;
    let prices = "0"
    if(price > 2)
    {
      prices = price;
    }
    let text="";
    if (balance <= 2) {
      text = <div>Your balance is less than minimum balance requirments. It is necessary to have at least 2.0 Xlm in your account.</div>;
    }*/

    if (isValidPublicKey(this.state.public_key) ) {
      jQuery(".account_button").css("display","block");
    }

    let addprice = "100,000";
    let addprice2 = this.state.rial;
    let allprice = addprice + addprice2;
    return (
            <div>
              <div className="addaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Add an existing account</div>
                    <div className="island__paddedContent">
                      <form onSubmit={this.handleSubmitForm}>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Public key</span>
                          </span>
                          <input type="text" className="s-inputGroup__item S-flexItem-share"
                          value={this.state.public_key}
                          onChange={this.handleChange}
                          name="public_key"
                          placeholder="Example: GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"
                          />
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Alias</span>
                          </span>
                          <input type="text" className="s-inputGroup__item S-flexItem-share"
                          value={this.state.name}
                          onChange={this.handleChange}
                          name="name"
                          placeholder="Example: first account"
                          />
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Increase Exir (XIR)</span>
                          </span>
                          <input type="text" className="s-inputGroup__item S-flexItem-share"
                          value={this.state.amount}
                          onChange={this.handleChange}
                          name="amount"
                          placeholder="0"
                          />
                          <button onClick={this.acceptClick} className="s-button">Accept XIR</button>
                        </label>
                        <label className="s-inputGroup Send__input">
                          <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                            <span>Secret key</span>
                          </span>
                          <input type="text" className="s-inputGroup__item S-flexItem-share"
                          value={this.state.secret_key}
                          onChange={this.handleChange}
                          name="secret_key"
                          placeholder="Example: SDRTBAWX6RYQG4P46VRAB2QQJGGMUTBWNXA5OMZ3VROWXJFVCCLEJICZ"
                          />
                          <button className="s-button">Submit</button>
                        </label>
                        <label className="popup_account">
                          <Popup trigger={<button className="s-button account_button">Continue</button>} position="top top">
                            <div>
                              <div className="">Add account processing fees</div>
                              <form onSubmit={this.handleSubmit}>
                                <div>Add account processing fee {addprice} IRR</div>
                                <div>XIR charge {this.state.rial} IRR</div>
                                <div>fees {allprice} IRR</div>
                                <button className="s-button">Pay</button>
                              </form>
                            </div>
                          </Popup>
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
  }
}

// <div className="addaccount_text">{text}</div>


/*<label className="s-inputGroup Send__input">
  <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    <span>Balance (XLM)</span>
  </span>
  <div className="s-inputGroup__item S-flexItem-share addaccount_balance">  {balance}  </div>
</label>
 <label className="s-inputGroup Send__input">
  <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    <span>Increase Lumens (XLM)</span>
  </span>
  <input type="text" className="s-inputGroup__item S-flexItem-share"
  value={this.state.lumen}
  onChange={this.handleChange}
  name="lumen"
  placeholder={prices}
  />
</label>*/

/*<label className="s-inputGroup Send__input">
  <div>XLM charge {this.state.rial} IRR</div>
</label>*/