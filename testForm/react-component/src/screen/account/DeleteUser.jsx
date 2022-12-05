import React from "react";
import DeleteForm from "../../component/DeleteForm";
import Header from "../../component/Header";
import { deletePersonByIdFetch } from "../../component/API/useFetchPerson";
//import {connect} from 'react-redux';
import {Navigate, useParams} from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
 

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const id = parseInt(this.props.params.id);
    this.state = {};
  }

  handlePressDelete(event) {
    event.preventDefault();
    deletePersonByIdFetch(this.id).then((status) => {
      console.log(status);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <DeleteForm
          title={"Delete user"}
          text={"Are you sure you want to delete the user ?"}
          handlePressDelete={this.handlePressDelete}
        />
      </div>
    );
  }
}

export default withParams(DeleteUser);
