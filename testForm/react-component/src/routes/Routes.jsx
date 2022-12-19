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
import { useState } from "react";

export default function Router() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path={"/addUser"} element={<AddUser />} />
          <Route path={"/addToilet"} element={<AddToilet />} />
          <Route path={"/addReport"} element={<AddReport />} />
          <Route path={"/addReview/:toiletId"} element={<AddReview />} />

          <Route path={"/listUsers"} element={<ListUsers />} />
          <Route path={"/listReports"} element={<ListReports />} />
          <Route path={"/listReviews/:toiletId"} element={<ListReviews />} />

          <Route path={"/updateUser"} element={<UpdateUser />} />
          <Route path={"/updateUser/:id"} element={<UpdateUser />} />
          <Route path={"/updateReport/:id"} element={<UpdateReport />} />
          <Route path={"/updateReview/:id"} element={<UpdateReview />} />
          <Route path={"/updatePassword"} element={<UpdatePassword />} />

          <Route path={"/deleteUser/:id"} element={<DeleteUser />} />
          <Route path={"/deleteReport/:id"} element={<DeleteReport />} />
          <Route path={"/deleteReview/:id"} element={<DeleteReview />} />
          <Route path={"/deleteToilet/:id"} element={<DeleteToilet />} />

          <Route path={"/maps"} element={<Maps />} />
          <Route path={"/menuControle"} element={<MenuControle />} />
          <Route path={"/"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
