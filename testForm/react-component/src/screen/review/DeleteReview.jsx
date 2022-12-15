import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { useParams } from "react-router-dom";
import { deleteReviewFetch } from "../../component/API/useFetchReview";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

const DeleteReview = (props) => {
  const id = parseInt(props.params.id);

  const handlePressDelete = (event) => {
    event.preventDefault();
    console.log(id);
    deleteReviewFetch(id).then((status) => {
      console.log(status);
    });
  }
  
  return (
    <div>
      <Header />
      <DeleteForm
        title={"Delete review"}
        text={"Do you really want to delete the review ?"}
        handlePressDelete={(event) => {handlePressDelete(event)}}
      />
    </div>
  );
  
}

export default withParams(DeleteReview);
