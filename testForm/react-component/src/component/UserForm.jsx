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
    )
      .then((status) => {
        alert("Account successfully added");
        navigate("/listUsers");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressUpdate = (event) => {
    event.preventDefault();
    updatePersonFetch(
      inputPseudo,
      inputLastName,
      inputFirstName,
      inputEmail
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
  };

  const handlePressCancel = (event) => {
    navigate("/listUsers");
  };

  return (
    <div className="form">
      <div className="content">
        <h1>{props.title}</h1>
        <form>
          <div className="divForm">
            <label className="lblForm">Pseudo</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.pseudo : ""}
              onChange={(event) => {
                setInputPseudo(event.target.value);
              }}
            />
          </div>
          <div className="divForm">
            <label>Last name</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.last_name : ""}
              onChange={(event) => {
                setInputLastName(event.target.value);
              }}
            />
          </div>
          <div className="divForm">
            <label>First name</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.first_name : ""}
              onChange={(event) => {
                setInputFirstName(event.target.value);
              }}
            />
          </div>
          {props.registration ? (
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
          ) : (
            ""
          )}

          <div className="divForm">
            <label>Email</label>
            <br />
            <input
              type="text"
              defaultValue={props.isUpdate ? props.user.email : ""}
              onChange={(event) => {
                setInputEmail(event.target.value);
              }}
            />
          </div>
          <div className="divForm">
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
            <button
              onClick={(event) => {
                handlePressCancel(event);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
