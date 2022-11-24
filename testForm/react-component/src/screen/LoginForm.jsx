import React from "react";
import Header from "../component/Header";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handlePressLogin(event) {
        event.preventDefault();
        console.log("Connexion réussie");
    }

    render() {
        return (
            <div class="form">
                <Header/>
                <h1>Login</h1>
                <form>
                        <div class="divForm">
                            <label>Pseudo</label>
                            <br/>
                            <input type="text" style={{width: "100%"}}></input>
                        </div>
                        <div class="divForm">
                            <label>Password</label>
                            <br/>
                            <input type="text"></input>
                        </div>
                        <div class="divForm">
                            <button>Cancel</button>
                            <button onClick={(event) => this.handlePressLogin(event)}>Login</button>
                        </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;