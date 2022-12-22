import React from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { useEffect } from "react";

const MenuControle = () => {

  const handlePressDisconnect = (event) => {

  }

  return (
    <div>
      <Header />
      <h1>Controle panel</h1>
      <div id="menuControle">
        <Link to={"/userChoices"} className="linkMenu">
          <div className="divMenu">
            <p>users</p>
          </div>
        </Link>
        <Link to={"/maps"} className="linkMenu">
          <div className="divMenu">
            <p>toilets</p>
          </div>
        </Link>
        <Link to={"/reportChoices"} className="linkMenu">
          <div className="divMenu">
            <p>reports</p>
          </div>
        </Link>
        <Link to={"/adminChoices"} className="linkMenu">
          <div className="divMenu">
            <p>my account</p>
          </div>
        </Link>
        <button className="linkMenu" onClick={(event) => handlePressDisconnect(event)}>
          <div className="divMenu">
            Disconnect
          </div>
        </button>
      </div>
    </div>
  );
};

export default MenuControle;
