import React from 'react';
import SoilLineChart from '../../SensorsCharts/SoilLineChart';
import SoilCircular from '../../SensorsCharts/SoilCircular';

function SoilSection () {
  return (
    <div className="row">
      {/* Area Chart */}
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div id='SoilMoisture' className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Live Soil Moisture
            </h6>
            <div className="dropdown no-arrow">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div className="dropdown-header">Temperature</div>
                <li className="dropdown-item">Take a Picture</li>
              </div>
            </div>
          </div>
          {/* Card Body */}
          <div className="card-body">
            <SoilLineChart borderColor="#D99D81"/>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Live Soil Moisture
            </h6>
          </div>
          {/* Card Body */}
          <div className="card-body d-flex justify-content-center">
            <div className="col-6">
              <SoilCircular />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoilSection;
