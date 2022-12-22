import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReportFetch } from "../../component/API/useFetchReport";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const DeleteReport = (props) => {
  const id = parseInt(props.params.id);
  const navigate = useNavigate();

  const handlePressDelete = (event) => {
    event.preventDefault();
    deleteReportFetch(id)
      .then((status) => {
        alert("Success, delete report successfully!");
        navigate("/maps");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    navigate("/reportChoices");
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
        handlePressCancel={(event) => {
          handlePressCancel(event);
        }}
      />
    </div>
  );
};

export default withParams(DeleteReport);
