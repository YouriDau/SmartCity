import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";

class DeleteReport extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressDelete(event) {
    event.preventDefault();
    console.log("Delete report");
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete report"}
          text={"Do you really want to delete the report ?"}
          handlePressDelete={this.handlePressDelete}
        />
      </div>
    );
  }
}

export default DeleteReport;
