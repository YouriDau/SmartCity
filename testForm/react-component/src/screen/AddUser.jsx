import React from "react";
import Header from '../component/Header';
import UserForm from '../component/UserForm';
import {Link} from 'react-router-dom';


class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            //users: [],
            inputPseudo: "",
            inputLastName: "",
            inputFirstName: "",
            inputPassword: "",
            inputEmail: ""
        };
    }

    render() {
        return (
            <div class="form">
                <div class="header">
                    <Header/>
                </div>
                <UserForm title={"Add user"} titleButton={"Register"} isUpdate={false} />
            </div>
        );
    }
}

export default AddUser;