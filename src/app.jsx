const React = window.React = require('react');
const ReactDOM = require('react-dom');
const mountNode = document.getElementById('app');
import Profile from './components/Profile.jsx';
import Contactus from './components/Contactus.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Sms from './components/sms.jsx';
import SetPassword from './components/SetPassword.jsx';
import GlobalModal from './components/GlobalModal.jsx';
import NotFound from './components/NotFound.jsx';
import AssetList from './components/AssetList.jsx';
import Markets from './components/Markets.jsx';
import Session from './components/Session.jsx';
import Exchange from './components/Exchange.jsx';
import Generic from './components/Generic.jsx';
import Download from './components/Download.jsx';
import Loading from './components/Loading.jsx';
import OpenUp from './components/OpenUp.jsx';
import Stellarify from './lib/Stellarify';
import url from 'url';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TermsOfUse from './components/TermsOfUse.jsx';
import Driver from './lib/Driver';
import Dashboard from './components/Dashboard.jsx';
import Account from './components/Account.jsx';
import AddAccount from './components/AddAccount.jsx';
import AuthService from './components/AuthService.jsx';


let network = {
  horizonUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase:StellarSdk.Networks.TESTNET,
  isDefault: true, // If it's default, then we don't show a notice bar at the top
  isTestnet: true,
  isCustom: false,
};

if (window.location.hash === '#testnet') {
  network.isDefault = false;
  network.isTestnet = true;
  network.horizonUrl = 'https://horizon-testnet.stellar.org';
  network.networkPassphrase = StellarSdk.Networks.TESTNET;
} else if (window.stCustomConfig.horizonUrl) {
  network.isDefault = false;
  network.isCustom = true;
  network.horizonUrl = window.stCustomConfig.horizonUrl;
  if (window.stCustomConfig.networkPassphrase) {
    network.networkPassphrase = window.stCustomConfig.networkPassphrase;
  }
}

StellarSdk.Network.use(new StellarSdk.Network(network.networkPassphrase));

let driver = new Driver({
  network,
});

const parseUrl = (href) => {
  let hash = url.parse(href).hash;
  if (hash === null) {
    return '';
  }
  return hash.substr(1);
};

