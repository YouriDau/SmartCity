import React from "react";
import UpdatePassword from "../../component/UpdatePassword";

const UpdateAdminPassword = () => {
    return (
        <div>
            <UpdatePassword
                title={"Change your password"}
                adminPassword={true}
            />
        </div>
    );
}

export default UpdateAdminPassword;