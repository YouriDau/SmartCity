import React from "react";
import Header from "../../component/Header";
import { loginFetch } from "../../component/API/useFetchPerson";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputPseudo: "",
      inputPassword: ""
    };
  }

  handlePressLogin(event) {
    event.preventDefault();
    loginFetch(this.state.inputPseudo, this.state.inputPassword).then((result) => {
      if (result.status === 200) {
        console.log("login success");
        localStorage.setItem("token", result.data);
      } else {
        console.log("login failed mskn");
      }
    });
  }

  render() {
    return (
      <div class="form">
        <Header />
        <h1>Login</h1>
        <form>
          <div class="divForm">
            <label>Pseudo</label>
            <br />
            <input 
              type="text"
              onChange={(event) => {
                this.setState({ inputPseudo : event.target.value });
              }}
            />
          </div>
          <div class="divForm">
            <label>Password</label>
            <br />
            <input 
              type="text"
              onChange={(event) => {
                this.setState({ inputPassword : event.target.value });
              }}
            />
          </div>
          <div class="divForm">
            <button>Cancel</button>
            <button onClick={(event) => this.handlePressLogin(event)}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
