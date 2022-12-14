import React from "react";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";

const AddReview = () => {

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

export default AddReview;
