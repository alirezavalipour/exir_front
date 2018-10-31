import React, { Component } from 'react';
import AuthService from './AuthService.jsx';


export default class Profile extends Component {


  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.getProfile();
    console.log(this.state);
  }

  getProfile() {
    this.Auth.getProfile();
    let profile = JSON.parse(localStorage.getItem('profile'));
    this.setState({ test: profile });
    console.log(profile);
    console.log(this.state);
  }

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>نام</label>
          <input type="text" name="first_name"/>
        </div>
        <div>
          <label>نام خانوادگی </label>
          <input type="text" name="last_name"/>
        </div>
        <div>
          <label>عکس پاسپورت</label>
          <input type="file" name="passport"/>
        </div>
        <div>
          <label>عکس کارت ملی</label>
          <input type="file" name="national_card"/>
        </div>
        <div>
          <label>شماره ملی </label>
          <input type="text" name="national_number"/>
        </div>
        <div>
          <label>شماره همراه</label>
          <input type="text" name="mobile"/>
        </div>
        <div>
          <label>شماره همراه</label>
          <input type="text" name="mobile"/>
        </div>

        <button type="submit"> ارسال</button>
      </form>
    </div>;
  }
}
