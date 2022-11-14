import React from 'react';
import './App.css';
import Header from './component/Header';

import RegistrationForm from './component/RegistrationForm';
import LoginForm from './screen/LoginForm';
import DeleteUser from './component/DeleteUser';
import DeleteReport from './component/DeleteReport';
import DeleteToiletSecondStep from './component/DeleteToiletSecondStep';
import ListUsers from './component/ListUsers';
import ReadReports from './component/ReadReports';
import UpdateReport from './component/UpdateReport';
import UpdateToilet from './component/UpdateToilet';

//const internalIp = require('internal-ip');

function App() {
  return (
    <div className="App">
      <RegistrationForm/>
    </div>
  );
}

export default App;