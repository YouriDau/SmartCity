import React from "react";
import { useState, useEffect } from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getReviewsByToiletIdFetch } from "../../component/API/useFetchReview";
import UpdateReview from "../review/UpdateReview";
import DeleteReview from "../review/DeleteReview";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const ListReviews = (props) => {
  const toiletId = parseInt(props.params.toiletId);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewsByToiletIdFetch(toiletId).then((reviews) => {
      setReviews(reviews);
    });
  }, []) 

  return (
    <div>
      <Header />
      <div>
        <List
          title={"List of reviews for this toilet"}
          tab={reviews}
          name={"review"}
          parameter={"id"}
          linkSeeMore={`updateReview`}
          linkDelete={`deleteReview`}
        />
      </div>
    </div>
  );
  
}

export default withParams(ListReviews);
