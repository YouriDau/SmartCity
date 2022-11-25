import React from "react";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";

class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handlePressAdd(event) {
    event.preventDefault();
    console.log("Add review");
  }

  render() {
    return (
      <div class="form">
        <div class="header">
          <Header />
        </div>
        <ReviewForm
          title={"Add a review"}
          titleButton={"Submit"}
          handlePress={this.handlePressAdd}
        />
      </div>
    );
  }
}

export default AddReview;
