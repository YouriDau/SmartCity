import React from "react";
import Header from "../../component/Header";
import { loginFetch } from "../../component/API/useFetchPerson";
import { Redirect, Route } from "react-router-dom";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputPseudo: "",
      inputPassword: "",
    };
  }

  handlePressLogin(event) {
    event.preventDefault();
    loginFetch(this.state.inputPseudo, this.state.inputPassword).then(
      (result) => {
        if (result.status === 200) {
          alert("Login success");
          localStorage.setItem("token", result.data);
          console.log(result.data);
        } else {
          console.log("Login failed");
        }
      }
    );
  }

  render() {
    return (
      <div className="form">
        <Header />
        <h1>Login</h1>
        <form>
          <div className="divForm">
            <label>Pseudo</label>
            <br />
            <input
              type="text"
              onChange={(event) => {
                this.setState({ inputPseudo: event.target.value });
              }}
            />
          </div>
          <div className="divForm">
            <label>Password</label>
            <br />
            <input
              type="password"
              onChange={(event) => {
                this.setState({ inputPassword: event.target.value });
              }}
            />
          </div>
          <div className="divForm">
            <button>Cancel</button>
            <button onClick={(event) => this.handlePressLogin(event)}>
              Login
            </button>

            {/*-composant redirect pour la redirection
               -onclick devra faire apparaitre composant redirect
               -le navigateur va lire redirect et rediriger vers la bonne adresse*/}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
