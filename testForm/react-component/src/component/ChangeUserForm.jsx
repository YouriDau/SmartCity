import React from 'react';
//import Header from '/components/Header';

class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        //this.state.labels = props.labels
    }

    render() {
        return (
            <div class="form">
                <h1>Registration</h1>
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
                        <button>Login</button>
                    </div>
                </form>
                
            </div>
        );
    }
}

export default RegistrationForm;