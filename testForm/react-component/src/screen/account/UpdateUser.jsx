import React from "react";
import Header from "../../component/Header";
import UserForm from "../../component/UserForm";
import { getPersonByIdFetch } from "../../component/API/useFetchPerson";
import {useParams} from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.params.id);
    this.state = {
      id, 
      user: "",
      inputPseudo: "",
      inputLastName: "",
      inputFirstName: "",
      inputPassword: "",
      inputEmail: "",
    };
  }

  componentDidMount() {
    getPersonByIdFetch(this.state.id).then((user) => {
      this.setState({user : user });
    })
  }

  render() {
    return (
      <div class="form">
        <div class="header">
          <Header />
        </div>
        <UserForm
          title={"Update user"}
          titleButton={"Save modifications"}
          isUpdate={true}
          currentUser={this.state.user}
        />
      </div>
    );
  }
}

export default withParams(UpdateUser);
