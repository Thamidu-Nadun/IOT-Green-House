import React from 'react';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/SideBar/SideBar.jsx';
import Topbar from './components/Topbar/Topbar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Switch from './components/Switch/Switch.jsx';

function App () {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <Dashboard />
            <div className="d-flex ml-4">
              <Switch
                name="Fan"
                description="This is a sample description for device."
                endpoint="http://192.168.4.1/switch/fan/" // Updated endpoint for Fan
                borderColor="#FF9D23"
                image="fanAI.jpg"
              />
              <Switch
                name="Water Pump"
                description="This is a sample description for device."
                endpoint="http://192.168.4.1/contoller/pump" // Corrected endpoint for Water Pump
                borderColor="#6A80B9"
                image="waterPumpAI.jpg"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
