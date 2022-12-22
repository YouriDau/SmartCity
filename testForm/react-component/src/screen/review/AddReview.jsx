import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header";
import ReviewForm from "../../component/ReviewForm";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const AddReview = (props) => {
  const toiletId = parseInt(props.params.toiletId);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      {!isNaN(toiletId) && (
        <ReviewForm
          title={"Add a review"}
          titleButton={"Submit"}
          isUpdate={false}
          toiletId={toiletId}
        />
      )}
    </div>
  );
};

export default withParams(AddReview);
