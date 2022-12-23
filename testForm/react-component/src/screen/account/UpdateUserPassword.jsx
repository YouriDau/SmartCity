import React from "react";
import UpdatePassword from "../../component/UpdatePassword";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const UpdateUserPassword = (props) => {
  const id = parseInt(props.params.id);
  return (
    <div>
      <UpdatePassword
        title={"Change the user's password"}
        currentUserPassword={false}
        id={id}
        isAdmin={false}
      />
    </div>
  );
};

export default withParams(UpdateUserPassword);
