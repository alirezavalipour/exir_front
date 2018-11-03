import React, { Component } from 'react';
import axios from 'axios';
import AssetList from './AssetList.jsx';
import AuthService from './AuthService.jsx';


export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.Auth = new AuthService();
    this.getAjax = this.getAjax.bind(this);

  }


  renderAssetItem(Item) {
    return <AssetList data={Item}/>;
  }


  getAjax() {

  }

  renderAssetList() {
    console.log(this.state);
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
    console.log(this.state);
    return (<div>
      <div className="so-back islandBack islandBack--t">
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
