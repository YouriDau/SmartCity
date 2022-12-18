import React from "react";
import Header from "../../component/Header";
import ReportForm from "../../component/ReportForm";

const AddReport = () => {
  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <ReportForm
        title={"Add a report about this toilet"}
        titleButton={"Report"}
        isUpdate={false}
      />
    </div>
  );
};

export default AddReport;
