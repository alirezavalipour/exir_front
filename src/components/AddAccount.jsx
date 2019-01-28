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

export default class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleSubmitSignXdr = this.handleSubmitSignXdr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.acceptClick = this.acceptClick.bind(this);
    this.payWithLumenSubmitHandle = this.payWithLumenSubmitHandle.bind(this);
    this.submitToNetworkPayWithLumen = this.submitToNetworkPayWithLumen.bind(this);
    this.state = {
      public_key: '',
      name: '',
      amount: '',
      secret_key:'',
      payment_public_key:'',
      res:"",
      xdr:'',
    };
  }

//   handleSubmitForm(e) {
//     e.preventDefault();
//     StellarSdk.Network.useTestNetwork();
//     var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
//     let keypair = StellarSdk.Keypair.fromSecret(this.state.secret_key);
//     //console.log(keypair);
//     // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');
//     let transaction = new StellarSdk.Transaction(this.state.xdr);
//     transaction.sign(keypair);
//     let xdr = transaction.toEnvelope().toXDR('base64');

//     const url = this.Auth.getDomain() + '/user/stellar/asset/accept/submit';
//     const formData = {
//       xdr: xdr,
//     };
//     const headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.Auth.getToken()}`,
//     };
//     var config = { headers };
//     return axios.post(url, formData, config)
//       .then(response =>{
//         if(response.status == 200){
//           this.setState({
//             res: response.data.hash,
//           });
//         }
//        });
// }

  payWithLumenSubmitHandle(e){
    e.preventDefault();
    const url = this.Auth.getDomain() + '/user/stellar/account/add';
    const formData = {
      public_key: this.state.public_key,
      name: this.state.name,
      amount: 0,
      payment_public_key: this.state.payment_public_key,
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
            multisigning : response.data.isMultiSignature,
            xdrDecoded: StellarSdk.xdr.TransactionEnvelope.fromXDR(response.data.xdr,'base64'),
          });
          // this.setState({
          //   xdrDecoded1: this.state.xdrDecoded._attributes.tx._attributes,
          //   xdrDecoded2: this.state.xdrDecoded._attributes.signatures
          // });
          // console.log(this.state.xdrDecoded1);
          // console.log(this.state.xdrDecoded2);
        }
        // if(this.state.multisining!=1)
        // {
        //   window.location.replace('/#account/MultiSignature');
        // }
        //console.log(this.state.xdrDecoded);
       });
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account/add';
    const formData = {
      public_key: this.state.public_key,
      name: this.state.name,
      amount: 0,
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
    
    this.Auth.convertXirToIrr(amount)
    .then((res) => {
        this.setState({
          xirtoirr : res.result
        });
    });
    this.Auth.convertXirToXlm(amount)
    .then((res) => {
        this.setState({
          xirtoxlm : res.result
        });
    });
    let amounts = 100000;
    this.Auth.convertIrrToXlm(amounts)
    .then((res) => {
        this.setState({
          irrtoxlm : res.result
        });
    });
    /*this.setState({
      balance: this.props.d.session.account.getSortedBalances()
    });*/
  }

  // acceptClick(e){
  //   const url = this.Auth.getDomain() + '/user/stellar/asset/accept';
  //   const formData = {
  //     public_key: this.state.public_key,
  //   };
  //   const headers = {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.Auth.getToken()}`,
  //   };
  //   var config = { headers };
  //   return axios.post(url, formData, config)
  //     .then(response =>{
  //       if(response.status == 200){
  //           this.setState({
  //             xdr : response.data.xdr,
  //           });
  //       }
  //        //console.log(response)
  //      });
  // }

  handleSubmitSignXdr(e){

  }

  submitToNetworkPayWithLumen(e){
    e.preventDefault();
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    let keypair = StellarSdk.Keypair.fromSecret(this.state.secret_key);
    // let xdr = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.state.xdr,'base64');
    let transaction = new StellarSdk.Transaction(this.state.xdrpay);
    transaction.sign(keypair);
    let xdr = transaction.toEnvelope().toXDR('base64');

    const url = this.Auth.getDomain() + '/user/stellar/account/add/verify';
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
      jQuery(".addaccount_box2").css("display","block");
    });
    jQuery(".account_button_fee_xlm").click(function(){
      jQuery(".transaction_sign").css("display","block");
    });
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
    // let xdrtext = <div><label className="s-inputGroup Send__input">
    //               <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    //                 <span>Deposit Exir (XIR)</span>
    //               </span>
    //               <input type="text" className="s-inputGroup__item S-flexItem-share"
    //               value={this.state.amount}
    //               onChange={this.handleChange}
    //               name="amount"
    //               placeholder="0"
    //               />
    //               <button onClick={this.acceptClick} className="s-button">Accept XIR</button>
    //               </label></div>;
    //   if((this.state.xdr != "") && (this.state.amount < 10000)){
    //   xdrtext =   <div className="inputtextin"><label className="s-inputGroup Send__input">
    //               <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    //                 <span>Deposit Exir (XIR)</span>
    //               </span>
    //               <input type="text" className="inputtext s-inputGroup__item S-flexItem-share"
    //               value={this.state.amount}
    //               onChange={this.handleChange}
    //               name="amount"
    //               placeholder="0"
    //               />
    //               <div className="inputtextout">Minimum acceptable deposit is 10000 XIR</div>
    //               <button onClick={this.acceptClick} className="s-button">Accept XIR</button>
    //               </label></div>;
    //           }
    // if((this.state.xdr != "") && (this.state.amount >= 10000)){
    //   xdrtext =   <div><label className="s-inputGroup Send__input">
    //               <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    //                 <span>Deposit Exir (XIR)</span>
    //               </span>
    //               <input type="text" className="s-inputGroup__item S-flexItem-share"
    //               value={this.state.amount}
    //               onChange={this.handleChange}
    //               name="amount"
    //               placeholder="0"
    //               />
    //               <button onClick={this.acceptClick} className="s-button ac_button">Accept XIR</button>
    //               </label>
    //               <div className="account_boxshadow">
    //               <label>
    //                 <div className="addaccount_textin1">In order to accept XIR is necessary to sign the transaction with your secret key your secret key will not be saved any were in Exireum.</div>
    //               </label>
    //               <label className="s-inputGroup Send__input secret_key_click">
    //               <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    //                 <span>Secret key</span>
    //               </span>
    //               <input type="text" className="s-inputGroup__item S-flexItem-share"
    //               value={this.state.secret_key}
    //               onChange={this.handleChange}
    //               name="secret_key"
    //               placeholder="Example: SDRTBAWX6RYQG4P46VRAB2QQJGGMUTBWNXA5OMZ3VROWXJFVCCLEJICZ"
    //               />
    //               <button className="s-button">Accept XIR</button>
    //             </label></div></div>;
    //           }
    // if((this.state.res)!="")
    // {
    //   xdrtext = <label className="s-inputGroup Send__input">
    //             <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
    //               <span>Deposit Exir (XIR)</span>
    //             </span>
    //             <input type="text" className="s-inputGroup__item S-flexItem-share"
    //             value={this.state.amount}
    //             onChange={this.handleChange}
    //             name="amount"
    //             placeholder="0"
    //             />
    //             <div className="accept_xir"><div>XIR accepted</div></div>
    //           </label>;
    // }

    if (isValidPublicKey(this.state.public_key) ) {
      jQuery(".account_button").css("display","block");
    }


    let addprice1 = 100000;
    // let addprice2 = parseFloat(this.state.xirtoirr);
    // let allprice1 = parseFloat((addprice1) + (addprice2)).toFixed(2);

    let addprice3 = parseFloat(this.state.irrtoxlm).toFixed(2);
    // let addprice4 = parseFloat(this.state.xirtoxlm).toFixed(2);
    // let allprice2 = parseFloat(parseFloat(addprice3) + parseFloat(addprice4)).toFixed(2);
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
              <div className="addaccount_box1">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Add an existing account</div>
                    <div className="island__paddedContent">
                      <form>
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
                        <div className="s-button account_button">Continue</div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="addaccount_box2">
                <div className="so-back islandBack">
                  <div className="island">
                    <div className="island__header">Add account processing fees</div>
                    <div className="island__paddedContent">
                      <div className="s-inputGroup Send__input">
                        <form className="pay_with_IRR" onSubmit={this.handleSubmit}>
                          <div className="add_account_fee">Add account fee</div><div className="add_account_fee_in">{addprice1} IRR</div>
                          <button className="account_button_fee s-button">Pay With IRR</button>
                        </form>
                        <form className="pay_with_XLM">
                          <div className="add_account_fee">Add account fee</div><div className="add_account_fee_in">{addprice3} XLM</div>
                          <div className="account_button_fee s-button account_button_fee_xlm">Pay with XLM</div>
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

