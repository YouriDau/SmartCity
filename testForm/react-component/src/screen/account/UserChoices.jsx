import React from "react";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import ChoicesPanel from "../../component/ChoicesPanel";

const UserChoices = () => {
  return (
    <div>
      <ChoicesPanel 
        choice1={"List users"} 
        choice2={"Add user"}
        redirectionChoice1={"listUsers"}
        redirectionChoice2={"addUser"}
      />
    </div>
  );
};

export default UserChoices;
