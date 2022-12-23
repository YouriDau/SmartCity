import React from "react";
import Header from "../../component/Header";
import {
  getCurrentUserFetch,
  loginFetch,
} from "../../component/API/useFetchPerson";
import { Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

const LoginForm = () => {
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { setUser, setToken } = useContext(UserContext);

  const handlePressLogin = (event) => {
    event.preventDefault();
    loginFetch(inputPseudo, inputPassword)
      .then(({ token }) => {
        getCurrentUserFetch(token)
          .then(({ user }) => {
            if (user.role === "admin") {
              localStorage.setItem("token", token);
              setToken(token);
              setUser(user);
            } else {
              alert("You need to be an admin!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
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
