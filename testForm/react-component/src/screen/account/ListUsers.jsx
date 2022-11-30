import React from "react";
import List from "../../component/List";
import Header from "../../component/Header";
//import { getAllPersonsFetch } from "../component/API/useFetchPerson";

class ListUsers extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <List 
          title={"List of users"}
        />
      </div>
    );
  }
}

export default ListUsers;
