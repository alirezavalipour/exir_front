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

const isValidPublicKey = input => {
  try {
    StellarSdk.Keypair.fromPublicKey(input);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default class CreatAccount extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      public_key: '',
      name: '',
      amount: '',
      exir: '',
      newKeypair: null,
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
    })
  }

  render() {
    if (isValidPublicKey(this.state.public_key) ) {
      jQuery(".account_button").css("display","block");
    }
    let addprice = "100,000";
    let addprice2 = this.state.rial;
    let allprice = addprice + 2 * addprice2;
    let d = this.props.d;
    let newKeypairDetails;
    if (this.state.newKeypair !== null) {
      newKeypairDetails = <div className="LoginPage__generatedNote">
        <form>
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
        </form>
      </div>
    }
    return (
            <div>
              <div className="addaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Create account keypair</div>
                    <div className="island__paddedContent">
                      <input type="submit" className="LoginPage__generate s-button" onClick={this.handleGenerate} value="Generate keypair" ></input>
                      {newKeypairDetails}
                    </div>
                  </div>
                </div>
              </div>
              <div className="addaccount_box2">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Create account</div>
                    <div className="island__paddedContent">
                      <form onSubmit={this.handleSubmit}>
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
                            <span>Increase Lumens (XLM)</span>
                          </span>
                          <div className="s-inputGroup__item S-flexItem-share addaccount_balance">2</div>
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
                        </label>
                        <label className="popup_account">
                          <Popup trigger={<button className="s-button account_button">Continue</button>} position="top top">
                            <div>
                              <div className="">Add account processing fees</div>
                              <form onSubmit={this.handleSubmit}>
                                <div>Add account processing fee {addprice} IRR</div>
                                <div>XLM charge {this.state.rial} IRR</div>
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