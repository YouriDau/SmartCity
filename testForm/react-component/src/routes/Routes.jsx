import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddToilet from "../screen/toilet/AddToilet";
import AddUser from "../screen/account/AddUser";
import AddReport from "../screen/report/AddReport";
import AddReview from "../screen/review/AddReview";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/addToilet"} element={<AddToilet />} />
        <Route path={"/addReport"} element={<AddReport />} />
        <Route path={"/addReview"} element={<AddReview />} />
        <Route path={"/"} element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}
