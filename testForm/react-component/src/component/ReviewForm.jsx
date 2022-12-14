import React from "react";
import { addReviewFetch } from "../component/API/useFetchReview";


class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputReview: ""
        };
    }

    async handlePressAdd(event) {
        event.preventDefault();
        addReviewFetch(this.state.inputReview)
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
            console.error("AddReviewFetchError", error);
          });
    }

    handlePressUpdate(event) {
        event.preventDefault();
        console.log("Update review");
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form>
                    <div>
                        

                        <br/>
                        <textarea
                            onChange={(event) => {
                                this.setState({ inputReview: event.target.value });
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

export default ReviewForm;