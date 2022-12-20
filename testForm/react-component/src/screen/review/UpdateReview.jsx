import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";
import { getReviewFetch } from "../../component/API/useFetchReview";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateReview = (props) => {
  // const handlePressUpdate = (event) => {
  //   event.preventDefault();
  //   console.log("Update review");
  // };
  const id = parseInt(props.params.id);
  const [review, setReview] = useState("");

  useEffect(() => {
    getReviewFetch(id)
      .then((review) => {
        setReview(review);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <ReviewForm
        title={"Update this review"}
        titleButton={"Save"}
        //handlePress={handlePressUpdate}
        isUpdate={true}
        currentReview={review}
      />
    </div>
  );
};

export default withParams(UpdateReview);
