import React from "react";
import Header from "../../component/Header";
import { loginFetch } from "../../component/API/useFetchPerson";
import { Route, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const handlePressLogin = (event) => {
    event.preventDefault();
    loginFetch(inputPseudo, inputPassword).then((result) => {
      if (result.status === 200) {
        alert("Login success");
        console.log(result.data);
        localStorage.setItem("token", result.data);
        navigate("/maps");
      } else {
        console.log("Login failed");
      }
    });
  };

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
              setInputPseudo(event.target.value);
            }}
          />
        </div>
        <div className="divForm">
          <label>Password</label>
          <br />
          <input
            type="password"
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
          />
        </div>
        <div className="divForm">
          <button>Cancel</button>
          <button onClick={(event) => handlePressLogin(event)}>Login</button>

          {/*-composant redirect pour la redirection
               -onclick devra faire apparaitre composant redirect
               -le navigateur va lire redirect et rediriger vers la bonne adresse*/}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
