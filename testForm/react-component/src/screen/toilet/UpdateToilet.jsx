import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateToilet = (props) => {
  const id = parseInt(props.params.id);

  const handlePressUpdate = (event) => {
    event.preventDefault();
    console.log("Update toilet");
  };

  return (
    <div class="form">
      <div class="header">
        <Header />
      </div>
      <ToiletForm
        title={"Update this toilet"}
        titleButton={"Save"}
        handlePress={handlePressUpdate}
      />
    </div>
  );
};

export default withParams(UpdateToilet);
