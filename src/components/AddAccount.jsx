import React, { Component } from 'react';
import AuthService from './AuthService.jsx';
import axios from 'axios';
import Stellarify from '../lib/Stellarify';
import Printify from '../lib/Printify';
import AssetCard2 from './AssetCard2.jsx';
import RemoveTrustLink from './Session/RemoveTrustLink.jsx';
import _ from 'lodash';
import directory from '../../directory';

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
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      public_key: '',
      name: '',
    };
  }


  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account';
    const formData = {
      public_key: this.state.public_key,
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
            message : "your account successfully added"
          })

        }
         console.log(response)
       });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
      if (isValidPublicKey(e.target.value) ) {
        this.props.d.session.handlers.logInWithPublicKey(e.target.value);
      }
  }

  render() {
    let body ;
    let message= <div></div>;
    if (this.state.message) {
       message = <div><strong>New account Successfully Added !</strong></div>;
    }

    let account = this.props.d.session.account;
    console.log(account);
    if(account!=null){
    let allBalances = account.getSortedBalances(); // From MagicSpoon.Account
    let balanceRows = allBalances.map(balance => {
      let balanceUSD;
      let tradeLink;
      if (this.props.d.ticker.ready) {
        let tickerAsset = _.find(this.props.d.ticker.data.assets, {
          code: balance.code,
          issuer: balance.issuer,
        });
        if (tickerAsset) {
          balanceUSD = '$' + (balance.balance * tickerAsset.price_USD).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
          if (tickerAsset.slug !== 'XLM-native') {
            tradeLink = <a href={'#exchange/' + tickerAsset.topTradePairSlug} className="BalancesTable__row__trade">trade</a>
          }
        } else {
          tradeLink = <a href={'#exchange/' + balance.code + '-' + balance.issuer + '/XLM-native'} className="BalancesTable__row__trade">trade</a>
        }
      }


    return (


      <div>
      <div className="so-back islandBack">
        <div className="island">
        <div className="island__header">

          {message}

          </div>
          </div>
          </div>
        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
              <div className="island__paddedContent">
                <a className="s-button" href="/#dashboard/account/">list of accounts</a>
              </div>
            </div>
          </div>
        </div>

        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
            <div className="island__header">
        Pleas enter your federation name or public key
            </div>


              <div className="island__paddedContent">
                <form onSubmit={this.handleSubmit}>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Public Key</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.public_key}
                           onChange={this.handleChange}
                           name="public_key"
                           placeholder="example: username*getstargazer.com or GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"/>
                  </label>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Alias</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.name}
                           onChange={this.handleChange}
                           name="name"
                           placeholder="eg: working account"/>
                  </label>
                  <div>{Printify.lightenZeros(balance.balance)}</div>
                  <button className="s-button" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)
});
  }else
  {
        return (


      <div>
      <div className="so-back islandBack">
        <div className="island">
        <div className="island__header">

          {message}

          </div>
          </div>
          </div>
        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
              <div className="island__paddedContent">
                <a className="s-button" href="/#dashboard/account/">list of accounts</a>
              </div>
            </div>
          </div>
        </div>

        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
            <div className="island__header">
        Pleas enter your federation name or public key
            </div>


              <div className="island__paddedContent">
                <form onSubmit={this.handleSubmit}>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Public Key</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.public_key}
                           onChange={this.handleChange}
                           name="public_key"
                           placeholder="example: username*getstargazer.com or GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"/>
                  </label>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Alias</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.name}
                           onChange={this.handleChange}
                           name="name"
                           placeholder="eg: working account"/>
                  </label>
                  <button className="s-button" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
  }
}





// import React, { Component } from 'react';
// import AuthService from './AuthService.jsx';
// import axios from 'axios';
// import Popup from "reactjs-popup";





// export default class AddAccount extends Component {
//   constructor(props) {
//     super(props);
//     this.Auth = new AuthService();
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       public_key: '',
//       name: '',
//     };
//   }


//   handleSubmit(e) {
//     e.preventDefault();

//     const url = this.Auth.getDomain() + '/user/account?type=add';
//     const formData = {
//       public_key: this.state.public_key,
//       name: this.state.name,
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

//         }
//          console.log(response)
//        });
//   }

//   handleChange(e) {
//     this.setState(
//       {
//         [e.target.name]: e.target.value,
//       });
//   }

//   render() {

//     let body ;
//     let message= <div></div>;

//     return (
//             <div>
//               <div className="so-back islandBack islandBack--t">
//                 <div className="so-back islandBack">
//                   <div className="island">
//                     <div className="island__header">Pleas enter your public key</div>
//                     <div className="island__paddedContent">
//                       <form onSubmit={this.handleSubmit}>
//                         <label className="s-inputGroup Send__input">
//                           <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
//                             <span>Public key</span>
//                           </span>
//                           <input type="text" className="s-inputGroup__item S-flexItem-share"
//                           value={this.state.public_key}
//                           onChange={this.handleChange}
//                           name="public_key"
//                           placeholder="Example: GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"
//                           />
//                         </label>
//                         <label className="s-inputGroup Send__input">
//                           <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
//                             <span>Alias</span>
//                           </span>
//                           <input type="text" className="s-inputGroup__item S-flexItem-share"
//                           value={this.state.name}
//                           onChange={this.handleChange}
//                           name="name"
//                           placeholder="Example: first account"
//                           />
//                         </label>
//                         <div>
//                           <Popup trigger={<button className="s-button">Continue</button>} position="top top">
//                             <form onSubmit={this.unlockHandler}className="secretkeyform">
//                               <button className="s-button" type="submit">Pay</button>
//                             </form>
//                           </Popup>
//                         </div>
//                         <div>{balanceUSD}</div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             );
//   }
// }

