import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import { getReviewsByToiletIdFetch } from "../../component/API/useFetchReview";
import UpdateReview from "../review/UpdateReview";
import DeleteReview from "../review/DeleteReview";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ListReviews extends React.Component {
  constructor(props) {
    super(props);
    const toiletId = parseInt(this.props.params.toiletId);
    this.state = {
      reviews: [],
      toiletId,
    };
  }

  componentDidMount() {
    getReviewsByToiletIdFetch(this.state.toiletId).then((reviews) => {
      this.setState({ reviews: reviews });
      //   console.log(reviews);
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

export default withParams(ListReviews);