// <div className="charge_fee">XIR charge fee</div><div className="charge_fee_in">{addprice2} IRR</div>
// <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice1} IRR</div>

// <div className="charge_fee">XIR charge fee</div><div className="charge_fee_in">{addprice4} XLM</div>
// <div className="total_fee">Total fees</div><div className="total_fee_in">{allprice2} XLM</div>

// <div className="popup_account">
// <Popup trigger={<button className="account_button_fee s-button">Pay With XLM</button>} position="top top">
// <div className="addaccount_box1">
//   <div className="so-back islandBack">
//     <div className="island">
//       <div className="island__header">Pay with XLM</div>
//       <div className="island__paddedContent">
//         <label className="s-inputGroup Send__input secret_key_click">
//           <div><ObjectInspector data={this.state.xdrDecoded} /></div>
//         </label>
//         <label className="s-inputGroup Send__input secret_key_click">
//           <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
//             <span>Secret key</span>
//           </span>
//           <input type="text" className="s-inputGroup__item S-flexItem-share"
//           value={this.state.secret_key}
//           onChange={this.handleChange}
//           name="secret_key"
//           placeholder="Example: SDRTBAWX6RYQG4P46VRAB2QQJGGMUTBWNXA5OMZ3VROWXJFVCCLEJICZ"
//           />
//           <button onClick={this.submitToNetworkPayWithLumen} className="s-button">pay</button>
//         </label>
//       </div>
//     </div>
//   </div>
// </div>
// </Popup>
// </div>