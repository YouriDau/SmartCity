import { useState } from "react";
import { useEffect } from "react";
import { getNotDoneReportsFetch } from "../../component/API/useFetchReport";
import Header from "../../component/Header";
import List from "../../component/List";

const AllReportsNotDone = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getNotDoneReportsFetch()
      .then((newReports) => {
        setReports(newReports);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div>
      <Header />
      {reports.length > 0 ? (
        <List
          title={"Not done reports"}
          tab={reports}
          name={"report"}
          parameter={"id"}
          linkSeeMore={`updateReport`}
          linkDelete={`deleteReport`}
          linkBack={`/reportChoices`}
          isUsersList={false}
        />
      ) : (
        "La liste est vide"
      )}
    </div>
  );
};

export default AllReportsNotDone;
