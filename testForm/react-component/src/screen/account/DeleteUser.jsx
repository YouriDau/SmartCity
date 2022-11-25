import React from "react";
import DeleteForm from "../../component/DeleteForm";
import Header from "../../component/Header";

class DeleteUser extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressDelete(event) {
    event.preventDefault();
    console.log("Delete user");
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete user"}
          text={"Are you sure you want to delete the user ?"}
          handlePressDelete={this.handlePressDelete}
        />
      </div>
    );
  }
}

export default DeleteUser;
