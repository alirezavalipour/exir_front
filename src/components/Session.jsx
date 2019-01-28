const React = window.React = require('react');
import LoginPage from './Session/LoginPage.jsx';
import AccountView from './Session/AccountView.jsx';
import ManageCurrentTrust from './Session/ManageCurrentTrust.jsx';
import ManuallyAddTrust from './Session/ManuallyAddTrust.jsx';
import AddTrustFromFederation from './Session/AddTrustFromFederation.jsx';
import AddTrustFromDirectory from './Session/AddTrustFromDirectory.jsx';
import Send from './Session/Send.jsx';
import Inflation from './Session/Inflation.jsx';
import Deposit from './Deposit.jsx';
import Withdrawed from './Withdrawed.jsx';
import MultiSignature from './MultiSignature.jsx';
import Generic from './Generic.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import Loading from './Loading.jsx';
import HistoryView from './Session/HistoryView.jsx';
import Ellipsis from './Ellipsis.jsx';
import TermsOfUse from './TermsOfUse.jsx';
import clickToSelect from '../lib/clickToSelect';
import Popup from "reactjs-popup";


const isValidPublicKey = input => {
  try {
    StellarSdk.Keypair.fromPublicKey(input);
    return true;
  } catch (e) {
    // console.error(e);
    return false;
  }
}

