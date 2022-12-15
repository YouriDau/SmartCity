import React from "react";
import DeleteForm from "../../component/DeleteForm";
import Header from "../../component/Header";
import { deletePersonByIdFetch } from "../../component/API/useFetchPerson";
//import {connect} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteUser = (props) => {
  const id = parseInt(props.params.id);
  const navigate = useNavigate();

  const handlePressDelete = (event) => {
    event.preventDefault();
    deletePersonByIdFetch(id).then((status) => {
      console.log(status);
    });
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    navigate("/listUsers");
  }

  return (
    <div>
      <Header />
      <DeleteForm
        title={`Delete user ${id}`}
        text={"Are you sure you want to delete the user ?"}
        handlePressDelete={(event) => {handlePressDelete(event)}} // callback
        handlePressCancel={(event) => {handlePressCancel(event)}}
      />
    </div>
  );
};

export default withParams(DeleteUser);
