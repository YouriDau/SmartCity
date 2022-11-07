import React from "react";
import Header from "./Header";

class DeleteReport extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>Delete report</h1>
                <div>
                    <p>Are you sure you want to delete the report ?</p>
                </div>
                <div>
                    <button style={{backgroundColor:'green'}}>Yes</button>
                    <button style={{backgroundColor:'grey'}}>No</button>
                </div>
            </div>
           
        );
    }
}

export default DeleteReport;