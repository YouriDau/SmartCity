import React from "react";
import UpdatePassword from "../../component/UpdatePassword";

const UpdateUserPassword = () => {
    return (
        <div>
            <UpdatePassword
                title={"Change the user's password"}
                adminPassword={false}
            />
        </div>
    );
}

export default UpdateUserPassword;