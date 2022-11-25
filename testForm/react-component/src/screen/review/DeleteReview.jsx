import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";

class DeleteReview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressDelete(event) {
    event.preventDefault();
    console.log("Delete review");
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete review"}
          text={"Do you really want to delete the review ?"}
          handlePressDelete={this.handlePressDelete}
        />
      </div>
    );
  }
}

export default DeleteReview;
