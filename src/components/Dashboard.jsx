import React from 'react';


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <a href={'/#dashboard/account'}>لیست حساب ها</a>
          <br/>
          <a href={'/#dashboard/profile'}>مشخصات کاربری</a>
        </div>
      </div>
    );

  }

}
