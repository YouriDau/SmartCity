import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popup } from "react-leaflet";
import {
  IoIosCheckmarkCircleOutline, // check circle
  IoIosCloseCircleOutline, // close circle
  IoIosAddCircle, // add circle
  IoIosList, // list
  IoIosTrash, // trash
  IoMdCreate, // update
} from "react-icons/io";

const ICONS_SIZE = 30;

const PopupToilet = (props) => {
  return (
    <Popup>
      <h1>Toilet {props.toiletId}</h1>
      <div className="popupSubContainer">
        <Link to={`/deleteToilet/${props.toiletId}`}>
          <IoIosTrash size={ICONS_SIZE} color="red" />
        </Link>
        <Link to={`/updateToilet/${props.toiletId}`}>
          <IoMdCreate size={ICONS_SIZE} color="orange" />
        </Link>
      </div>

      <div className="toiletOptions">
        <div className="options">
          {props.isPaid ? (
            <IoIosCheckmarkCircleOutline size={ICONS_SIZE} color="green" />
          ) : (
            <IoIosCloseCircleOutline size={ICONS_SIZE} color="red" />
          )}
          <p className="iconText">is paid?</p>
        </div>
        <div className="options">
          {props.isReducedMobility ? (
            <IoIosCheckmarkCircleOutline size={ICONS_SIZE} color="green" />
          ) : (
            <IoIosCloseCircleOutline size={ICONS_SIZE} color="red" />
          )}
          <p className="iconText">is reduced mobility?</p>
        </div>
      </div>
      <div className="popupSubcontent">
        <p className="popupText">Reviews</p>
        <div className="popupSubContainer">
          <Link to={`/addReview/${props.toiletId}`}>
            <IoIosAddCircle size={ICONS_SIZE} color="blue" />
          </Link>
          <Link to={`/listReviews/${props.toiletId}`}>
            <IoIosList size={ICONS_SIZE} color="blue" />
          </Link>
        </div>

        <p className="popupText">Reports</p>
        <div className="popupSubContainer">
          <Link to={`/addReport/${props.toiletId}`}>
            <IoIosAddCircle size={ICONS_SIZE} color="blue" />
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default PopupToilet;
