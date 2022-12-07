import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getAllReportsFetch } from "../../component/API/useFetchReport";
import { getNotDoneReportsFetch } from "../../component/API/useFetchReport";
import UpdateReport from "./UpdateReport";
import DeleteReport from "./DeleteReport";

class ListReports extends React.Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            title: "",
        };
    }

    /*componentDidMount() {
        // se charge au premier chargement de la page puis apres ca ne charge plus
        getAllReportsFetch().then((reports) => {
          this.setState({ reports: reports });
        });
      }*/

    async handlePressAllReport(event) {
        event.preventDefault();
        getAllReportsFetch().then((reports) => {
            this.setState({ reports: reports });
            this.setState({ title : "List of all reports"});
        });   
    }

    async handlePressNotDoneReport(event) {
        event.preventDefault();
        getNotDoneReportsFetch().then((reports) => {
            this.setState({ reports: reports });
            this.setState({ title : "List of not done reports"});
        });   
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <button onClick={(event) => {this.handlePressAllReport(event)}}>All reports</button>
                    <button onClick={(event) => {this.handlePressNotDoneReport(event)}}>Not done reports</button>
                </div>
                { this.state.reports.length > 0 ?  
                    <List 
                        title={this.state.title}
                        tab={this.state.reports}
                        name={"report"}
                        parameter={"id"}
                        linkSeeMore={`updateReport`}
                        linkDelete={`deleteReport`}
                    />
                    :
                    ""
                }
                
            </div>
        );
    }
}

export default ListReports;