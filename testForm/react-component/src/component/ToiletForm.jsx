import React from "react";

class ToiletForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>
                    <p>
                        Is the toilet free ?
                        <input type='checkbox'/>Yes
                    </p>
                </div>
                <div>
                    <p>
                        Is the toilet for reduce mobility people ?
                        <input type='checkbox'/>Yes
                    </p>
                </div>
                <div>
                    <button style={{backgroundColor: 'green'}} onClick={(event) => this.props.handlePress(event)}>{this.props.titleButton}</button>
                    <button style={{backgroundColor: 'grey'}}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default ToiletForm;