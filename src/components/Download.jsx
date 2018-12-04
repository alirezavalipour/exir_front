import React from 'react'
import Generic from './Generic.jsx';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

export default class Download extends React.Component {

constructor(props){
  super(props);

}



  componentDidMount(){
  getData().then(data => {
    this.setState({ data })
  })

}
render() {


  if (this.state == null) {
    return <div>Loading...</div>
  }
  return (
    <TypeChooser>
      {type => <Chart type={type} data={this.state.data} />}
    </TypeChooser>
  )
}

}
