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
      payment_public_key: this.state.public_key,
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
            xdrDecoded: StellarSdk.xdr.TransactionEnvelope.fromXDR(response.data.xdr,'base64')
          });
          console.log(response);
        }
        //console.log(this.state.xdrDecoded);
       });
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account?type=add';
    const formData = {
      public_key: this.state.public_key,
      name: this.state.name,
      lumen: this.state.lumen,
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
        //console.log(response)
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
          window.location.replace('/#dashboard/account');
        }
       });
  }

  render() {

    jQuery(".account_button").click(function(){
      jQuery(".createaccount_box2").css("display","block");
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

    return (
            <div>
              <div className="secondheaderout">
                <div className="secondheader">
                  <div className="secondheaderin">
                    <a className="accountback" href="/#dashboard/account">Back</a>
                    <a className="" href="/#dashboard/account/add">Add account</a>
                    <a className="" href="/#dashboard/account/create">Create account</a>
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
                            <span>Payment public key</span>
                          </span>
                          <input type="text" className="s-inputGroup__item S-flexItem-share"
                          value={this.state.public_key}
                          onChange={this.handleChange}
                          name="public_key"
                          placeholder="Enter the public key that you wont to pay with"
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
                        <button className="s-button account_button">Continue</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="createaccount_box2">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Create new account processing fees</div>
                    <div className="island__paddedContent">
                      <div className="s-inputGroup Send__input">
                        <form className="pay_with_IRR" onSubmit={this.handleSubmit}>
                          <div className="add_account_fee">Create account fee</div><div className="add_account_fee_in">{addprice1} IRR</div>
                          <div className="charge_fee">XLM charge fee</div><div className="charge_fee_in">{addprice2} IRR</div>
                          <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice1} IRR</div>
                          <button className="account_button_fee s-button">Pay With IRR</button>
                        </form>
                        <form className="pay_with_XLM" onSubmit={this.payWithLumenSubmitHandle}>
                          <div className="add_account_fee">Create account fee</div><div className="add_account_fee_in">{addprice3} XLM</div>
                          <div className="charge_fee">XLM charge fee</div><div className="charge_fee_in">{addprice4} XLM</div>
                          <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice2} XLM</div>
                          <div className="popup_account">
                          <Popup trigger={<button className="account_button_fee s-button">Pay With XLM</button>} position="top top">
                            <label className="s-inputGroup Send__input secret_key_click">
                              <div><ObjectInspector data={this.state.xdrDecoded}/></div>
                            </label>
                            <label className="s-inputGroup Send__input secret_key_click">
                              <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                                <span>Secret key</span>
                              </span>
                              <input type="text" className="s-inputGroup__item S-flexItem-share"
                              value={this.state.secret_key}
                              onChange={this.handleChange}
                              name="secret_key"
                              placeholder="Example: SDRTBAWX6RYQG4P46VRAB2QQJGGMUTBWNXA5OMZ3VROWXJFVCCLEJICZ"
                              />
                            </label>
                            <label className="s-inputGroup Send__input">
                              <button onClick={this.submitToNetworkPayWithLumen} className="s-button">pay</button>
                            </label>
                          </Popup>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
  }
}