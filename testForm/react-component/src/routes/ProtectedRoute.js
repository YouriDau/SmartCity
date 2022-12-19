import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (user && user.role === "admin") {
    return children;
  } else {
    alert("Error, login with an admin account!");
    return <Navigate to="/" />;
  }
};
