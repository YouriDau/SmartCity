import React from "react";
import Header from "../../component/Header";
import UserForm from "../../component/UserForm";
//import { Link } from "react-router-dom";

const AddUser = () => {
  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <UserForm
        title={"Add user"}
        titleButton={"Register"}
        isUpdate={false}
        registration={true}
      />
    </div>
  );
};

export default AddUser;
