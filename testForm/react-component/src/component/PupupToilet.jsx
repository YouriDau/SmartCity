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

class PopupToilet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Popup>
        <h1>Toilet {this.props.toiletId}</h1>
        <div class="toiletOptions">
          <div class="options">
            {this.props.isPaid ? (
              <IoIosCheckmarkCircleOutline size={ICONS_SIZE} color="green" />
            ) : (
              <IoIosCloseCircleOutline size={ICONS_SIZE} color="red" />
            )}
            <p class="iconText">is paid?</p>
          </div>
          <div class="options">
            {this.props.isReducedMobility ? (
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
            <Link to="/addReview">
              <IoIosAddCircle size={ICONS_SIZE} color="blue"></IoIosAddCircle>
            </Link>
            <Link to={`/deleteToilet/${this.props.toiletId}`}>
              <IoIosRemoveCircle size={ICONS_SIZE} color="blue"/>
            </Link>
            <Link to={`/listReviews/${this.props.toiletId}`}>
              <IoIosList size={ICONS_SIZE} color="blue" />
            </Link>
          </div>
        </div>
      </Popup>
    );
  }
}

export default PopupToilet;
