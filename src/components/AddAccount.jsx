import React, { Component } from 'react';
import AuthService from './AuthService.jsx';
import axios from 'axios';




export default class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      public_key: '',
      name: '',
    };
  }


  handleSubmit(e) {
    e.preventDefault();

    const url = this.Auth.getDomain() + '/user/account';
    const formData = {
      public_key: this.state.public_key,
      name: this.state.name,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Auth.getToken()}`,
    };
    var config = { headers };
    return axios.post(url, formData, config)
      .then(response =>{
        if(response.status == 200){
          this.setState({
            message : "your account successfully added"
          })

        }
         console.log(response)
       });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  render() {

    let body ;
    let message= <div></div>;
    if (this.state.message) {
       message = <div><strong>New account Successfully Added !</strong></div>;
    }




    return (


      <div>
      <div className="so-back islandBack">
        <div className="island">
        <div className="island__header">

          {message}

          </div>
          </div>
          </div>
        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
              <div className="island__paddedContent">
                <a className="s-button" href="/#dashboard/account/">list of accounts</a>
              </div>
            </div>
          </div>
        </div>

        <div className="so-back islandBack islandBack--t">
          <div className="so-back islandBack">
            <div className="island">
            <div className="island__header">
        Pleas enter your federation name or public key
            </div>


              <div className="island__paddedContent">
                <form onSubmit={this.handleSubmit}>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Public Key</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.public_key}
                           onChange={this.handleChange}
                           name="public_key"
                           placeholder="example: username*getstargazer.com or GC4DJYMFQZVX3R56FVCN3WA7FJFKT24VI67ODTZUENSE4YNUXZ3WYI7R"/>
                  </label>

                  <label className="s-inputGroup Send__input">
                     <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                       <span>Alias</span>
                     </span>
                    <input type="text" className="s-inputGroup__item S-flexItem-share"
                           value={this.state.name}
                           onChange={this.handleChange}
                           name="name"
                           placeholder="eg: working account"/>
                  </label>
                  <button className="s-button" type="submit">Submit</button>


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
);
  }
}
