import * as React from "react";
import { Link } from "react-router-dom";
import { Popup } from "react-leaflet";
import {
  IoIosCheckmarkCircleOutline, // check circle
  IoIosCloseCircleOutline, // close circle
  IoIosAddCircle, // add circle
  IoIosRemoveCircle, // remove circle
  IoIosList, // list
  IoIosTrash, // trash
} from "react-icons/io";

const ICONS_SIZE = 30;

const PopupToilet = (props) => {
  return (
    <Popup>
      <h1>Toilet {props.toiletId}</h1>{" "}
      <Link to={`/deleteToilet/${props.toiletId}`}>
        <IoIosTrash size={ICONS_SIZE} color="blue" />
      </Link>
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
        <p className="popupReviewText">Reviews</p>
        <div className="popupReviewContainer">
          <Link to={`/addReview/${props.toiletId}`}>
            <IoIosAddCircle size={ICONS_SIZE} color="blue"></IoIosAddCircle>
          </Link>
          <Link to={`/listReviews/${props.toiletId}`}>
            <IoIosList size={ICONS_SIZE} color="blue" />
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default PopupToilet;
