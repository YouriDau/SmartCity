import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addPersonFetch,
  updatePersonFetch,
  updatePersonByIdFetch,
} from "../component/API/useFetchPerson"; // dans l'objet useFetchPerson on prend addPersonFetch
import { UserContext } from "../utils/UserContext";

const UserForm = (props) => {
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const {
    user: admin,
    setUser: setAdmin,
    token,
    setToken,
  } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isUpdate) {
      console.log(props);
      const user = props.user;
      setInputPseudo(user.pseudo);
      setInputLastName(user.lastName);
      setInputFirstName(user.firstName);
      setInputPassword(user.inputPassword);
      setInputEmail(user.email);
    }
  }, []);

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
        navigate("/usersPanel");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressUpdate = (event) => {
    event.preventDefault();
    if (props.user.id === admin.id) {
      updatePersonFetch(
        // permet de modifier le current user
        token,
        // props.user.id,
        inputPseudo,
        inputLastName,
        inputFirstName,
        inputEmail
      )
        .then(({ status, token }) => {
          alert(`The user ${inputPseudo} has been successfully modify!`);

          setAdmin({
            id: admin.id,
            pseudo: inputPseudo,
            lastName: inputLastName,
            firstName: inputFirstName,
            email: inputEmail,
          });
          setToken(token);
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      updatePersonByIdFetch(
        token,
        props.user.id,
        inputPseudo,
        inputLastName,
        inputFirstName,
        inputEmail
      )
        .then((status) => {
          alert("Your account has been successfully modify!");
          navigate("/listUsers");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    if (props.isUpdate) {
      if (props.user.id === admin.id) {
        navigate("/");
      } else {
        navigate("/uusersPanel");
      }
    } else {
      navigate("/usersPanel");
    }
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
              defaultValue={props.isUpdate ? inputPseudo : ""}
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
              defaultValue={props.isUpdate ? inputLastName : ""}
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
              defaultValue={props.isUpdate ? inputFirstName : ""}
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
              defaultValue={props.isUpdate ? inputEmail : ""}
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
