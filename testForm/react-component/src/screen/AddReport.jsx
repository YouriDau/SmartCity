import React from "react";
import Header from "../component/Header";
import ReportForm from "../component/ReportForm";

class AddReport extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handlePressAdd(event) {
        event.preventDefault();
        console.log("Add report");
    }

    render() {
        return (
            <div class="form">
                <div class="header">
                    <Header/>
                </div>
                <ReportForm title={"Add a report about this toilet"} titleButton={"Report"} handlePress={this.handlePressAdd}/>
            </div>
        );
    }

}

export default AddReport;