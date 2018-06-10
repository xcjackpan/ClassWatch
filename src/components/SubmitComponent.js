import React, { Component } from 'react';

class SubmitComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="submitdialog" style={{ display: this.props.display }}>
        <input name="email" type="text" placeholder="enter your email"></input>
        <button value="Submit" type="Submit">Submit</button>
      </div>
    );
  }


}

export default SubmitComponent;