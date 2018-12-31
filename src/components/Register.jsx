import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';


class Register extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      formSelect : "personal",
      type : 0,
      err: ""
    }
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      window.location.replace('/#dashboard/account');
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem('mobile' , this.state.mobile);
    this.Auth.register(this.state.type, this.state.username, this.state.email, this.state.company_name, this.state.first_name, this.state.last_name, this.state.national_id, this.state.address, this.state.mobile)
      .then((res) => {
        window.location.replace('/#verify');
      })
      .catch((err) => {
        this.setState({
            err : err,
        });
      });
      //   if(res.errors)
      //   { 
      //     console.log(res.errors);
      //     this.setState({
      //       errors : res.errors,
      //     });
      //   }
      // else{
      //   window.location.replace('/#verify');
      //   }

      // })
      // .catch((err) => {
      //   this.setState({
      //       err : err,
      //   });
      //   console.log(err);
      // });
  }

    handleFormChange(e) {
    this.setState(
      {
        formSelect : e.target.value,
      });
  }

  componentDidMount(){
    this.setState({
      formSelect: "personal"
    });
  }

  render() {
  if(this.state.err!=""){
    if(this.state.formSelect == "company"){
    return (
      <div className="center">
        <div className="center_in"></div>
        <div className="card">
          <div className="registererror">This account has already been created</div>
          <h1>Register</h1>
          <form className="company" onSubmit={this.handleFormSubmit}>
            <select className="form-item" onChange={this.handleFormChange} name="type">
              <option value="personal" type="0">Personal</option>
              <option value="company" type="1">Company</option>
            </select>
            <input
              className="form-item"
              placeholder="User name"
              name="username"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Email"
              name="email"
              required="required"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Company name"
              name="company_name"
              minLength="3"
              maxLength="20"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Ceo's firstname"
              name="first_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Ceo's Lastname"
              name="last_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="National id"
              name="national_number"
              required="required"
              type="tel"
              pattern="^[0-9][0-9][0-9][0-9]{7,7}$"
              onChange={this.handleChange}
            />
            <textarea
              className="form-item"
              placeholder="Address"
              name="address"
              minLength="10"
              maxLength="100"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Phone number"
              name="mobile"
              required="required"
              type="tel"
              pattern="^[0][9][0-3][0-9]{8,8}$" 
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
    }
    else if(this.state.formSelect != "company"){
    return (
      <div className="center">
        <div className="center_in"></div>
        <div className="card">
        <div className="registererror">This account has already been created</div>
          <h1>Register</h1>
          <form  className="personal" onSubmit={this.handleFormSubmit}>
            <select className="form-item" onChange={this.handleFormChange} name="type">
              <option value="personal" type="0">Personal</option>
              <option value="company" type="1">Company</option>
            </select>
            <input
              className="form-item"
              placeholder="User name"
              name="username"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Email"
              name="email"
              required="required"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="First name"
              name="first_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Last name"
              name="last_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="National code"
              name="national_number"
              required="required"
              type="tel"
              pattern="^[0-9][0-9][0-9][0-9]{7,7}$"
              onChange={this.handleChange}
            />
            <textarea
              className="form-item"
              placeholder="Address"
              name="address"
              minLength="10"
              maxLength="100"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Phone number"
              name="mobile"
              required="required"
              type="tel"
              pattern="^[0][9][0-3][0-9]{8,8}$" 
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
    }
    else
    {
    return "form is loading"
    }
  }
  else{
    if(this.state.formSelect == "company"){
    return (
      <div className="center">
        <div className="center_in"></div>
        <div className="card">
          <h1>Register</h1>
          <form className="company" onSubmit={this.handleFormSubmit}>
            <select className="form-item" onChange={this.handleFormChange} name="type">
              <option value="personal" type="0">Personal</option>
              <option value="company" type="1">Company</option>
            </select>
            <input
              className="form-item"
              placeholder="User name"
              name="username"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              maxLength="5"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Email"
              name="email"
              required="required"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Company name"
              name="company_name"
              minLength="3"
              maxLength="20"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Ceo's firstname"
              name="first_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Ceo's Lastname"
              name="last_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="National id"
              name="national_number"
              required="required"
              type="tel"
              pattern="^[0-9][0-9][0-9][0-9]{7,7}$"
              onChange={this.handleChange}
            />
            <textarea
              className="form-item"
              placeholder="Address"
              name="address"
              minLength="10"
              maxLength="100"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Phone number"
              name="mobile"
              required="required"
              type="tel"
              pattern="^[0][9][0-3][0-9]{8,8}$" 
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
    }
    else if(this.state.formSelect != "company"){
    return (
      <div className="center">
        <div className="center_in"></div>
        <div className="card">
          <h1>Register</h1>
          <form  className="personal" onSubmit={this.handleFormSubmit}>
            <select className="form-item" onChange={this.handleFormChange} name="type">
              <option value="personal" type="0">Personal</option>
              <option value="company" type="1">Company</option>
            </select>
            <input
              className="form-item"
              placeholder="User name"
              name="username"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Email"
              name="email"
              required="required"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="First name"
              name="first_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Last name"
              name="last_name"
              minLength="3"
              maxLength="10"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="National code"
              name="national_number"
              required="required"
              type="tel"
              pattern="^[0-9][0-9][0-9][0-9]{7,7}$"
              onChange={this.handleChange}
            />
            <textarea
              className="form-item"
              placeholder="Address"
              name="address"
              minLength="10"
              maxLength="100"
              required="required"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Phone number"
              name="mobile"
              required="required"
              type="tel"
              pattern="^[0][9][0-3][0-9]{8,8}$" 
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
    }
    else
    {
    return "form is loading"
    }
  }
}
}

export default Register;