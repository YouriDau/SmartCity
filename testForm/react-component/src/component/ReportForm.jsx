import React from "react";
import { addReportFetch } from "../component/API/useFetchReport"

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputReason: ""
        };
    }

    async handlePressAdd(event) {
        event.preventDefault();
        try {
            await addReportFetch(
                this.state.inputReason
            );
            console.log("Ajout effectué");
        } catch (error) {
            console.error("AddReportFetchError", error);
        }
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
                                this.setState({ inputReason: event.target.value });
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