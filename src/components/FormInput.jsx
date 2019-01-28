import React, { Component } from 'react';




class FormInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
        
        <input type="text" name={this.props.name} class=""  />
      );

  }
}
  export default FormInput;
