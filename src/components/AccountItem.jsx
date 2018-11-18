import React, { Component } from 'react';

export default class AccountItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="" key="" className="AssetList__asset">
        <div className="AssetList__asset__amount">{this.props.data.name}</div>
        <div className="AssetList__asset__amount">{this.props.data.public_key}</div>
        <div className="AssetList__asset__amount">exmapl@text.com</div>
        <div className="AssetList__asset__amount">0</div>
      </a>);
  }


}
