import React from "react";
import Header from "../component/Header";
import ReportForm from "../component/ReportForm";

class UpdateReport extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handlePressUpdate(event) {
        event.preventDefault();
        console.log("Update report");
    }

    render() {
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <ReportForm title={"Update this report"} titleButton={"Save"} handlePress={this.handlePressUpdate}/>
            </div>
        );
    }
}

export default UpdateReport;