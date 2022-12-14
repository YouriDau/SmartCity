import React from "react";

const ToiletForm = (props) => {

    return (
        <div>
            <h1>{props.title}</h1>
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
                <button style={{backgroundColor: 'green'}} onClick={(event) => props.handlePress(event)}>{props.titleButton}</button>
                <button style={{backgroundColor: 'grey'}}>Cancel</button>
            </div>
        </div>
    );
    
}

export default ToiletForm;