const isValidSecretKey = input => {
  try {
    StellarSdk.Keypair.fromSecret(input);
    return true;
  } catch (e) {
    // console.error(e);
    return false;
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.listenId = this.props.d.session.event.listen(() => {this.forceUpdate()});
    this.mounted = true;
    this.unlockHandler = this.unlockHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      secretInput: ""
    }
    // KLUDGE: The event listeners are kinda messed up
    // Uncomment if state changes aren't working. But with the new refactor, this dead code should be removed
    // For now, it's just extra insurance
    this.checkLoginStatus = () => {
      if (this.mounted) {
        if (this.props.d.session.state === 'in' || this.props.d.session.state === 'unfunded' ) {
          this.forceUpdate();
          setTimeout(this.checkLoginStatus, 2000)
        } else {
          setTimeout(this.checkLoginStatus, 100)
        }
      }
    }
    setTimeout(this.checkLoginStatus, 100)
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.d.session.event.unlisten(this.listenId);
    console.log(this.listenId)
  }



  unlockHandler(e){
 e.preventDefault();
     if (!isValidSecretKey(this.state.secretInput)) {
        alert('invalid secret key ');
        return this.setState({
          invalidKey: true,
        })
      }else{
        this.props.d.session.handlers.logInWithSecret(this.state.secretInput);
      }



  }

   changeHandler(e){
    this.setState({
      secretInput : e.target.value
    });
  }

  componentDidMount(){
    let d = this.props.d;
    let state = d.session.state;

    let part1 = this.props.urlParts[1];

    if (isValidPublicKey(part1) ) {
        this.props.d.session.handlers.logInWithPublicKey(part1);
    }
  }

  render() {
    if (isValidSecretKey(this.state.secretInput)) {
      jQuery(".iconbar").addClass("fa-unlock");
    }
    let d = this.props.d;
    let state = d.session.state;
    let setupError = d.session.setupError;


    if (state === 'out') {
      return <LoginPage setupError={setupError} d={d} urlParts={this.props.urlParts}></LoginPage>
    } else if (state === 'unfunded') {
      return <Generic title={'Activate your account'}><Loading darker={true} left>
        <div className="s-alert s-alert--success">
          Your Wallet Account ID: <strong>{d.session.unfundedAccountId}</strong>
        </div>
        To use your Stellar account, you must activate it by sending at least 5 lumens (XLM) to your account. You can buy lumens (XLM) from an exchange and send them to your address.
      </Loading></Generic>
    } else if (state === 'loading') {
      return <Generic title="Loading account"><Loading>Contacting network and loading account<Ellipsis /></Loading></Generic>
    } else if (state === 'in') {


      let part1 = this.props.urlParts[1];
      let content;

       let lock = <Popup trigger={<div className="fa fa-lock iconbar"></div>} position="top top">
          <div className="addaccount_box1">
            <div className="so-back islandBack">
              <div className="island">
                <div className="island__header">please type your secret key here to unlock</div>
                <div className="island__paddedContent">
                  <form onSubmit={this.unlockHandler}className="secretkeyform">
                    <label className="s-inputGroup Send__input">
                      <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                        <span>Secret key</span>
                      </span>
                      <input
                      className="s-inputGroup__item S-flexItem-share"
                      placeholder="Example : SDRTBAWX6RYQG4P46VRAB2QQJGGMUTBWNXA5OMZ3VROWXJFVCCLEJICZ"
                      name="secretkey"
                      onChange={this.changeHandler}
                      type="text"
                      />
                      <button className="s-button">UNLOCK</button>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Popup>;
      if (part1 === undefined || isValidPublicKey(part1)) {
        window.localStorage.setItem('public_key' , part1);
        content = <ErrorBoundary>{lock}
          <Generic>
            <div className="s-alert s-alert--primary">
              <p className="Sesssion__yourId__title">Your Wallet Account ID</p>
              <strong className="clickToSelect Sesssion__yourId__accountId" onClick={clickToSelect}>{this.props.d.session.account.accountId()}</strong>
            </div>
            <p>To receive payments, share your account ID with them (begins with a G).</p>
          </Generic>
          <AccountView d={d}></AccountView>
        </ErrorBoundary>
      } else if (part1 === 'send') {
        content = <ErrorBoundary>{lock}
          <div className="so-back islandBack islandBack--t">
            <Send d={d}></Send>
          </div>
        </ErrorBoundary>
      }else if (part1 === 'addTrust') {
        content = <ErrorBoundary>{lock}
          <div className="so-back islandBack islandBack--t">
            <ManageCurrentTrust d={d}></ManageCurrentTrust>
          </div>
          <div className="so-back islandBack">
            <AddTrustFromFederation d={d}></AddTrustFromFederation>
          </div>
          <div className="so-back islandBack">
            <AddTrustFromDirectory d={d}></AddTrustFromDirectory>
          </div>
          <div className="so-back islandBack">
            <ManuallyAddTrust d={d}></ManuallyAddTrust>
          </div>
        </ErrorBoundary>
      } else if (part1 === 'settings') {
        content = <ErrorBoundary>{lock}
          <Inflation d={d}></Inflation>
        </ErrorBoundary>
      } else if (part1 === 'history') {
        content = <ErrorBoundary>{lock}
          <HistoryView d={d}></HistoryView>
        </ErrorBoundary>
      } else if (part1 === 'deposit') {
        content = <ErrorBoundary>{lock}<div><Deposit d={d} secret={this.state.secretInput}/></div></ErrorBoundary>
      } else if (part1 === 'withdrawed') {
        content = <ErrorBoundary>{lock}<div><Withdrawed d={d} secret={this.state.secretInput}/></div></ErrorBoundary>
      }  else if (part1 === 'MultiSignature') {
        content = <ErrorBoundary>{lock}<div><MultiSignature d={d} secret={this.state.secretInput}/></div></ErrorBoundary>
      }


      return <div>
        <div className="subNavBackClipper">
          <div className="so-back subNavBack">
            <div className="so-chunk subNav">
              <nav className="subNav__nav">
                <a className={'subNav__nav__item' + (window.location.hash === '#account' ? ' activation' : '')} href="#account"><span>Balances</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/send' ? ' activation' : '')} href="#account/send"><span>Send</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/addTrust' ? ' activation' : '')} href="#account/addTrust"><span>Accept assets</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/history' ? ' activation' : '')} href="#account/history"><span>History</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/deposit' ? ' activation' : '')} href="#account/deposit"><span>Deposit</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/withdrawed' ? ' activation' : '')} href="#account/withdrawed"><span>Withdrawal</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/MultiSignature' ? ' activation' : '')} href="#account/MultiSignature"><span>MultiSignature</span></a>
                {/*<a className={'subNav__nav__item' + (window.location.hash === '#account/settings' ? ' activation' : '')} href="#account/settings"><span>Settings</span></a>*/}
                {/*<a className="subNav__nav__item" href="#account/deposit">Deposit</a>*/}
              </nav>
              <nav className="subNav__nav">
                {/*<a className={'subNav__nav__item'} href="#account" onClick={() => {this.props.d.session.handlers.logout();}}><span>Log out</span></a>*/}
              </nav>
            </div>
          </div>
        </div>
        {content}
      </div>
    }
  }
}

export default Session;