class TermApp extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.logOut = this.logOut.bind(this);
    this.d = props.d;
    this.state = {
      // The url is the hash cleaned up
      url: parseUrl(window.location.href)
    };
    window.addEventListener('hashchange', (e) => {
      if (e.newURL.indexOf('/#testnet') !== -1) {
        window.location.reload();
      }
      this.setState({
        url: parseUrl(e.newURL)
      });
    }, false);
  }

    logOut (e){
    e.preventDefault();
    this.Auth.logout();
    window.location.reload();
  }

  renderHomePageActions() {
    const { d: { session: { state } } } = this.props;
    return state === 'out' && (
      <div className="HomePage__lead__actions">
        <a
          className="HomePage__lead__actions__sign-up-button HomePage__lead__actions__button s-button"
          href="#signup"
        >
          Sign Up
        </a>
        &nbsp;
        <a
          className="s-button HomePage__lead__actions__button"
          href="#account"
        >
          Login
        </a>
      </div>
    );
  }

  render() {
    jQuery(document).ready(function(e){
      jQuery("#verify").click(function(){
        window.location.reload();
      });
      jQuery(".center div form").find( "input" ).eq( 0 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 1 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 2 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 3 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 4 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 5 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 6 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 7 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 8 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).addClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).removeClass("form-item-active");
      });
      jQuery(".center div form").find( "input" ).eq( 9 ).click(function(){
        jQuery(".center div form").find( "input" ).eq( 0 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 1 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 2 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 3 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 4 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 5 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 6 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 7 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 8 ).removeClass("form-item-active");
        jQuery(".center div form").find( "input" ).eq( 9 ).addClass("form-item-active");
      });
      jQuery(function(){
        var locs = location.hash;
        if(locs=="" || locs=="#")
        {
          jQuery('.HeaderBackBack').addClass('headerlogo');
          jQuery('.Header__navs .Header__nav__item--link').addClass('headeritem');
        }
        else
        {
          jQuery('.HeaderBackBack').removeClass('headerlogo');
          jQuery('.Header__navs .Header__nav__item--link').removeClass('headeritem');
          jQuery('.headerlog').css("display","block");
        }
        if(locs=="" || locs=="#" || locs=="#login" || locs=="#register" || locs=="#verify" || locs=="#setpassword" )
        {
          jQuery('.headerlog').css("display","none");
        }
      });
       jQuery(function(){
        var test = location.hash;
        if(test=="#dashboard/account")
        {
          jQuery('.headerloginalias').css("display","none");
        }
        else
        {
          jQuery('.headerloginalias').css("display","block");
        }
      });
      jQuery(".headerloginlogout").click(function(){
        var x = location.protocol + "//" + location.host;
        $(location).attr('href', x);
      });

      jQuery(".owl-carousel").owlCarousel({
        rtl: true,
        loop: true,
        lazyLoad: true,
        margin: 20,
        dots: false,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: false,
        autoHeight: true,
        autoWidth: false,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
      });
      var y=0;
      jQuery(".logintext").click(function(){
        if(y%2==0)
        {
        jQuery(".logintext div:eq(1)").removeClass("fa-sort-down");
        jQuery(".logintext div:eq(1)").addClass("fa-sort-up");
        jQuery(".loginform").css("display","block");
        }
        else if(y%2==1)
        {
        jQuery(".logintext div:eq(1)").removeClass("fa-sort-up");
        jQuery(".logintext div:eq(1)").addClass("fa-sort-down");
        jQuery(".loginform").css("display","none");
        }
        y+=1;
      });

      var q=0;
      jQuery(".headerlog").click(function(){
        if(q%2==0)
        {
          jQuery(".headerlogicon div:eq(1)").removeClass("fa-sort-down");
          jQuery(".headerlogicon div:eq(1)").addClass("fa-sort-up");
          jQuery(".headerlogin").css("display","block");
        }
        else if(q%2==1)
        {
          jQuery(".headerlogicon div:eq(1)").removeClass("fa-sort-up");
          jQuery(".headerlogicon div:eq(1)").addClass("fa-sort-down");
          jQuery(".headerlogin").css("display","none");
        }
        q+=1;
      });
      var $x1 = jQuery("body").height();
      jQuery(".picture1").css("height",$x1);
      jQuery(".picture2").css("height",$x1);
      jQuery(".picture3").css("height",$x1);
      jQuery(".center").css("height",$x1);
    });
    let url = this.state.url;
    let urlParts = url.split('/');
    let body;
    if (url === '') {
      if(this.Auth.loggedIn()==false){
      // Home page
      body = <div>
        <div id="container" className="container">
          <div id="home" className="home">
            <div className="owl-carousel">
              <div className="picture1">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
              <div className="picture2">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
              <div className="picture3">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="headersign">
              <a href="#register" className="headerinsignin">Sign Up</a>
              <a href="#login" className="headerinlogin">Log In</a>
            </div>
            <nav className="Header__nav">
              <a className={'Header__nav__item Header__nav__item--link'} href="#markets">Markets</a>
              <div className="key3"><a href="#contactus" className={'Header__nav__item Header__nav__item--link'}>Contact us</a></div>
            </nav>
            <div className="share">
              <a href="http://www.facebook.com" className="fa fa-send"></a>
              <a href="http://www.linkedin.com" className="fa fa-linkedin"></a>
              <a href="http://www.instagram.com" className="fa fa-instagram"></a>
            </div>
          </div>
        </div>
      </div>
      }
      else{
            body = <div>
        <div id="container" className="container">
          <div id="home" className="home">
            <div className="owl-carousel">
              <div className="picture1">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
              <div className="picture2">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
              <div className="picture3">
                <div className="picturetext">
                  <div className="picturetextin">
                    <div></div>
                    Exireum is a wallet for Stellar which brought you a smart and srcure way to send and recieve Lumen. It also allows you to easily trade in the Stellar distributed exchange with a great experience.
                    <div></div>
                    Key features:
                    <div></div>
                    - Multiple Accounts and Assets management support
                    <div></div>
                    - Send and recieve Lumen and all other assets
                    <div></div>
                    - Allow to circulate and sign multi-signature transactions.
                    <div></div>
                    - Intetface for Stellar distributed exchange
                    <div></div>
                    - Hardware wallet support
                  </div>
                </div>
                <div className="picture1img"></div>
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="headersign">
              <a href="#" onClick={this.logOut} className="headerinsignin">Logout</a>
              <a href="#dashboard/profile" className="headerinlogin">Profile</a>
            </div>
            <nav className="Header__nav">
              <a className={'Header__nav__item Header__nav__item--link'} href="#markets">Markets</a>
              <a className={'Header__nav__item Header__nav__item--link'} href="#dashboard/account">Accounts</a>
              <a href="#contactus" className={'Header__nav__item Header__nav__item--link'}>Contact us</a>
            </nav>
            <div className="share">
              <a href="http://www.facebook.com" className="fa fa-send"></a>
              <a href="http://www.linkedin.com" className="fa fa-linkedin"></a>
              <a href="http://www.instagram.com" className="fa fa-instagram"></a>
            </div>
          </div>
        </div>
      </div>
    }
    } else if (urlParts[0] === 'download') {
      body = <Download/>;
    } else if (urlParts[0] === 'testnet') {
      if (network.isTestnet) {
        body = <Generic title="Test network">
          You are running on the <a
          href="https://www.stellar.org/developers/guides/concepts/test-net.html" target="_blank"
          rel="nofollow noopener noreferrer">Stellar test network</a>. This network is for
          development purposes only and the test network may be occasionally reset.
          <br/>
          To create a test account on the test network, use the <a
          href="https://www.stellar.org/laboratory/#account-creator?network=test" target="_blank"
          rel="nofollow noopener noreferrer">Friendbot to get some test lumens</a>.
        </Generic>;
      } else {
        body = <Generic title="Please refresh the page to switch to testnet"><Loading darker={true}>
          Please refresh the page to switch to testnet.
        </Loading></Generic>;
      }
    } else if (urlParts[0] === 'contactus') {
      body = <Contactus d={this.d}/>;
    } else if (urlParts[0] === 'login') {
      body = <Login d={this.d}/>;
    } else if (urlParts[0] === 'register') {
      body = <Register d={this.d}/>;
    } else if (urlParts[0] === 'verify') {
      body = <Sms d={this.d}/>;
    } else if (urlParts[0] === 'setpassword') {
      body = <SetPassword d={this.d}/>;
    } else if (urlParts[0] === 'privacy') {
      body = <Generic title="Privacy Policy">
        <p>This policy may be updated or revised without notice. It is the responsibility of the
          user to stay informed about privacy policy changes.</p>
        <p>StellarTerm does not track your actions on this client.</p>
        <p>StellarTerm does not store cookies and the website does not contain any analytics
          scripts.</p>
        <p>StellarTerm developers never see your private keys.</p>
        <p>However, StellarTerm.com is hosted on GitHub, AWS, and Cloudflare infrastructure. They
          may and do have their own tracking systems on their servers. Those services have their own
          privacy policies and they are not covered by this privacy policy.</p>
        <p>While StellarTerm does not track you, this does not mean your actions are private. Take
          note of other privacy issues that may affect you:</p>
        <ul className="privacy__ul">
          <li>Stellar is a public ledger. Anyone can see anything that happens on the network.</li>
          <li>Your inflation vote is publicly visible.</li>
          <li>Your computer might be compromised.</li>
          <li>The StellarTerm website might be compromised.</li>
        </ul>
      </Generic>;
    } else if (urlParts[0] === 'terms-of-use') {
      body = <TermsOfUse/>;
    } else if (['account', 'signup', 'ledger'].indexOf(urlParts[0]) > -1) {
      body = <Session d={this.d} urlParts={urlParts}></Session>;
    } else if (urlParts[0] === 'markets') {
      body = <Markets d={this.d}></Markets>;
    } else if (urlParts[0] === 'dashboard') {
      if (urlParts[1] == 'profile') {
        body = <Profile d={this.d}></Profile>;
      } else if (urlParts[1] == 'account') {
        if (urlParts[2] == 'add') {
          body = <AddAccount d={this.d}/>;
        }
        else {
          body = <Account d={this.d}/>;
        }
      } else {
        body = <Dashboard d={this.d}></Dashboard>;
      }

    } else if (urlParts[0] === 'exchange') {
      if (urlParts.length === 3) {
        try {
          let baseBuying = Stellarify.parseAssetSlug(urlParts[1]);
          let counterSelling = Stellarify.parseAssetSlug(urlParts[2]);

          this.d.orderbook.handlers.setOrderbook(baseBuying, counterSelling);
          body = <Exchange d={this.d}></Exchange>;
        } catch (e) {
          console.error(e);
          body = <Generic title="Pick a market">Exchange url was invalid. To begin, go to the <a
            href="#markets">market list page</a> and pick a trading pair.</Generic>;
        }
      } else {
        if (this.d.orderbook.data.ready) {
          setTimeout(() => {
            let newUrl = Stellarify.pairToExchangeUrl(this.d.orderbook.data.baseBuying, this.d.orderbook.data.counterSelling);
            history.replaceState(null, null, '#' + newUrl);
            this.setState({
              url: newUrl,
            });
          }, 0);
          body = <Generic title="Loading orderbook">Loading</Generic>;
        } else {
          // Default to a market with good activity
          let baseBuying = new StellarSdk.Asset('MOBI', 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH');
          let counterSelling = StellarSdk.Asset.native();

          this.d.orderbook.handlers.setOrderbook(baseBuying, counterSelling);
          setTimeout(() => {
            let newUrl = Stellarify.pairToExchangeUrl(baseBuying, counterSelling);
            history.replaceState(null, null, '#' + newUrl);
            this.setState({
              url: newUrl,
            });
          }, 0);
        }
      }
    } else {
      body = <NotFound></NotFound>;
    }

    return <div className="AppStretch">
      <GlobalModal d={this.props.d}></GlobalModal>
      <div className="AppStretch AppContainer">
        <div>
          <Header d={this.props.d} urlParts={urlParts} network={network}></Header>
          {body}
        </div>
      </div>
    </div>;

  }
};
export default TermApp;
ReactDOM.render(<TermApp d={driver}/>, mountNode);
