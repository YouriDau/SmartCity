import React from "react";
import { useState, useEffect } from "react";
import Header from "../../component/Header";
import ReportForm from "../../component/ReportForm";
//import { updateReportFetch } from "../../component/API/useFetchReport";
import { getReportByIdFetch } from "../../component/API/useFetchReport";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateReport = (props) => {
  const id = parseInt(props.params.id);
  const [report, setReport] = useState("");

  useEffect(() => {
    getReportByIdFetch(id)
      .then((report) => {
        setReport(report);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <ReportForm
        title={"Update this report"}
        titleButton={"Save"}
        isReport={true}
        // handlePress={handlePressUpdate}
        isUpdate={true}
        currentReport={report}
      />
    </div>
  );
};

export default withParams(UpdateReport);
