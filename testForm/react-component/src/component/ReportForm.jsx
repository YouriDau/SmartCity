import React from "react";

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    <p>{this.props.text}</p>
                    <textarea></textarea>
                </div>
                <div>
                    <button style={{backgroundColor:'green'}} onClick={(event) => this.props.handlePress(event)}>{this.props.titleButton}</button>
                    <button style={{backgroundColor:'grey'}}>No</button>
                </div>
            </div>
           
        );
    }
}

export default ReportForm;