import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";
//import UpdateUser from "../screen/account/UpdateUser";
//import DeleteUser from "../screen/account/DeleteUser";

const List = (props) => {
  const navigate = useNavigate();

  const handlePressCancel = (event) => {
    navigate("/menuControle");
  }

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
                {props.isUsersList
                  ? 
                    <Link to={`/${props.linkUpdate}/${item.id}`}>
                      <button className="btnList">update pasword</button>
                    </Link>
                  :
                  ""
                }
              </div>
            );
          })}
        </table>
      </div>

      <div>
        <button onClick={(event) => {handlePressCancel(event)}}>Back</button>
      </div>
    </div>
  );
  
}

export default List;
