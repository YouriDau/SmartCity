import React from "react";
import { useContext } from "react";
import {
  addReviewFetch,
  updateReviewFetch,
} from "../component/API/useFetchReview";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const ReviewForm = (props) => {
  console.log(props);
  const [note, setNote] = useState(props.currentReview?.note || 1);
  const [comment, setComment] = useState(props.currentReview?.comment || "");
  const toiletId = parseInt(props.toiletId);
  const id = parseInt(props.currentReview.id);

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    addReviewFetch(token, toiletId, note, comment)
      .then(({ status, id }) => {
        alert(`The review (id:${id}) has been successfully added!`);
        navigate("/maps");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handlePressUpdate = (event) => {
    event.preventDefault();
    updateReviewFetch(token, id, note, comment)
      .then((status) => {
        alert(`The review ${id} has been successfully modify!`);
        navigate("/maps");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressCancel = (event) => {
    navigate("/maps");
  };

  return (
    <div>
      <h1>
        {props.title} {props.currentReview?.id}
      </h1>
      <form>
        <div>
          <label>Rate the toilet : </label>
          <select
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <br />
          <label>Tell us why :</label>
          <textarea
            defaultValue={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={(event) =>
              props.isUpdate ? handlePressUpdate(event) : handlePressAdd(event)
            }
          >
            {props.titleButton}
          </button>
          <button
            style={{ backgroundColor: "grey" }}
            onClick={(event) => handlePressCancel(event)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
