import React, { Component } from 'react';




class FormInput extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e){
    this.props.onChange(e);

  }



  render() {
    return(
      <label className="s-inputGroup Send__input">
        <span className="s-inputGroup__item s-inputGroup__item--tag S-flexItem-1of4">
          <span>signer</span>
        </span>
        <input
          type="text"
          name={this.props.name}
          onChange={this.handleChange}
          className="s-inputGroup__item S-flexItem-share multisignature_input"
          placeholder="example: SCWAJAOIGKMHR35XI6IIBRI3UG25FR3FHNX6TMGPYEDV3SSWOGC6AI6J"
        />
      </label>
      );

  }
}
  export default FormInput;
