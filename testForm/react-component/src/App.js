import React from 'react';
import './App.css';
import Header from './component/Header';

import ChangeUserForm from './component/ChangeUserForm';
import LoginForm from './component/LoginForm';
import DeleteUser from './component/DeleteUser';
import DeleteReport from './component/DeleteReport';
import DeleteToiletSecondStep from './component/DeleteToiletSecondStep';
import ListUsers from './component/ListUsers';
import ReadReports from './component/ReadReports';
import UpdateReport from './component/UpdateReport';
import UpdateToilet from './component/UpdateToilet';

function App() {
  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;