import React from "react";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import ChoicesPanel from "../../component/ChoicesPanel";

const AdminChoices = () => {
  return (
    <div>
      <ChoicesPanel 
        choice1={"Change my password"} 
        choice2={"Change my others informations"}
        redirectionChoice1={"updateAdminPassword"}
        redirectionChoice2={"updateUser"}
      />
    </div>
  );
};

export default AdminChoices;
