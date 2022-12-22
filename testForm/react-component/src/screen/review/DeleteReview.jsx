import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReviewFetch } from "../../component/API/useFetchReview";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteReview = (props) => {
  const id = parseInt(props.params.id);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePressDelete = (event) => {
    event.preventDefault();
    deleteReviewFetch(token, id)
      .then((status) => {
        alert("Success, delete review successfully!");
        navigate("/maps");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    navigate("/maps");
  };

  return (
    <div>
      <Header />
      <DeleteForm
        title={"Delete review"}
        text={"Do you really want to delete the review ?"}
        handlePressDelete={handlePressDelete}
        handlePressCancel={handlePressCancel}
      />
    </div>
  );
};

export default withParams(DeleteReview);
