import React from 'react';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/SideBar/SideBar.jsx';
import Topbar from './components/Topbar/Topbar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

function App () {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar/>
            <Dashboard/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
