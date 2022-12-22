import React from "react";
import Header from "../../component/Header";
import ReportForm from "../../component/ReportForm";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const AddReport = (props) => {
  const toiletId = parseInt(props.params.toiletId);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <ReportForm
        title={`Add report toilet ${toiletId}`}
        titleButton={"Report"}
        isUpdate={false}
        toiletId={toiletId}
      />
    </div>
  );
};

export default withParams(AddReport);
