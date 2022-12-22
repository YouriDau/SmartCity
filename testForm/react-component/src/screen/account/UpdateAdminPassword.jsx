import React from "react";
import UpdatePassword from "../../component/UpdatePassword";

const UpdateAdminPassword = () => {
    return (
        <div>
            <UpdatePassword
                title={"Change your password"}
                currentUserPassword={true}
            />
        </div>
    );
}

export default UpdateAdminPassword;