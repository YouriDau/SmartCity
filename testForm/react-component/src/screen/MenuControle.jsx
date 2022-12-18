import React from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

const MenuControle = () => {
  return (
    <div>
      <Header />
      <h1>Controle panel</h1>
      <div id="menuControle">
        <Link to={"/listUsers"} className="linkMenu">
          <div className="divMenu">
            <p>users</p>
          </div>
        </Link>
        <Link className="linkMenu">
          <div className="divMenu">
            <p>reviews</p>
          </div>
        </Link>
        <Link to={"/maps"} className="linkMenu">
          <div className="divMenu">
            <p>toilets</p>
          </div>
        </Link>
        <Link to={"/listReports"} className="linkMenu">
          <div className="divMenu">
            <p>reports</p>
          </div>
        </Link>
        <Link to={"/updateUser"} className="linkMenu">
          <div className="divMenu">
            <p>my account</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuControle;
