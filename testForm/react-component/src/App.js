import React from 'react';
import Router from './routes/Routes';
import './App.css';
import Header from './component/Header';

import LoginForm from './screen/LoginForm';

import AddUser from './screen/AddUser';
import DeleteUser from './screen/DeleteUser';
import UpdateUser from './screen/UpdateUser';
import ListUsers from './component/ListUsers';

import AddReport from './screen/AddReport';
import DeleteReport from './screen/DeleteReport';
import UpdateReport from './screen/UpdateReport';

import AddToilet from './screen/AddToilet';
import UpdateToilet from './screen/UpdateToilet';
import DeleteToilet from './screen/DeleteToilet';

import AddReview from './screen/AddReview';
import DeleteReview from './screen/DeleteReview';
import UpdateReview from './screen/UpdateReview';

function App() {
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;