import React from "react";

const DeleteForm = (props) => {

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <p>{props.text}</p>
            </div>
            <div>
                <button style={{backgroundColor:'green'}} onClick={(event) => props.handlePressDelete(event)}>Yes</button>
                <button style={{backgroundColor:'grey'}} onClick={(event) => props.handlePressCancel(event)}>No</button>
            </div>
        </div>
        
    );
    
}

export default DeleteForm;