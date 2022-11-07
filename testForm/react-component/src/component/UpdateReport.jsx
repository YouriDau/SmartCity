import React from "react";
import Header from "./Header";

class UpdateReport extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>Report toilet</h1>
                <p>------------Report's content-------------</p>
                <p>Is the problem solved ?</p>
                <input type="radio"/>Yes
                <input type="radio"/>No
                <div>
                    <button style={{backgroundColor: 'green'}}>Submit</button>
                    <button style={{backgroundColor: 'grey'}}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default UpdateReport;