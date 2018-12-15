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
          <nav className="Header__navs">
            <a className="Header__nav__item Header__nav__item--logo" href="#">Exireum</a>
          </nav>
          <div className="headerlog">
            <div className="headerlogname">user</div>
            <div className="headerlogicon">
              <div className="fa fa-user"></div>
              <div className="fa fa-sort-down"></div>
            </div>
            <div className="headerlogin">
              <div className="headerloginalias1">
                <a>first account</a>
                <div class="fa fa-lock"></div>
              </div>
              <div className="headerloginalias2">
                <a>second account</a>
                <div class="fa fa-lock"></div>
              </div>
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