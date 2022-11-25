import React from "react";
import Header from "../../component/Header";
import UserForm from "../../component/UserForm";

class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      inputPseudo: "",
      inputLastName: "",
      inputFirstName: "",
      inputPassword: "",
      inputEmail: "",
    };
    //this.state.labels = props.labels
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
        />
      </div>
    );
  }
}

export default UpdateUser;
