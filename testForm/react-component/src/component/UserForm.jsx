import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addPersonFetch,
  updatePersonFetch,
} from "../component/API/useFetchPerson"; // dans l'objet useFetchPerson on prend addPersonFetch

const UserForm = (props) => {
  const [users, setUsers] = useState([]);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    addPersonFetch(
      inputPseudo,
      inputLastName,
      inputFirstName,
      inputEmail,
      inputPassword
    ).then((status) => {
      console.log(status);
      switch (status) {
        case 201:
          console.log("Insert Réussi!");
          navigate("/listUsers");
          break;
        default:
          console.log(`Error ${status}`);
      }
    });
  }

  const handlePressUpdate = (event) => {
    event.preventDefault();
    updatePersonFetch(
      inputPseudo,
      inputLastName,
      inputFirstName,
      inputEmail,
    ).then((status) => {
      console.log(status);
      switch (status) {
        case 201:
          console.log("Update Réussi!");
          navigate("/listUsers");
          break;
        default:
          console.log(`Error ${status}`);
      }
    });
  }

  const handlePressCancel = (event) => {
    navigate("/listUsers");
  }

  return (
    <div class="form">
      <div class="content">
        <h1>{props.title}</h1>
        <form>
          <div class="divForm">
            <label class="lblForm">Pseudo</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.pseudo : ""}
              onChange={(event) => {
                setInputPseudo(inputPseudo);
              }}
            />
          </div>
          <div class="divForm">
            <label>Last name</label>
            <br />
            <input
              type="text"
              defaultValue={
                props.isUpdate ? props.user.last_name : ""
              }
              onChange={(event) => {
                setInputLastName(inputLastName);
              }}
            />
          </div>
          <div class="divForm">
            <label>First name</label>
            <br />
            <input
              type="text"
              defaultValue={
                props.isUpdate ? props.user.first_name : ""
              }
              onChange={(event) => {
                setInputFirstName(inputFirstName);
              }}
            />
          </div>
          {props.registration ? (
            <div class="divForm">
              <label>Password</label>
              <br />
              <input
                type="password"
                onChange={(event) => {
                  setInputPassword(inputPassword);
                }}
              />
            </div>
          ) : (
            ""
          )}

          <div class="divForm">
            <label>Email</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.email : ""}
              onChange={(event) => {
                setInputEmail(inputEmail);
              }}
            />
          </div>
          <div class="divForm">
            {/* <button onClick={(event) => this.props.handlePress(event)}><Link to={`/addToilet`}>{this.props.titleButton}</Link></button> */}
            {/* <Link to={`/addToilet`}><button onClick={(event) => (this.props.isUpdate?handlePressUpdate(event):this.handlePressAdd(event) )}>{this.props.titleButton}</button></Link> */}
            <button
              onClick={(event) =>
                props.isUpdate
                  ? handlePressUpdate(event)
                  : handlePressAdd(event)
              }
            >
              {props.titleButton}
            </button>
            <button onClick={(event) => {handlePressCancel(event)}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default UserForm;
