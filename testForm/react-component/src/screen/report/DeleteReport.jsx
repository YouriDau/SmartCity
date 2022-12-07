import React from "react";
import Header from "../../component/Header";
import DeleteForm from "../../component/DeleteForm";
import {Navigate, useParams} from 'react-router-dom';
import { deleteReportFetch } from "../../component/API/useFetchReport";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class DeleteReport extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.params.id);
    this.state = {
      id,
    };
  }

  async handlePressDelete(event) {
    event.preventDefault();
    console.log(this.state.id);
    deleteReportFetch(this.state.id).then((status) => {
      console.log(status);
    }) 
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete report"}
          text={"Do you really want to delete the report ?"}
          handlePressDelete={(event) => {this.handlePressDelete(event)}}
        />
      </div>
    );
  }
}

export default withParams(DeleteReport);
