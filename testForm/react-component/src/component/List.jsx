import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMdEye, // see more
  IoMdTrash, // trash
  IoMdCreate, // update
  IoIosStar, // star
  IoMdLock, // lock
} from "react-icons/io";
import SearchBarUser from "./SearchBar";
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";
//import UpdateUser from "../screen/account/UpdateUser";
//import DeleteUser from "../screen/account/DeleteUser";

const List = (props) => {
  const navigate = useNavigate();

  const handlePressCancel = () => {
    navigate(props.linkBack);
  };

  const showContent = () => {
    if (props.tab !== undefined && props.tab.length > 0) {
      return props.tab.map((item) => {
        return (
          <div key={item.id} className="list">
            <div>
              <p className="userInfo">id: {item.id}</p>
              <p className="userInfo">{item.pseudo}</p>
              <p className="userInfo">{item.comment}</p>
              {item.note && (
                <div className="listStar">
                  <p className="userInfo">note: {item.note}</p>
                  <IoIosStar size={20} color="orange" className="starSymbol" />
                </div>
              )}
            </div>
            <p className="userInfo">{item.reason}</p>
            {item.isDone !== undefined && (
              <p className="userInfo">{item.isDone ? "done" : "not done"}</p>
            )}

            <div className="userListBtns">
              <Link to={"/" + props.linkSeeMore + "/" + item.id}>
                <button className="btnList">
                  <IoMdEye size={20} color="black" />
                </button>
              </Link>
              <Link to={{ pathname: "/" + props.linkDelete + "/" + item.id }}>
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
      });
    } else {
      return <p>The list is empty</p>;
    }
  };

  return (
    <div className="container" style={{}}>
      <h1>{props.title}</h1>
      <div className="listTable">{showContent()}</div>
      <div className="bottomBtns">
        <button
          className=""
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
