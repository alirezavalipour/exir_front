import React, { Component } from 'react';
import AuthService from './AuthService.jsx';
import axios, { post } from 'axios';


const righttDiv = {};

const leftDiv = {
  width: '200px',

};


const parentDiv = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',

};

export default class Profile extends Component {


  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.state = { first_name: '', last_name: '', passport: '', mobile: '', national_number: '' };
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/profile';

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

    let result = this.Auth.fetch(`${this.Auth.getDomain()}/user/profile`, {
      method: 'GET',
    })
      .then((res) => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.setState({
          first_name: res.first_name,
          last_name: res.last_name,
          passport: res.passport,
          mobile: res.mobile,
          national_number: res.national_number,
        });
      });
  }


  fileHandler(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }

    this.setState({
      image: files[0],
    });
  }


  render() {

    return (
      <div className="so-back islandBack islandBack--t">
        <div className="island">
          <div className="island__header">updating profile</div>
          <div className="island__paddedContent" style={parentDiv}>
            <div style={leftDiv}>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>first name</label>
                  <input
                    type="text" name="first_name" value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label>last name </label>
                  <input
                    type="text" name="last_name" value={this.state.last_name}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label>passport photo</label>
                  <input type="file" name="passport" onChange={this.fileHandler}/>
                </div>
                <div>
                  <label>national card photo</label>
                  <input type="file" name="national_card" onChange={this.fileHandler}/>
                </div>
                <div>
                  <label>national number</label>
                  <input
                    type="text" name="national_number" value={this.state.national_number}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label>mobile</label>
                  <input
                    type="text" name="mobile" value={this.state.mobile}
                    onChange={this.handleChange}
                  />
                </div>

                <button type="submit"> update</button>
              </form>
            </div>
            <div style={righttDiv}>
              <img width="128px"
                   src={'http://192.168.64.1/exireum/public/storage/' + this.state.passport}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
