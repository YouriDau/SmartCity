import React, { useState } from "react";
import Header from "../../component/Header";
import UserForm from "../../component/UserForm";
import {
  getPersonByIdFetch,
  getCurrentUserFetch,
} from "../../component/API/useFetchPerson";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateUser = (props) => {
  const id = parseInt(props.params.id);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(id);
    getPersonByIdFetch(id).then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div class="form">
      <div class="header">
        <Header />
      </div>
      <UserForm
        title={"Update user"}
        titleButton={"Save modifications"}
        isUpdate={true}
        user={user}
      />
    </div>
  );
};

export default withParams(UpdateUser);
