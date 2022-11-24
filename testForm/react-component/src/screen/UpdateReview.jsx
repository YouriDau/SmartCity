import React from "react";
import Header from "../component/Header";
import ReviewForm from "../component/ReviewForm";

class UpdateReview extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handlePressUpdate(event) {
        event.preventDefault();
        console.log("Update review");
    }

    render() {
        return (
            <div class="form">
                <div class="header">
                    <Header/>
                </div>
                <ReviewForm title={"Update this review"} titleButton={"Save"} handlePress={this.handlePressUpdate}/>
            </div>
        );
    }
}

export default UpdateReview;