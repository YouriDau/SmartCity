import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";
import { useNavigate } from "react-router-dom";

const AddToilet = () => {
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    console.log("Add toilet");
  }

  const handlePressCancel = (event) => {
    navigate("/maps");
  }

  return (
    <div class="form">
      <div class="header">
        <Header />
      </div>
      <ToiletForm
        title={"Add a toilet"}
        titleButton={"Submit"}
        handlePressAdd={handlePressAdd}
        handlePressCancel={handlePressCancel}
      />
    </div>
  );
}


export default AddToilet;
