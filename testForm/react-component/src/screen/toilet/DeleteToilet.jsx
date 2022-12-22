import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { deleteToiletFetch } from "../../component/API/useFetchToilet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteToilet = (props) => {
  const id = parseInt(props.params.id);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const handlePressDelete = (event) => {
    event.preventDefault();
    deleteToiletFetch(token, id)
      .then((status) => {
        alert(`The toilet ${id} has been successfully deleted`);
        navigate("/maps");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <Header />
      <DeleteForm
        title={"Delete toilet"}
        text={"Do you really want to delete the toilet ?"}
        handlePressDelete={handlePressDelete}
      />
    </div>
  );
};

export default withParams(DeleteToilet);
