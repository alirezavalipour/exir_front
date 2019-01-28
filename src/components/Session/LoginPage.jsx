const React = window.React = require('react');
const images = require('../../images');
import Ellipsis from '../Ellipsis.jsx';
import clickToSelect from '../../lib/clickToSelect';


// TODO: Move this into Validator
const isValidSecretKey = input => {
  try {
    StellarSdk.Keypair.fromSecret(input);
    return true;
  } catch (e) {
    // console.error(e);
    return false;
  }
}




export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretInput: '',
      show: false,
      invalidKey: false,
      newKeypair: null,
      bip32Path: '0',
      ledgerAdvanced: false,
      termsAccepted: false,
    }


    this.handleInput = (event) => {
      this.setState({secretInput: event.target.value});
    }
    this.handleBip32PathInput = (event) => {
      let value = parseInt(event.target.value);
      if (!Number.isInteger(value)) {
        value = 0;
      }
      if (value < 0) {
        value = 0;
      }
      if (value > 2147483647) { // int32: 2^31-1
        value = 2147483647;
      }
      this.setState({bip32Path: '' + value});
    }
    this.enableAdvanced = () => {
      this.setState({ledgerAdvanced: true});
    }
    this.proceedWithLedger = (event) => {
      event.preventDefault();
      // if (!isValidBip32Path(this.state.bip32Path)) {
      //   return this.setState({
      //     invalidBip32Path: true
      //   });
      // }
      this.props.d.session.handlers.logInWithLedger("44'/148'/" + this.state.bip32Path + "'")
    }
    this.toggleShow = (event) => {
      event.preventDefault();
      this.setState({show: !this.state.show});
    }
    this.handleSubmit = (event) => {
      event.preventDefault();
      if (!isValidSecretKey(this.state.secretInput)) {
        return this.setState({
          invalidKey: true,
        })
      }

      this.props.d.session.handlers.logInWithSecret(this.state.secretInput);

    }
    this.handleGenerate = event => {
      let keypair = StellarSdk.Keypair.random();
      this.setState({
        newKeypair: {
          pubKey: keypair.publicKey(),
          secretKey: keypair.secret(),
        }
      });
    }
  }

  componentDidMount() {
    this.mounted = true;
    setTimeout(this.tickLedger, 1);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    window.location.replace('/#dashboard/account');
    return (<a>hhohlkhklkhl</a>); 
     }
   }