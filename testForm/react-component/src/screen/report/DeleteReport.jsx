import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { Navigate, useParams } from "react-router-dom";
import { deleteReportFetch } from "../../component/API/useFetchReport";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteReport = (props) => {
  const id = parseInt(props.params.id);

  const handlePressDelete = (event) => {
    event.preventDefault();
    console.log(id);
    deleteReportFetch(id).then((status) => {
      console.log(status);
    });
  };

  return (
    <div>
      <Header />
      <DeleteForm
        title={"Delete report"}
        text={"Do you really want to delete the report ?"}
        handlePressDelete={(event) => {
          handlePressDelete(event);
        }}
      />
    </div>
  );
};

export default withParams(DeleteReport);
