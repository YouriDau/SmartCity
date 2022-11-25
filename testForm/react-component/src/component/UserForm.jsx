import React from "react";
import {Link} from 'react-router-dom';
import {addPersonFetch} from '../component/API/useFetchPerson'; // dans l'objet useFetchPerson on prend addPersonFetch

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            inputPseudo: "",
            inputLastName: "",
            inputFirstName: "",
            inputPassword: "",
            inputEmail: ""
        };
    }

    handlePressAdd(event) {
        event.preventDefault(); 
        console.log("on passe bien dans UserForm");
        addPersonFetch(this.state.inputPseudo, this.state.inputLastName, this.state.inputFirstName, this.state.inputEmail, this.state.inputPassword)
        .catch((error) => console.error("Add person error", error));
    }

    handlePressUpdate(event) {
        event.preventDefault();
        console.log("Update user");
    }    

    render() {
        return (
            <div class="form">
                <div class="content">
                    <h1>{this.props.title}</h1>
                    <form>
                        <div class="divForm">
                            <label class="lblForm">Pseudo</label>
                            <br/>
                            <input type="text"/>
                        </div>
                        <div class="divForm">
                            <label>Lastname</label>
                            <br/>
                            <input type="text"/>
                        </div>
                        <div class="divForm">
                            <label>Firstname</label>
                            <br/>
                            <input type="text"/>
                        </div>
                        <div class="divForm">
                            <label>Password</label>
                            <br/>
                            <input type="password"/>
                        </div>
                        <div class="divForm">
                            <label>Email</label>
                            <br/>
                            <input type="text"/>
                        </div>
                        <div class="divForm">
                            <button>Cancel</button>
                            {/* <button onClick={(event) => this.props.handlePress(event)}><Link to={`/addToilet`}>{this.props.titleButton}</Link></button> */}
                            {/* <Link to={`/addToilet`}><button onClick={(event) => (this.props.isUpdate?handlePressUpdate(event):this.handlePressAdd(event) )}>{this.props.titleButton}</button></Link> */}
                            <button onClick={(event) => (this.props.isUpdate?this.handlePressUpdate(event):this.handlePressAdd(event) )}>{this.props.titleButton}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserForm;