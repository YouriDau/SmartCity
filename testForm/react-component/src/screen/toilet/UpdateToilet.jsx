import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";

const UpdateToilet = () => { 

  const handlePressUpdate = (event) => {
    event.preventDefault();
    console.log("Update toilet");
  }

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
  
}

export default UpdateToilet;
