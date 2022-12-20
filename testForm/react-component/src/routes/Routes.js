import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddToilet from "../screen/toilet/AddToilet";
import AddUser from "../screen/account/AddUser";
import AddReport from "../screen/report/AddReport";
import AddReview from "../screen/review/AddReview";
import ListUsers from "../screen/account/ListUsers";
import UpdateUser from "../screen/account/UpdateUser";
import DeleteUser from "../screen/account/DeleteUser";
import Login from "../screen/account/LoginForm";
import ListReports from "../screen/report/ListReports";
import UpdateReport from "../screen/report/UpdateReport";
import UpdateReview from "../screen/review/UpdateReview";
import DeleteReport from "../screen/report/DeleteReport";
import ListReviews from "../screen/review/ListReviews";
import Maps from "../screen/Maps";
import DeleteReview from "../screen/review/DeleteReview";
import MenuControle from "../screen/MenuControle";
import DeleteToilet from "../screen/toilet/DeleteToilet";
import UpdatePassword from "../screen/account/UpdatePassword";
import { UserContext } from "../utils/UserContext";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

export default function Router() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    localStorage.getItem("token").then((currentToken) => {
      if (currentToken !== null && currentToken !== undefined) {
        token = currentToken;
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/addUser"}
            element={
              <ProtectedRoute user={user}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/addToilet"}
            element={
              <ProtectedRoute user={user}>
                <AddToilet />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/addReport"}
            element={
              <ProtectedRoute user={user}>
                <AddReport />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/addReview/:toiletId"}
            element={
              <ProtectedRoute user={user}>
                <AddReview />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/listUsers"}
            element={
              <ProtectedRoute user={user}>
                <ListUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/listReports"}
            element={
              <ProtectedRoute user={user}>
                <ListReports />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/listReviews/:toiletId"}
            element={
              <ProtectedRoute user={user}>
                <ListReviews />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/updateUser"}
            element={
              <ProtectedRoute user={user}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/updateUser/:id"}
            element={
              <ProtectedRoute user={user}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/updateReport/:id"}
            element={
              <ProtectedRoute user={user}>
                <UpdateReport />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/updateReview/:id"}
            element={
              <ProtectedRoute user={user}>
                <UpdateReview />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/updatePassword"}
            element={
              <ProtectedRoute user={user}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/deleteUser/:id"}
            element={
              <ProtectedRoute user={user}>
                <DeleteUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/deleteReport/:id"}
            element={
              <ProtectedRoute user={user}>
                <DeleteReport />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/deleteReview/:id"}
            element={
              <ProtectedRoute user={user}>
                <DeleteReview />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/deleteToilet/:id"}
            element={
              <ProtectedRoute user={user}>
                <DeleteToilet />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/maps"}
            element={
              <ProtectedRoute user={user}>
                <Maps />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path={"/menuControle"}
            element={
              <ProtectedRoute user={user}>
                <MenuControle />
              </ProtectedRoute>
            }
          />
          <Route path={"/"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
