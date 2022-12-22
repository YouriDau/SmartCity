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
        redirectionChoice1={"listReports/all"}
        redirectionChoice2={"listReports/notDone"}
      />
    </div>
  );
};

export default ReportChoices;
