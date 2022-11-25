import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";

class AddToilet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressAdd(event) {
    event.preventDefault();
    console.log("Add toilet");
  }

  render() {
    return (
      <div class="form">
        <div class="header">
          <Header />
        </div>
        <ToiletForm
          title={"Add a toilet"}
          titleButton={"Submit"}
          handlePress={this.handlePressAdd}
        />
      </div>
    );
  }
}

export default AddToilet;
