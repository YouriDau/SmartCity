import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div id="header">
      <p>Pose ta crotte</p>
      <div id="btnsHeader">
        <Link to="/maps" id="btnHeader1">
          <button>maps</button>
        </Link>
        <Link to="/menuControle">
          <button id="btnHeader2">home</button>
        </Link>
      </div>
    </div>
  );
  
}

export default Header;
