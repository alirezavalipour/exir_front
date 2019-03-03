const React = window.React = require('react');
import AuthService from './AuthService.jsx';
import axios from 'axios';
import AccountItem from './AccountItem.jsx';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.logOut = this.logOut.bind(this);
    this.state = {
      first_name: '',
      data: ''
    }
  }

  renderAccountItem(Item) {
    return <AccountItem data={Item}/>;
  }

  renderAssetList() {

    let result = [];
    Object.entries(this.state.data)
      .forEach(
        ([key, value]) => {
          result.push(this.renderAccountItem(value));
        }
      );
    return result;
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

    axios.get(this.Auth.getDomain() + '/user/account', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.Auth.getToken()}`,
      }
    })
      .then(response => {
        this.setState({
          data: response.data
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
            <a className="Header__nav__item Header__nav__item--logo" href="#"></a>
            <a href="#dashboard/account" className={'Header__nav__item Header__nav__item--link Header__nav__item--link--account' + (window.location.hash === '#dashboard/account' ? ' activation' : '')}>Accounts</a>
            <a href="#" className={'Header__nav__item Header__nav__item--link Header__nav__item--link--exchange'}>Exchange</a>
            <a href="#markets" className={'Header__nav__item Header__nav__item--link' + (window.location.hash === '#markets' ? ' activation' : '')}>Markets</a>
            <a href="#contactus" className={'Header__nav__item Header__nav__item--link' + (window.location.hash === '#contactus' ? ' activation' : '')}>Contact us</a>
            <a href="https://blog.exireum.com" className={'Header__nav__item Header__nav__item--link' + (window.location.hash === '#blog' ? ' activation' : '')}>Blog</a>
          </nav>
          <div className="headerlog">
            <div className="headerlogicon">
              <div className="fa fa-sort-down"></div>
              <div className="fa fa-user"></div>
            </div>
            <div className="headerlogname">{this.state.first_name}</div>
            <div className="headerlogin">
              <div className="headerloginalias">{this.renderAssetList()}</div>
              <a href="/#dashboard/profile" className="headerloginsetting">
                <div className="fa fa-user-circle headerloginsettingin1"></div>
                <div className="headerloginsettingin2">Profile</div>
              </a>
              <a onClick={this.logOut} className="headerloginlogout">
                <div className="fa fa-sign-out headerloginlogoutin1"></div>
                <div className="headerloginlogoutin2">Logout</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
