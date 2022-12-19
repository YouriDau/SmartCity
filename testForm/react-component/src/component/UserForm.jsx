import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addPersonFetch,
  updatePersonFetch,
} from "../component/API/useFetchPerson"; // dans l'objet useFetchPerson on prend addPersonFetch
import { UserContext } from "../utils/UserContext";

const UserForm = (props) => {
  const { user: admin, setUser: setAdmin, token } = useContext(UserContext);
  const [inputPseudo, setInputPseudo] = useState(props.user.pseudo || "");
  const [inputLastName, setInputLastName] = useState(props.user.lastName || "");
  const [inputFirstName, setInputFirstName] = useState(
    props.user.firstName || ""
  );
  const [inputPassword, setInputPassword] = useState(props.user.password || "");
  const [inputEmail, setInputEmail] = useState(props.user.email || "");
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
      token,
      inputPseudo,
      inputLastName,
      inputFirstName,
      inputEmail
    )
      .then((status) => {
        if (status === 200) {
          console.log("Update Réussi!");

          if (props.user.id === admin.id) {
            setAdmin({
              id: admin.id,
              pseudo: inputPseudo,
              lastName: inputLastName,
              firstName: inputFirstName,
              email: inputEmail,
            });
            navigate("/menuControle");
          } else {
            navigate("/listUsers");
          }
        }
      })
      .catch((error) => {
        alert(error.message);
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
              defaultValue={props.isUpdate ? props.user.lastName : ""}
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
              defaultValue={props.isUpdate ? props.user.firstName : ""}
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
          <div className="buttonDivForm">
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
