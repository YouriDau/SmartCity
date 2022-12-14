import React from "react";
import { Link } from "react-router-dom";
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";
//import UpdateUser from "../screen/account/UpdateUser";
//import DeleteUser from "../screen/account/DeleteUser";

const List = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <table>
          {props.tab.map((item) => {
            return (
              <div className="list">
                {`${props.name} ${item[props.parameter]}`}

                <Link to={"/" + props.linkSeeMore + "/" + item.id}>
                  <button className="btnList">see more</button>
                </Link>
                <Link to={"/" + props.linkDelete + "/" + item.id}>
                  <button className="btnList">delete</button>
                </Link>
                <Link>
                  <button className="btnList">update pasword</button>
                </Link>
              </div>
            );
          })}
        </table>
      </div>

      <div>
        <button>Back</button>
      </div>
    </div>
  );
  
}

export default List;
