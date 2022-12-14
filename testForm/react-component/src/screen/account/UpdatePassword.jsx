import React from "react";
import { useState } from "react";

const UpdatePassword = (props) => {
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmNewPassword, setInputConfirmNewPassword] = useState("");

  return (
    <div className="form">
      <h1>Change the user's password</h1>
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
    </div>
  );
};

export default UpdatePassword;
