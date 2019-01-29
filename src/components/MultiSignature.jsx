import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
import AuthService from './AuthService.jsx';
import axios from 'axios';
import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';
import StellarBase from 'stellar-base';
import Popup from "reactjs-popup";
var base64 = require('base-64');
var StellarSdk = require('stellar-sdk');
import ObjectInspector from 'react-object-inspector';
import FormInput from './FormInput.jsx';


class MultiSignature extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.sign = this.sign.bind(this);
    this.state = {
     data:'',
     xdrDecoded:'',
     xdr:'',
     secret_key:'',
    inputs: ['input-0'],
    }
  }

componentDidMount(){
  const headers = {
    headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Auth.getToken()}`,
  }};


  const url = this.Auth.getDomain() + '/user/stellar/multi';
  axios.get(url,headers)
    .then(response =>{
      this.setState({
        data:response.data,
      })
    });
}

handleClick(e){

   this.setState({
     xdr:e.currentTarget.textContent,
      xdrDecoded: StellarSdk.xdr.TransactionEnvelope.fromXDR(e.currentTarget.textContent,'base64')
  })
}

handleChange(e){
  this.setState({
      [e.target.name]: e.target.value,
  });

  let str =  e.target.name;

  if(str.includes("input-")){
    StellarSdk.Network.useTestNetwork();
    let keypair = StellarSdk.Keypair.fromSecret(e.target.value);
    let transaction = new StellarSdk.Transaction(this.state.xdr);
    transaction.sign(keypair);
    let xdr = transaction.toEnvelope().toXDR('base64');
    this.setState({
      xdr:xdr
    });
  }


;}

sign(e){

  e.preventDefault();


  const url = this.Auth.getDomain() + '/user/stellar/multi/submit';
  const formData = {
    xdr: this.state.xdr,
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
      alert('MultiSignature Transaction will be check')
      }
     });
}

appendInput(e) {
      e.preventDefault();
      var newInput = `input-${this.state.inputs.length}`;
      this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
  }
  render() {
  let xdrDecoded;
  let data;
  let response = this.state.data;
  let xdrs='';
  if(response){
    xdrs = response.map((signer) => {
      let xdr = signer.xdr;
      let id = signer.id;
      return  <label className="s-inputGroup Send__input multilabel">
                <div className="multimemo">XDR{id}</div>
                <div className="multiid">{id}</div>
                <textarea className="s-inputGroup__item S-flexItem-share multixdr" onClick={this.handleClick}>{xdr}</textarea>
              </label>;
    })
  }

      if(this.state.xdrDecoded !=""){
        data = <div>
                    <div className="addaccount_box">
                      <div className="so-back islandBack">
                        <div className="island">
                          <div className="island__header">Sign XDR</div>
                          <div className="island__paddedContent">
                            <form className="formClass" >
                              <label className="s-inputGroup Send__input">
                                <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4  ">
                                  <span>XDR</span>
                                </span>
                                <textarea
                                className="s-inputGroup__item S-flexItem-share"
                                value={this.state.xdr}
                                name="XDR"
                                type="text"
                                onChange={this.handleChange}
                                />
                              </label>
                              {this.state.inputs.map(input => <FormInput name={input} onChange={this.handleChange} />)}
                              <button className="s-button" onClick={this.sign}>Sign</button>
                              <button className="s-button" onClick={this.appendInput}>Click to add signer</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
               </div>;
  }

    return(
        <div className="centers">
          <div className="addaccount_box">
            <div className="so-back islandBack">
              <div className="island">
                <div className="island__header">Pending Transaction</div>
                  <div className="island__paddedContent s-inputGroup Send__input ">
                    <form className="multi_form">
                      <label className="s-inputGroup Send__input multilabel">
                        <div className="multimemos">Memo</div>
                        <div className="multiids">Id</div>
                        <div className="multixdrs">XDR</div>
                      </label>
                      {xdrs}
                    </form>
                  </div>
                </div>
              </div>
            </div>
           {data}
        </div>
      );

  }
}
  export default MultiSignature;
