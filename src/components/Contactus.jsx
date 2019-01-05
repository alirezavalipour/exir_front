import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, HashRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import AuthService from './AuthService.jsx';

import TermApp from '../app.jsx';
import AccountView from './Session/AccountView.jsx';
import ReactCountdownClock from 'react-countdown-clock';


class Contactus extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
  }

  render() {
    return(
              <div>
                <div className="addaccount_box1">
                  <div className="so-back islandBack">
                    <div className="island">
                      <div className="island__header">Contact us</div>
                      <div className="island__paddedContent">
                        <form>
                          <label className="s-inputGroup Send__input">
                            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                              <span>First name or Last name</span>
                            </span>
                            <input type="text" className="s-inputGroup__item S-flexItem-share"
                            value=""
                            onChange=""
                            name="first_name"
                            placeholder=""
                            />
                          </label>
                          <label className="s-inputGroup Send__input">
                            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                              <span>First name or Last name</span>
                            </span>
                            <input type="text" className="s-inputGroup__item S-flexItem-share"
                            value=""
                            onChange=""
                            name="email"
                            placeholder=""
                            />
                          </label>
                          <label className="s-inputGroup Send__input">
                            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                              <span>First name or Last name</span>
                            </span>
                            <input type="text" className="s-inputGroup__item S-flexItem-share"
                            value=""
                            onChange=""
                            name="phone"
                            placeholder=""
                            />
                          </label>
                          <label className="s-inputGroup Send__input">
                            <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
                              <span>First name or Last name</span>
                            </span>
                            <textarea type="text" className="s-inputGroup__item S-flexItem-share"
                            value=""
                            onChange=""
                            name="describ"
                            placeholder=""
                            />
                          </label>
                          <label className="s-inputGroup Send__input">
                            <button className="s-button">send</button>
                          </label>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          );
  }
}
  export default Contactus;
