const React = window.React = require('react');

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
  }
  render() {
    let networkBar;
    if (!this.props.network.isDefault) {
      networkBar = <div className="so-back HeaderNetworkBarBack">
        <div className="so-chunk">
          <div className="HeaderNetworkBar">
            <span>Horizon url: <strong>{this.props.network.horizonUrl}</strong></span>
            <span>Network passphrase: <strong>{this.props.network.networkPassphrase}</strong></span>
          </div>
        </div>
      </div>
    }
    return <div className="HeaderBackBack">
      {networkBar}
      <div className="so-back HeaderBack">
        <div className="so-chunk Header">
          <nav className="Header__nav">
            <a className="Header__nav__item Header__nav__item--logo" href="#">Exir-wallet</a>
            <a className={'Header__nav__item Header__nav__item--link' + (this.props.urlParts[0] === 'exchange' ? ' is-current' : '')} href="#exchange">Exchange</a>
            <a className={'Header__nav__item Header__nav__item--link' + (this.props.urlParts[0] === 'markets' ? ' is-current' : '')} href="#markets">Markets</a>
            <a className={'Header__nav__item Header__nav__item--link' + (this.props.urlParts[0] === 'account' ? ' is-current' : '')} href="#account">Account</a>
            <a className={'Header__nav__item Header__nav__item--link' + (this.props.urlParts[0] === 'download' ? ' is-current' : '')} href="#download">Download</a>
          </nav>
          <div className="headerlog">
            <div className="headerlogname">نام شخص</div>
            <div className="headerlogicon">
              <div className="fa fa-user"></div>
              <div className="fa fa-sort-down"></div>
            </div>
            <div className="headerlogin">
              <div className="headerloginalias1"><a>first alias</a></div>
              <div className="headerloginalias2"><a>second alias</a></div>
              <div className="headerloginaccount">
                <div className="headerloginsetting"><a>log out</a></div>
                <div className="headerloginlogout"><a>setting</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
