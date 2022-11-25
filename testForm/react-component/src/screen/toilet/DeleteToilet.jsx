import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";

class DeleteToilet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressDelete(event) {
    event.preventDefault();
    console.log("Delete toilet");
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete toilet"}
          text={"Do you really want to delete the toilet ?"}
          handlePressDelete={this.handlePressDelete}
        />
      </div>
    );
  }
}

export default DeleteToilet;
