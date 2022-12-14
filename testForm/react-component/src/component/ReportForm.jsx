import React from "react";
import { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { addReportFetch, updateReportFetch, getReportByIdFetch } from "../component/API/useFetchReport";

const ReportForm = (props) => {
  const [inputReport, setInputReport] = useState("");
  const [isChecked, setIsChecked] = useState(props.currentUser?.isDone || false);

  const handlePressAdd = (event) => {
    event.preventDefault();
    addReportFetch(inputReport)
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
    updateReportFetch(inputReport, isChecked).then((status) => {
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
              setInputReport(inputReport);
            }}
          />
          <br/>
          {props.isUpdate ? 
            <label>
              <input 
                id="reportDone" 
                type="checkbox" 
                checked={isChecked}  
                onChange={() => {
                  console.log(isChecked);
                  setIsChecked(!isChecked);
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
          <button style={{ backgroundColor: "grey" }}>Cancel</button>
        </div>
      </form>
    </div>
    );
  
}

export default ReportForm;
