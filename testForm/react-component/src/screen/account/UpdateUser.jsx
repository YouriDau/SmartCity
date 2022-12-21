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
  const [user, setUser] = useState(null);
  const id = parseInt(props.params.id);

  useEffect(() => {
    console.log(id);
    getPersonByIdFetch(id)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      <UserForm
        title={"Update user"}
        titleButton={"Save"}
        isUpdate={true}
        user={user}
      />
    </div>
  );
};

export default withParams(UpdateUser);
