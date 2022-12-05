import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getAllReportsFetch } from "../../component/API/useFetchReport";

class ListReports extends React.Component {
    constructor() {
        super();
        this.state = {
            reports: [],
        };
    }

    componentDidMount() {
        // se charge au premier chargement de la page puis apres ca ne charge plus
        getAllReportsFetch().then((reports) => {
          this.setState({ reports: reports });
        });
      }

    render() {
        return (
            <div>
                <Header />
                <List 
                    title={"List of not done reports"}
                    tab={this.state.reports}
                    name={"report"}
                    parameter={"id"}
                    linkSeeMore={`updateReport`}
                    linkDelete={`deleteReport`}
                />
            </div>
        );
    }
}

export default ListReports;