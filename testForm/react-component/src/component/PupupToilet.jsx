import * as React from "react";
import { Link } from "react-router-dom";
import { Popup } from "react-leaflet";
import {
  IoIosCheckmarkCircleOutline, // check circle
  IoIosCloseCircleOutline, // close circle
  IoIosAddCircle, // add circle
  IoIosRemoveCircle, // remove circle
  IoIosList, // list
} from "react-icons/io";

const ICONS_SIZE = 30;

const PopupToilet = (props) => {
  
  return (
    <Popup>
      <h1>Toilet {props.toiletId}</h1>
      <div class="toiletOptions">
        <div class="options">
          {props.isPaid ? (
            <IoIosCheckmarkCircleOutline size={ICONS_SIZE} color="green" />
          ) : (
            <IoIosCloseCircleOutline size={ICONS_SIZE} color="red" />
          )}
          <p class="iconText">is paid?</p>
        </div>
        <div class="options">
          {props.isReducedMobility ? (
            <IoIosCheckmarkCircleOutline size={ICONS_SIZE} color="green" />
          ) : (
            <IoIosCloseCircleOutline size={ICONS_SIZE} color="red" />
          )}
          <p class="iconText">is reduced mobility?</p>
        </div>
      </div>
      <div class="popupSubcontent">
        <p class="popupReviewText">Reviews</p>
        <div class="popupReviewContainer">
          <Link to={`/addReview/${props.toiletId}`}>
            <IoIosAddCircle size={ICONS_SIZE} color="blue"></IoIosAddCircle>
          </Link>
          <Link to={`/deleteToilet/${props.toiletId}`}>
            <IoIosRemoveCircle size={ICONS_SIZE} color="blue"/>
          </Link>
          <Link to={`/listReviews/${props.toiletId}`}>
            <IoIosList size={ICONS_SIZE} color="blue" />
          </Link>
        </div>
      </div>
    </Popup>
  );

}

export default PopupToilet;
