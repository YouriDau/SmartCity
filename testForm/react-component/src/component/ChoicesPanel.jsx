import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const ChoicesPanel = (props) => {
  return (
    <div>
      <Header />
      <h1>Make your choice</h1>
      <div id="choicePanel">
        <Link to={`/${props.redirectionChoice1}`} className="linkMenu">
          <div className="divMenu">
            <p>{props.choice1}</p>
          </div>
        </Link>
        <Link to={`/${props.redirectionChoice2}`} className="linkMenu">
          <div className="divMenu">
            <p>{props.choice2}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChoicesPanel;