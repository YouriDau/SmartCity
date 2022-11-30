import React from "react";
import { addReportFetch } from "../component/API/useFetchReport"

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputReport: ""
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

    handlePressUpdate(event) {
        event.preventDefault();
        console.log("Update report");
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form>
                    <div>
                        <label>{this.props.text}</label>
                        <br/>
                        <textarea 
                            onChange={(event) => {
                                this.setState({ inputReport: event.target.value });
                            }} 
                        />
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
                        <button style={{backgroundColor:'grey'}}>Cancel</button>
                    </div>
                </form>
                
            </div>
           
        );
    }
}

export default ReportForm;