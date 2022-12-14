import React from "react";

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCurrentPassword: "",
            inputNewPassword: "",
            inputConfirmNewPassword: "",
        };
    }

    render() {
        return (
            <div className="form">
                <h1>Change the user's password</h1>
                <div>
                    <label>Enter the current password</label>
                    <br/>
                    <input
                        type="password"
                        onChange={(event) => {
                            this.setState({ inputCurrentPassword: event.target.value });
                        }}
                    />
                </div>
                <div>
                    <label>Enter the new password</label>
                    <br/>
                    <input
                        type="password"
                        onChange={(event) => {
                            this.setState({ inputNewPassword: event.target.value });
                        }}
                    />
                </div>
                <div>
                    <label>Confirm the new password</label>
                    <br/>
                    <input
                        type="password"
                        onChange={(event) => {
                            this.setState({ inputConfirmNewPassword: event.target.value });
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default UpdatePassword;