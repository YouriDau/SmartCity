import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addReportFetch,
  updateReportFetch,
} from "../component/API/useFetchReport";
import { UserContext } from "../utils/UserContext";

const ReportForm = (props) => {
  const [reason, setReason] = useState(props.currentReport?.reason || "");
  const [isDone, setIsDone] = useState(props.currentUser?.isDone || false);
  const id = parseInt(props.id);
  const toiletId = parseInt(props.toiletId);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    addReportFetch(token, reason, toiletId)
      .then((id) => {
        alert(`The report ${id} has been successfully added`);
        navigate("/maps");
      })
      .catch((error) => {
        console.error("AddReportFetchError", error);
      });
  };

  const handlePressUpdate = (event) => {
    event.preventDefault();
    updateReportFetch(id, reason, isDone)
      .then((status) => {
        alert(`The review ${id} has been successfully modify`);
        navigate("/reportChoices");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePressCancel = (event) => {
    if (props.isUpdate) {
      navigate("/reportChoices");
    } else {
      navigate("/maps");
    }
  };

  return (
    <div>
      <h1>
        {props.title} {props.isUpdate ? props.currentReport.id : ""}
      </h1>
      <form>
        <div>
          <label>{props.text}</label>
          <br />
          <textarea
            defaultValue={props.isUpdate ? props.currentReport.reason : ""}
            onChange={(event) => {
              setReason(event.target.value);
            }}
          />
          <br />
          {props.isUpdate && (
            <label>
              <input
                id="reportDone"
                type="checkbox"
                checked={isDone}
                onChange={() => {
                  setIsDone(!isDone);
                }}
              />
              Is the report done ?
            </label>
          )}
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
            onClick={(event) => {
              handlePressCancel(event);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
