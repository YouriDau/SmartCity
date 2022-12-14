import React from "react";
import ReactSlider from "react-slider";
import { addReportFetch } from "../component/API/useFetchReport";
import { updateReportFetch } from "../component/API/useFetchReport";

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputReport: "",
      isChecked: false,
    };
  }

  async handlePressAdd(event) {
    event.preventDefault();
    addReportFetch(this.state.inputReport)
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

  async handlePressUpdate(event) {
    event.preventDefault();
    updateReportFetch(
      this.state.inputReport,
      this.state.isChecked,
    ).then((status) => {
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

  render() {
    return (
      <div>
        <h1>{this.props.title} {this.props.isUpdate ? this.props.currentReport.id : ""}</h1>
        <form>
          <div>
            <label>{this.props.text}</label>
            <br />
            <textarea
              defaultValue={this.props.isUpdate ? this.props.currentReport.reason : ""}
              onChange={(event) => {
                this.setState({ inputReport: event.target.value });
              }}
            />
            <br/>
            {this.props.isReport ? 
              <label>
                <input 
                  id="reportDone" 
                  type="checkbox" 
                  checked={this.state.isChecked}  
                  onChange={() => {
                    console.log(this.state.isChecked);
                    this.setState({isChecked : !this.state.isChecked});
                  }}
                />
                Is the report done ?
              </label>
              :
              <ReactSlider 
                min={0}
                max={5}
                step={1}
              />
            }
          </div>
          <div>
            <button
              onClick={(event) =>
                this.props.isUpdate
                  ? this.handlePressUpdate(event)
                  : this.handlePressAdd(event)
              }
            >
              {this.props.titleButton}
            </button>
            <button style={{ backgroundColor: "grey" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReportForm;
