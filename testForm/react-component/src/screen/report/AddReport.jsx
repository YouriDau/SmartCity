import React from "react";
import Header from "../../component/Header";
import ReportForm from "../../component/ReportForm";

class AddReport extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div class="form">
        <div class="header">
          <Header />
        </div>
        <ReportForm
          title={"Add a report about this toilet"}
          titleButton={"Report"}
          isUpdate={false}
        />
      </div>
    );
  }
}

export default AddReport;
