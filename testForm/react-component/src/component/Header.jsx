import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <p>Pose ta crotte</p>
      <div id="headerBtns">
        <Link to="/maps">
          <button className="headerBtn">maps</button>
        </Link>
        <Link to="/">
          <button className="headerBtn">Controle panel</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
