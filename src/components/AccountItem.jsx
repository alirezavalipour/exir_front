import React, { Component } from 'react';

const divStyleName = {
   textAlign: 'center'
};

const divStylePublic = {
   textAlign: 'left'
};


export default class AccountItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    jQuery("document").ready(function(){
      jQuery(".headerloginalias .AssetList__asset__amount__name").addClass("fa fa-lock");
    });
     let address = "/#account/" +   this.props.data.public_key  ;
     // console.log(address);
    return (
      <a href={address} key="" className="AssetList__asset">
        <div className="AssetList__asset__amount AssetList__asset__amount__name" style={divStyleName}>{this.props.data.name}</div>
        <div className="AssetList__asset__amount AssetList__asset__amount__public_key" style={divStylePublic}>{this.props.data.public_key}</div>
        <div className="AssetList__asset__amount AssetList__asset__amount_federation" style={divStyleName}>exmapl@text.com</div>
        <div className="AssetList__asset__amount AssetList__asset__amount_id" style={divStyleName}>0</div>
      </a>);
  }


}
