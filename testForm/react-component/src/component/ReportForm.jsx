import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addReportFetch, updateReportFetch, getReportByIdFetch } from "../component/API/useFetchReport";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

const ReportForm = (props) => {
  const [reason, setReason] = useState(props.currentReport?.reason || "");
  const [isDone, setIsDone] = useState(props.currentUser?.isDone || false);
  const id = parseInt(props.params.id);
  const navigate = useNavigate();

  const handlePressAdd = (event) => {
    event.preventDefault();
    addReportFetch(reason)
      .then((status) => {
        switch (status) {
          case 201:
            console.log("Insert Réussi!");
            break;
          default:
            console.log(`Error ${status}`);
        }
      })
      .catch((error) => {
        console.error("AddReportFetchError", error);
      });
  }

  const handlePressUpdate = (event) => {
    event.preventDefault();
    // console.log(reason);
    // console.log(id);
    // console.log(isDone);
    updateReportFetch(id, reason, isDone).then((status) => {
      console.log(status);
      switch (status) {
        case 201:
          console.log("Update Réussi!");
          break;
        default:
          console.log(`Error ${status}`);
      }
    });
  }

  const handlePressCancel = (event) => {
    navigate("/listReports");
  }

  return (
    <div>
      <h1>{props.title} {props.isUpdate ? props.currentReport.id : ""}</h1>
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
          <br/>
          {props.isUpdate ? 
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
            :
            ""
          }
        </div>
        <div>
          <button
            onClick={(event) =>
              props.isUpdate
                ? handlePressUpdate(event)
                : handlePressAdd(event)
            }
          >
            {props.titleButton}
          </button>
          <button style={{ backgroundColor: "grey" }} onClick={(event) => {handlePressCancel(event)}}>Cancel</button>
        </div>
      </form>
    </div>
    );
  
}

export default withParams(ReportForm);
