import React from "react";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";

const UpdateReview = () => {
  const handlePressUpdate = (event) => {
    event.preventDefault();
    console.log("Update review");
  };

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <ReviewForm
        title={"Update this review"}
        titleButton={"Save"}
        handlePress={handlePressUpdate}
      />
    </div>
  );
};

export default UpdateReview;
