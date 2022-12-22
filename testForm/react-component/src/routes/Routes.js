import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddToilet from "../screen/toilet/AddToilet";
import AddUser from "../screen/account/AddUser";
import AddReport from "../screen/report/AddReport";
import AddReview from "../screen/review/AddReview";
import ListUsers from "../screen/account/ListUsers";
import UpdateUser from "../screen/account/UpdateUser";
import DeleteUser from "../screen/account/DeleteUser";
import Login from "../screen/account/LoginForm";
import AllReports from "../screen/report/AllReports";
import UpdateReport from "../screen/report/UpdateReport";
import UpdateReview from "../screen/review/UpdateReview";
import DeleteReport from "../screen/report/DeleteReport";
import ListReviews from "../screen/review/ListReviews";
import Maps from "../screen/Maps";
import DeleteReview from "../screen/review/DeleteReview";
import MenuControle from "../screen/MenuControle";
import DeleteToilet from "../screen/toilet/DeleteToilet";
import UpdateAdminPassword from "../screen/account/UpdateAdminPassword";
import UpdateUserPassword from "../screen/account/UpdateUserPassword";
import UpdateToilet from "../screen/toilet/UpdateToilet";
import { UserContext } from "../utils/UserContext";
import { useEffect, useState } from "react";
import { getCurrentUserFetch } from "../component/API/useFetchPerson";
import UserChoices from "../screen/account/UserChoices";
import ReportChoices from "../screen/report/ReportChoices";
import AdminChoices from "../screen/account/AdminChoices";
import AllReportsNotDone from "../screen/report/AllReportsNotDone";

export default function Router() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken !== null && currentToken !== undefined) {
      getCurrentUserFetch(currentToken)
        .then(({ status, user }) => {
          setToken(currentToken);
          setUser(user);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <Routes>
          {user === null && <Route path={"/"} element={<Login />} />}
          {user !== null && (
            <>
              <Route path={"/addUser"} element={<AddUser />} />
              <Route path={"/addToilet"} element={<AddToilet />} />
              <Route path={"/addReport/:toiletId"} element={<AddReport />} />
              <Route path={"/addReview/:toiletId"} element={<AddReview />} />
              <Route path={"/listUsers"} element={<ListUsers />} />
              <Route path={"/listReports/all"} element={<AllReports />} />
              <Route
                path={"/listReports/notDone"}
                element={<AllReportsNotDone />}
              />
              <Route
                path={"/listReviews/:toiletId"}
                element={<ListReviews />}
              />
              <Route path={"/updateUser/:id"} element={<UpdateUser />} />
              <Route path={"/updateUser"} element={<UpdateUser />} />{" "}
              {/*j'ai enlevé le slash après si jamais ca bug*/}
              <Route
                path={"/updateAdminPassword"}
                element={<UpdateAdminPassword />}
              />
              <Route
                path={"/updateUserPassword/:id"}
                element={<UpdateUserPassword />}
              />
              <Route path={"/updateReport/:id"} element={<UpdateReport />} />
              <Route path={"/updateReview/:id"} element={<UpdateReview />} />
              <Route path={"/updateToilet/:id"} element={<UpdateToilet />} />
              <Route path={"/deleteUser/:id"} element={<DeleteUser />} />
              <Route path={"/deleteReport/:id"} element={<DeleteReport />} />
              <Route path={"/deleteReview/:id"} element={<DeleteReview />} />
              <Route path={"/deleteToilet/:id"} element={<DeleteToilet />} />
              <Route path={"/maps"} element={<Maps />} />
              <Route path={"/userChoices"} element={<UserChoices />} />
              <Route path={"/reportChoices"} element={<ReportChoices />} />
              <Route path={"/adminChoices"} element={<AdminChoices />} />
              <Route path={"/"} element={<MenuControle />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
