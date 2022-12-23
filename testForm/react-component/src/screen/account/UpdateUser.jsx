import React, { useState } from "react";
import Header from "../../component/Header";
import UserForm from "../../component/UserForm";
import {
  getPersonByIdFetch,
  getCurrentUserFetch,
} from "../../component/API/useFetchPerson";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateUser = (props) => {
  const [user, setUser] = useState(null);
  const id = parseInt(props.params.id);
  const { user: admin } = useContext(UserContext);

  useEffect(() => {
    if (id !== undefined && id !== null && !isNaN(id)) {
      getPersonByIdFetch(id)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      setUser(admin);
    }
  }, [id]);

  return (
    <div className="form">
      <div className="header">
        <Header />
      </div>
      {console.log(admin)}
      {user !== null && (
        <UserForm
          title={"Update user"}
          titleButton={"Save"}
          isUpdate={true}
          user={user}
        />
      )}
    </div>
  );
};

export default withParams(UpdateUser);
