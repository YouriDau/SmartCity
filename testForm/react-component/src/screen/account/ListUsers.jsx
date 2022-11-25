import React from "react";
import Header from "../../component/Header";

class ListUsers extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <h1>List of users</h1>
        <button>Back</button>
      </div>
    );
  }
}

export default ListUsers;
