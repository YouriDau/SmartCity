import React from "react";
import Header from "./Header";

class DeleteUser extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>Delete user</h1>
                <div>
                    <p>Are you sure you want to delete the user ?</p>
                    <p>Mettre les informations à propos de l'utilisateur</p>
                </div>
                <div>
                    <button style={{backgroundColor: 'green'}}>Yes</button>
                    <button style={{backgroundColor: 'grey'}}>No</button>
                </div>
            </div> 
        );
    }
}

export default DeleteUser;