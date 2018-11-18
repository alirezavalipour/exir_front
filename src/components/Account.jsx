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
      <div className="so-back islandBack islandBack--t">
        <div className="so-back islandBack">
          <div className="island">
            <div className="island__paddedContent">
              <a className="s-button" href="/#dashboard/account/add">add account</a>
              <a className="s-button" href="/#dashboard/">Dashboard</a>

            </div>
          </div>
        </div>
        <div className="island">
          <div className="AssetList">
            <div className="AssetList__head__row">
              <div className="AssetList__head__cell AssetList__head__amount">name</div>
              <div className="AssetList__head__cell AssetList__head__amount">public key</div>
              <div className="AssetList__head__cell AssetList__head__amount">federation name</div>
              <div className="AssetList__head__cell AssetList__head__amount">balance</div>
            </div>
            {this.renderAssetList()}
          </div>
        </div>
      </div>
    </div>);
  }
}
