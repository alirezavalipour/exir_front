const React = window.React = require('react');
import LoginPage from './Session/LoginPage.jsx';
import AccountView from './Session/AccountView.jsx';
import ManageCurrentTrust from './Session/ManageCurrentTrust.jsx';
import ManuallyAddTrust from './Session/ManuallyAddTrust.jsx';
import AddTrustFromFederation from './Session/AddTrustFromFederation.jsx';
import AddTrustFromDirectory from './Session/AddTrustFromDirectory.jsx';
import Send from './Session/Send.jsx';
import Inflation from './Session/Inflation.jsx';
import Deposit from './Session/Deposit.jsx';
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


      if (part1 === undefined || isValidPublicKey(part1)) {
        content = <ErrorBoundary>
        <Popup trigger={<div className="fa fa-lock iconbar"></div>} position="top top">
          <div className="secretkeytext">please type your secret key here to unlock</div>
          <form onSubmit={this.unlockHandler}className="secretkeyform">
            <input
              className="secretkeyitem"
              placeholder="Secret Key"
              name="secretkey"
              onChange={this.changeHandler}
              type="text"
              />
            <input
              className="secretkeysubmit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </Popup>
          <Generic>
            <div className="s-alert s-alert--primary">
              <p className="Sesssion__yourId__title">Your Wallet Account ID</p>
              <strong className="clickToSelect Sesssion__yourId__accountId" onClick={clickToSelect}>{this.props.d.session.account.accountId()}</strong>
            </div>
            <p>To receive payments, share your account ID with them (begins with a G).</p>
          </Generic>
          <Generic noTopPadding>
            <h2>Where is the money stored?</h2>
            <p>In the Stellar network, funds exist on the network and can only be moved by whoever has the secret key. This means that your secret key is extremely sensitive, and whoever has access to it can move the funds. However, money is <strong>NOT</strong> actually <em>"inside"</em> StellarTerm. StellarTerm is just a helpful tool that helps you use your secret key to make transactions.</p>

            <p><strong>WARNING</strong>: Be extremely careful with your secret key and do not share it with anybody.</p>
          </Generic>
          <AccountView d={d}></AccountView>
        </ErrorBoundary>
      } else if (part1 === 'addTrust') {
        content = <ErrorBoundary>
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
      } else if (part1 === 'send') {
        content = <ErrorBoundary>
          <div className="so-back islandBack islandBack--t">
            <Send d={d}></Send>
          </div>
        </ErrorBoundary>
      } else if (part1 === 'settings') {
        content = <ErrorBoundary>
          <Inflation d={d}></Inflation>
        </ErrorBoundary>
      } else if (part1 === 'history') {
        content = <ErrorBoundary>
          <HistoryView d={d}></HistoryView>
        </ErrorBoundary>
      } else if (part1 === 'deposit') {
        content = (<div><Deposit d={d}/></div>);
      }

      return <div>
        <div className="subNavBackClipper">
          <div className="so-back subNavBack">
            <div className="so-chunk subNav">
              <nav className="subNav__nav">
                <a className={'subNav__nav__item' + (window.location.hash === '#account' ? ' is-current' : '')} href="#account"><span>Balances</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/send' ? ' is-current' : '')} href="#account/send"><span>Send</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/addTrust' ? ' is-current' : '')} href="#account/addTrust"><span>Accept assets</span></a>
                <a className={'subNav__nav__item' + (window.location.hash === '#account/history' ? ' is-current' : '')} href="#account/history"><span>History</span></a>
                {/*<a className={'subNav__nav__item' + (window.location.hash === '#account/settings' ? ' is-current' : '')} href="#account/settings"><span>Settings</span></a>*/}
                {/*<a className="subNav__nav__item" href="#account/deposit">Deposit</a>*/}
              </nav>
              <nav className="subNav__nav">
                <a className={'subNav__nav__item'} href="#account" onClick={() => {this.props.d.session.handlers.logout();}}><span>Log out</span></a>
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
