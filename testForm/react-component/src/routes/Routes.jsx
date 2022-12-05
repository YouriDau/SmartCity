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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/addToilet"} element={<AddToilet/>} />
        <Route path={"/addReport"} element={<AddReport/>} />
        <Route path={"/addReview"} element={<AddReview/>} />
        <Route path={"/listUsers"} element={<ListUsers/>} />
        <Route path={"/listReports"} element={<ListReports/>} />
        <Route path={"/updateUser"} element={<UpdateUser/>} />
        <Route path={"/updateUser/:id"} element={<UpdateUser/>} />
        <Route path={"/deleteUser/:id"} element={<DeleteUser/>} />
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/"} element={<AddUser/>} />
      </Routes>
    </BrowserRouter>
  );
}
