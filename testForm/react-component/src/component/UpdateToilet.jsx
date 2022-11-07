import React from "react";
import Header from "./Header";

class UpdateToilet extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>Update toilet</h1>
                <div>
                    Is the toilet free ?
                    <input type='radio'/>Yes
                    <input type='radio'/>No
                </div>
                <div>
                    Is the toilet for reduce mobility people ?
                    <input type='radio'/>Yes
                    <input type='radio'/>No
                </div>
                <div>
                    <button style={{backgroundColor: 'green'}}>Save modifications</button>
                    <button style={{backgroundColor: 'grey'}}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default UpdateToilet;