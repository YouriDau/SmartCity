import React from "react";
import Router from "./routes/Routes";
import "./App.css";
import Header from "./component/Header";

import LoginForm from "./screen/account/LoginForm";

import AddUser from "./screen/account/AddUser";
import DeleteUser from "./screen/account/DeleteUser";
import UpdateUser from "./screen/account/UpdateUser";
import ListUsers from "./screen/account/ListUsers";

import AddReport from "./screen/report/AddReport";
import DeleteReport from "./screen/report/DeleteReport";
import UpdateReport from "./screen/report/UpdateReport";

import AddToilet from "./screen/toilet/AddToilet";
import UpdateToilet from "./screen/toilet/UpdateToilet";
import DeleteToilet from "./screen/toilet/DeleteToilet";

import AddReview from "./screen/review/AddReview";
import DeleteReview from "./screen/review/DeleteReview";
import UpdateReview from "./screen/review/UpdateReview";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
