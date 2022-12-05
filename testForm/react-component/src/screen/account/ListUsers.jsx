import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
import UpdateUser from "../account/AddUser";
import DeleteUser from "../account/UpdateUser";
import { getAllPersonsFetch } from "../../component/API/useFetchPerson";

class ListUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    // se charge au premier chargement de la page puis apres ca ne charge plus
    getAllPersonsFetch().then((persons) => {
      this.setState({ persons: persons });
    });
  }
  

  render() {
    return (
      <div>
        <Header />
        <List 
          title={"List of users"}
          tab={this.state.persons}
          name={"user"}
          parameter={"id"}
          linkSeeMore={`updateUser`}
          linkDelete={`deleteUser`}
        />
      </div>
    );
  }
}

export default ListUsers;
