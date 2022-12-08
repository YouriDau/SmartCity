import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { useParams } from "react-router-dom";
import { deleteReviewFetch } from "../../component/API/useFetchReview";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class DeleteReview extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.params.id);
    this.state = {
      id,
    };
  }

  handlePressDelete(event) {
    event.preventDefault();
    console.log(this.state.id);
    deleteReviewFetch(this.state.id).then((status) => {
      console.log(status);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete review"}
          text={"Do you really want to delete the review ?"}
          handlePressDelete={(event) => {this.handlePressDelete(event)}}
        />
      </div>
    );
  }
}

export default withParams(DeleteReview);
