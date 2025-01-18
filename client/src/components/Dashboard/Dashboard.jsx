import React from 'react';
import CardSm from './CardSm';
import TaskCard from './TaskCard';
import CardMd from './CardMd';
import TemperatureSection from './sections/TemperatureSection';
import HumiditySection from './sections/HumiditySection';
import SoilSection from './sections/SoilSection';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* Content Row */}
      <div className="row">
        <CardMd name="John" />
        <CardSm
          title="Sensors"
          data="3"
          color="primary"
          icon="temperature-high"
        />

        <CardSm title="Devices" data="1" color="primary" icon="laptop" />

        {/* Tasks Card Example */}
        {/* <TaskCard title="Tasks" data="50" /> */}

        {/* Pending Requests Card Example */}
        {/* <CardSm
          title="Pending Request"
          data="8"
          color="warning"
          icon="calendar"
        /> */}

      </div>

      <TemperatureSection/>
      <HumiditySection/>
      <SoilSection/>

    </div>
  );
};

export default Dashboard;
