import React, { Component } from 'react';
import AuthService from './AuthService.jsx';
import axios, { post } from 'axios';


export default class Profile extends Component {


  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.state = { profile: {}, image: '' };
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = 'http://192.168.106.1/exir/public/api/user/profile';
    // const formData = {
    //   passport: this.state.image,
    //   first_name: this.state.first_name,
    //   last_name: this.state.last_name,
    //   national_number: this.state.national_number,
    //   mobile: this.state.mobile
    // };

    let formData = new FormData();
    formData.append('passport', this.state.image);
    formData.append('first_name', this.state.first_name);
    formData.append('last_name', this.state.last_name);
    formData.append('national_number', this.state.national_number);
    formData.append('mobile', this.state.mobile);

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.Auth.getToken()}`,
    };

    var config = { headers };

    console.log(formData);

    return post(url, formData, config)
      .then(response => console.log(response));
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  componentDidMount() {
    this.Auth.getProfile();
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.setState({ profile });
  }


  fileHandler(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }


    this.setState({
      image: files[0],
    });
    // this.createImage(files[0]);
  }


  createImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        image: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }


  render() {
    return (<div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>نام</label>
            <input
              type="text" name="first_name" value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>نام خانوادگی </label>
            <input
              type="text" name="last_name" value={this.state.last_name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>عکس پاسپورت</label>
            <input type="file" name="passport" onChange={this.fileHandler}/>
          </div>
          <div>
            <label>عکس کارت ملی</label>
            <input type="file" name="national_card" onChange={this.fileHandler}/>
          </div>
          <div>
            <label>شماره ملی </label>
            <input
              type="text" name="national_number" value={this.state.national_number}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>شماره همراه</label>
            <input
              type="text" name="mobile" value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit"> ارسال</button>
        </form>


        <div>
          <img src={"http://192.168.106.1/exir/public/storage/" + this.state.profile.passport} />
        </div>
      </div>
    );
  }
}
