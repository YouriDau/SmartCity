import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";

const AddToilet = () => {

  const handlePressAdd = (event) => {
    event.preventDefault();
    console.log("Add toilet");
  }

  
  return (
    <div class="form">
      <div class="header">
        <Header />
      </div>
      <ToiletForm
        title={"Add a toilet"}
        titleButton={"Submit"}
        handlePress={handlePressAdd}
      />
    </div>
  );
}


export default AddToilet;
