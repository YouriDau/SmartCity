import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { updateAdminPasswordFetch } from "./API/useFetchPerson";

const UpdatePassword = (props) => {
  const [inputCurrentPassword, setInputCurrentPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmNewPassword, setInputConfirmNewPassword] = useState("");
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePressSubmit = (event) => {
    event.preventDefault();
    if (inputNewPassword != inputConfirmNewPassword) {
      alert("the two news passwords doesn't match");
    } else {
      updateAdminPasswordFetch(token, inputCurrentPassword, inputNewPassword)
        .then((status) => {
          if (status === 204) {
            console.log("Update Réussi!");
            navigate("/");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form">
      {/* <h1>Change the user's password</h1> */}
      <h1>{props.title}</h1>
      {props.adminPassword ? (
        <div>
          <label>Enter the current password</label>
          <br />
          <input
            type="password"
            onChange={(event) => {
              setInputCurrentPassword(event.target.value);
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div>
        <label>Enter the new password</label>
        <br />
        <input
          type="password"
          onChange={(event) => {
            setInputNewPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <label>Confirm the new password</label>
        <br />
        <input
          type="password"
          onChange={(event) => {
            setInputConfirmNewPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={(event) => {
            handlePressSubmit(event);
          }}
        >
          Submit
        </button>
        <button
          onClick={(event) => {
            handlePressCancel(event);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
