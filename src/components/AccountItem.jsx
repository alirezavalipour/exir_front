import React, { Component } from 'react';
import axios from 'axios';

const divStyleName = {
   textAlign: 'center'
};

const divStylePublic = {
   textAlign: 'left'
};


export default class AccountItem extends Component {

  constructor(props) {
    super(props);
    this.state={
      xirBalance:'',
      xlmBalance:''
    };
  }

  componentDidMount()
  {
    const url = 'https://horizon-testnet.stellar.org/accounts/'+this.props.data.public_key;
    axios.get(url)
      .then(res =>{ 
          res.data.balances.map(elem =>{
            if(elem.asset_code=="EXIR")
            {
              this.setState({
                xirBalance: elem.balance
              })
            }
            if(elem.asset_type=="native")
            {
              this.setState({
                xlmBalance: elem.balance
              })
            }
          })
      })
  }

  render() {

    jQuery("document").ready(function(){
      jQuery(".headerloginalias .AssetList__asset__amount__name").addClass("fa fa-lock");
    });
     let address = "/#account/" +   this.props.data.public_key  ;
     // console.log(address);
    return (
      <a href={address} key="" className="AssetList__asset secondheader_body_in">
        <div className="AssetList__asset__amount AssetList__asset__amount__name secondheader_body_in1" style={divStyleName}>{this.props.data.name}</div>
        <div className="AssetList__asset__amount AssetList__asset__amount__public_key secondheader_body_in2" style={divStylePublic}>{this.props.data.public_key}</div>
        <div className="AssetList__asset__amount AssetList__asset__amount_federation secondheader_body_in3" style={divStyleName}>{this.state.xirBalance}</div>
        <div className="AssetList__asset__amount AssetList__asset__amount_id secondheader_body_in4" style={divStyleName}>{this.state.xlmBalance}</div>
      </a>);
  }


}
