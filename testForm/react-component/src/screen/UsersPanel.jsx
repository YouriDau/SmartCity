import React from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

const UsersPanel = () => {
  return (
    <div>
      <Header />
      <h1>Users panel</h1>
      <div id="usersPanel">
        <Link to={"/listUsers"} className="linkMenu">
          <div className="divMenu">
            <p>List users</p>
          </div>
        </Link>
        <Link to={"/addUser"} className="linkMenu">
          <div className="divMenu">
            <p>Add user</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UsersPanel;
