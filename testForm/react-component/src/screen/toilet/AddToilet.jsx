import React from "react";
import Header from "../../component/Header";
import ToiletForm from "../../component/ToiletForm";
import { useLocation, useNavigate } from "react-router-dom";

const AddToilet = () => {
  const { state: location } = useLocation();

  return (
    <div class="form">
      <div class="header">
        <Header />
      </div>
      <ToiletForm
        title={"Add a toilet"}
        titleButton={"Submit"}
        coordinate={location.coordinate}
      />
    </div>
  );
};

export default AddToilet;
