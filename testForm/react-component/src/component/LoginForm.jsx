import React from "react";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div class="form">
               <h1>Login</h1>
               <form style={{textAlign:"left", width: 200, marginLeft: "auto", marginRight: "auto"}}>
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
                        <button>Login</button>
                    </div>
               </form>
            </div>
        );
    }
}

export default LoginForm;