import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";

class UpdateToilet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressUpdate(event) {
    event.preventDefault();
    console.log("Update toilet");
  }

  render() {
    return (
      <div class="form">
        <div class="header">
          <Header />
        </div>
        <ToiletForm
          title={"Update this toilet"}
          titleButton={"Save"}
          handlePress={this.handlePressUpdate}
        />
      </div>
    );
  }
}

export default UpdateToilet;
