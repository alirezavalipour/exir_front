const React = window.React = require('react');
import AuthService from './AuthService.jsx';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.logOut = this.logOut.bind(this);
    this.state = {
      first_name: null
    }
  }
    componentDidMount() {
    this.Auth.getProfile();

    let result = this.Auth.fetch(`${this.Auth.getDomain()}/user/profile`, {
      method: 'GET',
    })
      .then((res) => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.setState({
          first_name: res.first_name,
        });
      });
  }

  logOut (e){
    e.preventDefault();
    this.Auth.logout();
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
            <a className={'Header__nav__item Header__nav__item--link'} href="#markets">Markets</a>
            <a href="#contactus" className={'Header__nav__item Header__nav__item--link'}>Contact us</a>
          </nav>
          <div className="headerlog">
            <div className="headerlogicon">
              <div className="fa fa-user"></div>
              <div className="fa fa-sort-down"></div>
            </div>
            <div className="headerlogname">{this.state.first_name}</div>
            <div className="headerlogin">
              <a href="/#dashboard/profile" className="headerloginsetting"><div>Profile</div></a>
              <a onClick={this.logOut} href="#" className="headerloginlogout"><div>Logout</div></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}