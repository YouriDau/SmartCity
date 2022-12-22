import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { addToiletFetch, updateToiletFetch } from "./API/useFetchToilet";

const ToiletForm = (props) => {
  const [isPaid, setIsPaid] = useState(props.toilet?.isPaid || false);
  const [isReducedMobility, setIsReducedMobility] = useState(
    props.toilet?.isReducedMobility || false
  );
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    addToiletFetch(
      token,
      props.coordinate.lat,
      props.coordinate.lng,
      isPaid,
      isReducedMobility
    )
      .then(({ status, toiletId }) => {
        alert(`The toilet (id: ${toiletId}) has been succeffully added!`);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        navigate("/maps");
      });
  };

  const handlePressUpdate = (event) => {
    event.preventDefault();
    console.log(isPaid);
    console.log(isReducedMobility);
    updateToiletFetch(token, props.toilet.id, isPaid, isReducedMobility)
      .then(() => {
        alert(`The toilet ${props.toilet.id} has been successfully modify!`);
        navigate("/maps");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressCancel = (event) => {
    event.preventDefault();
    navigate("/maps");
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <p>
          Is the toilet paid ?
          <input
            checked={isPaid}
            type="checkbox"
            onChange={(e) => {
              setIsPaid(e.target.checked);
            }}
          />
        </p>
      </div>
      <div>
        <p>
          Is the toilet for reduce mobility people ?
          <input
            checked={isReducedMobility}
            type="checkbox"
            onChange={(e) => {
              setIsReducedMobility(e.target.checked);
            }}
          />
        </p>
      </div>
      <div>
        <button
          style={{ backgroundColor: "green" }}
          onClick={(event) => {
            props.isUpdate ? handlePressUpdate(event) : handlePressAdd(event);
          }}
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
    </div>
  );
};

export default ToiletForm;
