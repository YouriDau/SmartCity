import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getReviewsByToiletIdFetch } from "../../component/API/useFetchReview";
import UpdateReview from "../review/UpdateReview";
import DeleteReview from "../review/DeleteReview";

class ListReviews extends React.Component {
    constructor() {
        super();
        this.state = {
            reviews: [],
        };
    }

    componentDidMount() {
        getReviewsByToiletIdFetch().then((reviews) => {
            this.setState({ reviews : reviews });
            console.log(reviews);
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <List 
                        title={"List of reviews for this toilet"}
                        tab={this.state.reviews}
                        name={"review"}
                        parameter={"id"}
                        linkSeeMore={`updateReview`}
                        linkDelete={`deleteReview`}
                    />
                </div>
            </div>
        );
    }
}

export default ListReviews;