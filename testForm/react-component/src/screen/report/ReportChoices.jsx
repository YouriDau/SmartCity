import React from "react";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import ChoicesPanel from "../../component/ChoicesPanel";

const ReportChoices = () => {
  return (
    <div>
      <ChoicesPanel 
        choice1={"All reports"} 
        choice2={"Reports not done"}
        redirectionChoice1={"listUsers"}
        redirectionChoice2={"addUser"}
      />
    </div>
  );
};

export default ReportChoices;