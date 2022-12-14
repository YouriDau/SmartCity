import React from "react";
import DeleteForm from "../../component/DeleteForm";
import Header from "../../component/Header";
import { deletePersonByIdFetch } from "../../component/API/useFetchPerson";
//import {connect} from 'react-redux';
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteUser = (props) => {
  const id = parseInt(props.params.id);

  const handlePressDelete = (event) => {
    event.preventDefault();
    deletePersonByIdFetch(id).then((status) => {
      console.log(status);
    });
  };

  return (
    <div>
      <Header />
      <DeleteForm
        title={`Delete user ${id}`}
        text={"Are you sure you want to delete the user ?"}
        handlePressDelete={(event) => {
          handlePressDelete(event);
        }} // callback
      />
    </div>
  );
};

export default withParams(DeleteUser);
