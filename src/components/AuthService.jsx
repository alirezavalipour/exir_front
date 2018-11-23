import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://192.168.106.1/exir/public/api'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.setProfile = this.setProfile.bind(this);
  }


  getDomain() {
    return this.domain;
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        // console.log(res);
        this.setToken(res.access_token); // Setting the token in localStorage
        return Promise.resolve(res);
      });
  }

  register(email, firstName, LastName, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password, first_name: firstName, last_name: LastName }),
    })
      .then((res) => {

        // console.log(res);
        this.setToken(res.access_token); // Setting the token in localStorage
        return Promise.resolve(res);
      });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    let result = this.fetch(`${this.domain}/user/profile`, {
      method: 'GET',
    })
      .then((res) => {
        localStorage.setItem('profile', JSON.stringify(res));
      });
  }

  getLocalProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  setProfile(data) {
    localStorage.setItem('profile', JSON.stringify(data));
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }


    return fetch(url, {
      method: options.method,
      async: options.async,
      body: options.body,
      cache: 'no-cache',
      headers,
      options,
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
