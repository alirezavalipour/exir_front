const React = window.React = require('react');
import Stellarify from '../../lib/Stellarify';
import Printify from '../../lib/Printify';
import BalancesTable from './BalancesTable.jsx';
import MinBalance from './MinBalance.jsx';
import _ from 'lodash';
import axios  from 'axios';

export default class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  data: '' ,
 low_threshold : '' ,
 med_threshold: '' ,
 high_threshold: ''


} ;
  }
  componentDidMount() {
  axios.get('https://horizon-testnet.stellar.org/accounts/'+ this.props.d.session.account.id)
    .then(response => {
        console.log(this.props.d.orderbook.data.trades );
      this.setState({
        data: response.data.signers,
         low_threshold : response.data.thresholds.low_threshold,
         med_threshold : response.data.thresholds.med_threshold ,
         high_threshold : response.data.thresholds.high_threshold
      });
    });

}

  render() {
    let low_threshold : null ;
    let med_threshold : null ;
    let high_threshold : null ;
    let signers = null ;
    if (this.state.data != "" ) {
          low_threshold = this.state.low_threshold;
          med_threshold = this.state.med_threshold;
          high_threshold = this.state.high_threshold;
    let  data = this.state.data ;


        signers = data.map((signer) => {
     let weight = signer.weight;
     let publickey = signer.public_key;
      let key = signer.key;
      let type = signer.type;

        return <tr className="BalancesTable__row" >
          <td className="BalancesTable__row__item BalancesTable__row__item--amount">{weight}</td>
          <td className="BalancesTable__row__item BalancesTable__row__item--amount style={style2}" >{publickey}</td>
        </tr>
        })

      }

      return <div>
          <div className="so-back islandBack">
            <div className="island">
              <div className="island__header">
                Balances
              </div>
              <div className="Session__AccountView__content">
                By default, your account is only configured to accept <strong>XLM</strong>. In order to
                receive other assets, you must <a href="#account/addTrust">accept</a> them using
                the <strong>Accept assets</strong> tool.
              </div>
              <BalancesTable d={this.props.d}></BalancesTable>
            </div>
          </div>
          <div className="so-back islandBack">
            <div className="island">
              <div className="island__header">
                Minimum Balance
              </div>
              <MinBalance d={this.props.d}></MinBalance>
            </div>
          </div>

          <div className="so-back islandBack">
            <div className="island">
              <div className="island__header">
              signers
              </div>

              <table className="BalancesTable">
              <thead>
                <tr className="BalancesTable__head">
                  <td className="BalancesTable__head__cell BalancesTable__row__item--heading BalancesTable__head__asset">Weight</td>
                  <td className="BalancesTable__head__cell BalancesTable__row__item--heading BalancesTable__head__amount">Public</td>
                </tr>
              </thead>
              <tbody>
                {signers}
              </tbody>
              </table>


              </div></div>


                    <div className="so-back islandBack">
                      <div className="island">
                        <div className="island__header">
                        thresholds
                        </div>
                        <table className="BalancesTable">
                        <thead>
                          <tr className="BalancesTable__head">
                            <td className="BalancesTable__head__cell BalancesTable__row__item--heading BalancesTable__head__asset">Low_threshold</td>
                            <td className="BalancesTable__head__cell BalancesTable__row__item--heading BalancesTable__head__amount">Med_threshold</td>
                              <td className="BalancesTable__head__cell BalancesTable__row__item--heading BalancesTable__head__amount">High_threshold</td>
                          </tr>
                        </thead>
                        <tbody>

                        <tr className="BalancesTable__row" >
                            <td className="BalancesTable__row__item BalancesTable__row__item--amount">{low_threshold}</td>
                            <td className="BalancesTable__row__item BalancesTable__row__item--amount">{med_threshold}</td>
                            <td className="BalancesTable__row__item BalancesTable__row__item--amount">{high_threshold}</td>
                          </tr>

                        </tbody>
                        </table>

                          </div></div>

        </div>;
  }
}
