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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/addToilet"} element={<AddToilet />} />
        <Route path={"/addReport"} element={<AddReport />} />
        <Route path={"/addReview"} element={<AddReview />} />

        <Route path={"/listUsers"} element={<ListUsers />} />
        <Route path={"/listReports"} element={<ListReports />} />
        <Route path={"/listReviews/:toiletId"} element={<ListReviews />} />

        <Route path={"/updateUser"} element={<UpdateUser />} />
        <Route path={"/updateUser/:id"} element={<UpdateUser />} />
        <Route path={"/updateReport/:id"} element={<UpdateReport />} />
        <Route path={"/updateReview/:id"} element={<UpdateReview />} />

        <Route path={"/deleteUser/:id"} element={<DeleteUser />} />
        <Route path={"/deleteReport/:id"} element={<DeleteReport />} />

        <Route path={"/login"} element={<Login />} />
        <Route path={"/addUser"} element={<AddUser />} />
        <Route path={"/"} element={<Maps />} />
      </Routes>
    </BrowserRouter>
  );
}
