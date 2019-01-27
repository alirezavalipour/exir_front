import React, { Component } from 'react';
import axios from 'axios';
import AccountItem from './AccountItem.jsx';
import AuthService from './AuthService.jsx';

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.Auth = new AuthService();
  }


  renderAccountItem(Item) {
    return <AccountItem data={Item}/>;
  }

  renderAssetList() {

    let result = [];
    Object.entries(this.state.data)
      .forEach(
        ([key, value]) => {
          result.push(this.renderAccountItem(value));
        }
      );
    return result;
  }

  componentDidMount() {
    axios.get(this.Auth.getDomain() + '/user/account', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.Auth.getToken()}`,
      }
    })
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  }

  render() {

    return (<div>
      <div className="secondheaderout">
        <div className="secondheader">
          <div className="secondheaderin">
            <a className="(window.location.hash === '#dashboard/account/add' ? ' activation' : '')" href="/#dashboard/account/add">Add account</a>
            <a className="(window.location.hash === '#dashboard/account/create' ? ' activation' : '')" href="/#dashboard/account/create">Create account</a>
          </div>
        </div>
        <div className="island secondheader_body">
          <div className="AssetList">
            <div className="AssetList__head__row">
              <div className="AssetList__head__cell AssetList__head__amount secondheader_body1">Name</div>
              <div className="AssetList__head__cell AssetList__head__amount secondheader_body2">Public key</div>
              <div className="AssetList__head__cell AssetList__head__amount secondheader_body3">XIR balance</div>
              <div className="AssetList__head__cell AssetList__head__amount secondheader_body4">XLM balance</div>
            </div>
            {this.renderAssetList()}
          </div>
        </div>
        <div className="accountmoneytext island secondheader_body_2">
          <h2>Where is the money stored?</h2>
          <p>In the Stellar network, funds exist on the network and can only be moved by whoever has the secret key. This means that your secret key is extremely sensitive, and whoever has access to it can move the funds. However, money is <strong>NOT</strong> actually <em>"inside"</em> Exireum. Exireum is just a helpful tool that helps you use your secret key to make transactions.</p>

          <p><strong>WARNING</strong>: Be extremely careful with your secret key and do not share it with anybody.</p>
        </div>
      </div>
    </div>);
  }
}
