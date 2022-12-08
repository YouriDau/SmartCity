import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import { deleteToiletFetch } from "../../component/API/useFetchToilet";
import {useParams} from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class DeleteToilet extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.params.id);
    this.state = {
      id,
    };
  }

  async handlePressDelete(event) {
    event.preventDefault();
    deleteToiletFetch(this.state.id).then((status) => {
      console.log(status);
    })
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete toilet"}
          text={"Do you really want to delete the toilet ?"}
          handlePressDelete={(event) => {this.handlePressDelete(event)}}
        />
      </div>
    );
  }
}

export default withParams(DeleteToilet);
