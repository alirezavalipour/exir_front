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
          <a href={'/#'}>سفارشات</a>
          <br/>
          <a href={'/#'}>خرید لومن</a>
          <br/>
          <a href={'/#'}>فروش لومن</a>
          <br/>
          <a href={'/#'}>تراکنش های استلار</a>
          <br/>
          <a href={'/#'}>تراکنش های بانکی</a>
          <br/>
          <a href={'/#'}>تغییر گذر واژه</a>
          <br/>
          <a href={'/#'}>ارسال مدارک</a>
        </div>
      </div>
    );

  }

}
