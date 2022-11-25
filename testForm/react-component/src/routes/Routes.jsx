import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddToilet from "../screen/toilet/AddToilet";
import AddUser from "../screen/account/AddUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/addToilet"} element={<AddToilet />} />
        <Route path={"/"} element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}
