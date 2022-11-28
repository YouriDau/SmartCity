import React from "react";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";

class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {};
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
          isUpdate={false}
        />
      </div>
    );
  }
}

export default AddReview;
