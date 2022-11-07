import React from "react";
import Header from "./Header";

class ReadReports extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>List of reports</h1>
                <button style={{backgroundColor:"grey"}}>Back</button>
            </div>
            
        );
    }
}

export default ReadReports;