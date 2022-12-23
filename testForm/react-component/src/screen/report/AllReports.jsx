import { useState } from "react";
import { useEffect } from "react";
import { getAllReportsFetch } from "../../component/API/useFetchReport";
import Header from "../../component/Header";
import List from "../../component/List";
import SearchBar from "../../component/SearchBar";

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [reportsToShow, setReportsToShow] = useState([]);

  useEffect(() => {
    getAllReportsFetch()
      .then((newReports) => {
        setReports(newReports);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    setReportsToShow(reports);
  }, [reports]);

  const changeValuesToShow = (toiletId) => {
    const id = parseInt(toiletId);
    if (id) {
      const reportsToShow = reports;
      const afterFiltering = reportsToShow.filter((report) => {
        return report.toiletId === id;
      });
      setReportsToShow(afterFiltering);
    } else {
      setReportsToShow(reports);
    }
  };

  return (
    <div>
      <Header />
      {console.log(reports)}
      <SearchBar
        defaultValue="Enter the toilet id here"
        callback={changeValuesToShow}
      />
      {reports.length > 0 ? (
        <List
          title={"All reports"}
          tab={reportsToShow}
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

export default AllReports;
