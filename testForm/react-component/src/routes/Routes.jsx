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

export default function Router() {
  return (
    <BrowserRouter>
      <Route path={"/addToilet"} component={AddToilet} />
      <Route path={"/addReport"} component={AddReport} />
      <Route path={"/addReview"} component={AddReview} />

      <Route path={"/listUsers"} component={ListUsers} />
      <Route path={"/listReports"} component={ListReports} />
      <Route path={"/listReviews/:toiletId"} component={ListReviews} />

      <Route path={"/updateUser"} component={UpdateUser} />
      <Route path={"/updateUser/:id"} component={UpdateUser} />
      <Route path={"/updateReport/:id"} component={UpdateReport} />
      <Route path={"/updateReview/:id"} component={UpdateReview} />
      <Route path={"/updatePassword"} component={UpdatePassword} />

      <Route path={"/deleteUser/:id"} component={DeleteUser} />
      <Route path={"/deleteReport/:id"} component={DeleteReport} />
      <Route path={"/deleteReview/:id"} component={DeleteReview} />
      <Route path={"/deleteToilet/:id"} component={DeleteToilet} />

      <Route path={"/addUser"} component={AddUser} />
      <Route path={"/maps"} component={Maps} />
      <Route path={"/menuControle"} component={MenuControle} />
      <Route exact path={"/"} component={Login} />
    </BrowserRouter>
  );
}
