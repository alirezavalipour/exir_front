import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';


class Login extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
       window.location.replace('/#dashboard');
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


    this.Auth.login(this.state.email, this.state.password)
      .then((res) => {
        console.log(res);
        this.props.history.replace('/');
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="center">

        {/* A JSX comment
            <HashRouter>
           <Route path="/" component={AccountView} />
        </HashRouter>
          */}

        <div className="card">
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
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


}

export default Login;
