import React from "react";

class DeleteForm extends React.Component {
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
                </div>
                <div>
                    <button style={{backgroundColor:'green'}} onClick={(event) => this.props.handlePressDelete(event)}>Yes</button>
                    <button style={{backgroundColor:'grey'}}>No</button>
                </div>
            </div>
           
        );
    }
}

export default DeleteForm;