import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMdEye, // see more
  IoMdTrash, // trash
  IoMdCreate, // update
  IoIosStar, // star
} from "react-icons/io";
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";
//import UpdateUser from "../screen/account/UpdateUser";
//import DeleteUser from "../screen/account/DeleteUser";

const List = (props) => {
  const navigate = useNavigate();

  const handlePressCancel = (event) => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>{props.title}</h1>
      <div>
        <div className="listTable">
          {props.tab.map((item) => {
            return (
              <div key={item.id} className="list">
                <div>
                  {props.isUsersList ? (
                    <>
                      <p className="userInfo">id: {item.id}</p>
                      <p className="userInfo">{item.pseudo}</p>
                    </>
                  ) : (
                    <>
                      <p className="userInfo">id: {item.id}</p>
                      <p className="userInfo">{item.comment}</p>
                      <div className="listStar">
                        <p className="userInfo">note: {item.note}</p>
                        <IoIosStar
                          size={20}
                          color="orange"
                          className="starSymbol"
                        />
                      </div>
                    </>
                  )}

                  {console.log(props)}
                </div>
                <div className="userListBtns">
                  <Link to={"/" + props.linkSeeMore + "/" + item.id}>
                    <button className="btnList">
                      <IoMdEye size={20} color="black" />
                    </button>
                  </Link>
                  <Link
                    to={{ pathname: "/" + props.linkDelete + "/" + item.id }}
                  >
                    <button className="btnList">
                      <IoMdTrash size={20} color="black" />
                    </button>
                  </Link>
                  {props.isUsersList ? (
                    <Link to={`/${props.linkUpdate}/${item.id}`}>
                      <button className="btnList">
                        <IoMdCreate size={20} color="black" />
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button
          onClick={(event) => {
            handlePressCancel(event);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default List;
