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
import Ellipsis from './Ellipsis.jsx';
import clickToSelect from '../lib/clickToSelect';
import ObjectInspector from 'react-object-inspector';
var base64 = require('base-64');
var StellarSdk = require('stellar-sdk');

const isValidPublicKey = input => {
  try {
    StellarSdk.Keypair.fromPublicKey(input);
    return true;
  } catch (e) {
    //console.error(e);
    return false;
  }
}

export default class CreatAccount extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.payWithLumenSubmitHandle = this.payWithLumenSubmitHandle.bind(this);
    this.submitToNetworkPayWithLumen = this.submitToNetworkPayWithLumen.bind(this);
    this.state = {
      public_key: '',
      name: '',
      amount: '',
      secret_key:'',
      res:"",
      xdr:'',
      exir: '',
      newKeypair: 'null',
      termsAccepted: false,
    }
    this.handleGenerate = event => {
      let keypair = StellarSdk.Keypair.random();
      this.setState({
        newKeypair: {
          pubKey: keypair.publicKey(),
          secretKey: keypair.secret(),
        }
      });
    }

  }

  handleFormSubmit(e){
    e.preventDefault();
  }

  payWithLumenSubmitHandle(e){
    e.preventDefault();
    const url = this.Auth.getDomain() + '/user/stellar/account/create';
    const formData = {
      payment_public_key: this.state.payment_public_key,
      public_key: this.state.newKeypair.pubKey,
      name: this.state.name,
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
            xdrpay: response.data.xdr,
            orderid: response.data.order.id,
            xdrDecoded: StellarSdk.xdr.TransactionEnvelope.fromXDR(response.data.xdr,'base64')
          });
        }
        //console.log(this.state.xdrDecoded);
       });
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account/create';
    const formData = {
      public_key: this.state.newKeypair.pubKey,
      name: this.state.name,
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
          window.location.replace(this.Auth.getDomain()+"/user/order/pay/" + response.data.order.id );
        }
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
    let amounts = 100000;
    this.Auth.convertIrrToXlm(amounts)
    .then((res) => {
        this.setState({
          irrtoxlm : res.result
        });
    });
    let amounted = 2;
    this.Auth.convertXlmToIrr(amounted)
    .then((res) => {
        this.setState({
          xlmtoirr : res.result
        });
    });

  }

  submitToNetworkPayWithLumen(e){
    e.preventDefault();
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    let keypair = StellarSdk.Keypair.fromSecret(this.state.secret_key);
    //console.log(keypair);
    // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');
    let transaction = new StellarSdk.Transaction(this.state.xdrpay);
    transaction.sign(keypair);
    let xdr = transaction.toEnvelope().toXDR('base64');

    const url = this.Auth.getDomain() + '/user/stellar/account/create/verify';
    const formData = {
      xdr: xdr,
      order_id: this.state.orderid,
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

    jQuery(".account_button").click(function(){
      jQuery(".createaccount_box2").css("display","block");
    });
    jQuery(".account_button_fee_xlm").click(function(){
      jQuery(".transaction_sign").css("display","block");
    });

    let addprice1 = 100000;
    let addprice2 = parseFloat(this.state.xlmtoirr);
    let allprice1 = (addprice1) + (addprice2);

    let addprice3 = parseFloat(this.state.irrtoxlm).toFixed(2);
    let addprice4 = 2;
    let allprice2 = parseFloat(addprice3) + (addprice4);

    let d = this.props.d;
    let newKeypairDetails = <div className="LoginPage__generatedNote">
          <label className="s-inputGroup Send__input">
            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
              <span>Generate Public key</span>
            </span>
            <div className="s-inputGroup__item S-flexItem-share addaccount_balance">    </div>
          </label>
          <label className="s-inputGroup Send__input">
            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
              <span>Generate Secret key</span>
            </span>
            <div className="s-inputGroup__item S-flexItem-share addaccount_balance">    </div>
          </label>
      </div>;
    if (this.state.newKeypair !== null) {
      if (isValidPublicKey(this.state.newKeypair.pubKey) ) {
        jQuery(".account_button").css("display","block");
      }
      newKeypairDetails = <div className="LoginPage__generatedNote">
          <label className="s-inputGroup Send__input">
            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
              <span>Generate Public key</span>
            </span>
            <div className="s-inputGroup__item S-flexItem-share addaccount_balance">  {this.state.newKeypair.pubKey}  </div>
          </label>
          <label className="s-inputGroup Send__input">
            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
              <span>Generate Secret key</span>
            </span>
            <div className="s-inputGroup__item S-flexItem-share addaccount_balance">  {this.state.newKeypair.secretKey}  </div>
          </label>
      </div>
    }
    if(!this.state.hash)
    {
    return (
            <div>
              <div className="secondheaderout">
                <div className="secondheader">
                  <div className="secondheaderin">
                    <a className="accountback" href="/#dashboard/account"><i className="fa fa-chevron-left"></i></a>
                    <a className={(window.location.hash === '#dashboard/account/add' ? ' activation' : '')} href="/#dashboard/account/add">Add account</a>
                    <a className={(window.location.hash === '#dashboard/account/create' ? ' activation' : '')} href="/#dashboard/account/create">Create account</a>
                  </div>
                </div>
              </div>
              <div className="createaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Create new account</div>
                    <div className="island__paddedContent">
                      <form onSubmit={this.handleFormSubmit}>
                        <input type="submit" className="LoginPage__generate s-button" onClick={this.handleGenerate} value="Generate keypair" ></input>
                        {newKeypairDetails}
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
                        <button className="s-button account_button">Continue</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="createaccount_box2">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">How do you prefer to pay for create account processing fee?</div>
                    <div className="island__paddedContent">
                      <div className="s-inputGroup Send__input">
                        <form className="pay_with_IRR" onSubmit={this.handleSubmit}>
                          <div className="add_account_fee">Create account fee</div><div className="add_account_fee_in">{addprice1} IRR</div>
                          <div className="charge_fee">XLM charge fee</div><div className="charge_fee_in">{addprice2} IRR</div>
                          <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice1} IRR</div>
                          <button className="account_button_fee s-button">Pay With IRR</button>
                        </form>
                        <form className="pay_with_XLM">
                          <div className="add_account_fee">Create account fee</div><div className="add_account_fee_in">{addprice3} XLM</div>
                          <div className="charge_fee">XLM charge fee</div><div className="charge_fee_in">{addprice4} XLM</div>
                          <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice2} XLM</div>
                          <button className="account_button_fee s-button account_button_fee_xlm">Pay With XLM</button>
                        </form>
                        <form className="transaction_sign">
                          <label className="s-inputGroup Send__input">
                            <div>Please enter public key and secret key for the account you are going to pay with.</div>
                          </label>
                          <label className="s-inputGroup Send__input">
                            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                              <span>Public key</span>
                            </span>
                            <input type="text" className="s-inputGroup__item S-flexItem-share"
                            value={this.state.payment_public_key}
                            onChange={this.handleChange}
                            name="payment_public_key"
                            placeholder="Example: GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"
                            />
                            <button className="s-button" onClick={this.payWithLumenSubmitHandle}>Create transaction</button>
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
                            <button className="s-button sign_send_key" onClick={this.submitToNetworkPayWithLumen} >Sign and send</button>
                          </label>
                        </form>
                      </div>
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
              <div className="secondheaderout">
                <div className="secondheader">
                  <div className="secondheaderin">
                    <a className="accountback" href="/#dashboard/account"><i className="fa fa-chevron-left"></i></a>
                    <a className={(window.location.hash === '#dashboard/account/add' ? ' activation' : '')} href="/#dashboard/account/add">Add account</a>
                    <a className={(window.location.hash === '#dashboard/account/create' ? ' activation' : '')} href="/#dashboard/account/create">Create account</a>
                  </div>
                </div>
              </div>
              <div className="addaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Account created</div>
                    <div className="island__paddedContent">
                      <label>
                        <div className="account-added">Your account has been successfully created and added.</div>
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