import React, { useState } from "react";

function SideBar() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div id="wrapper" className={isToggled ? "sidebar-toggled" : ""}>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          isToggled ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img
              src="/favicon.png"
              alt="favicon"
              style={{ width: "100%" }}
            />
          </div>
          <div className="sidebar-brand-text mx-3">SmartGrow</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link" href="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Tools</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Conditions:</h6>
              <a className="collapse-item" href="">
                Temperature
              </a>
              <a className="collapse-item" href="">
                Humidity
              </a>
              <a className="collapse-item" href="">
                Soil Moisture
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-wrench" />
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Utils:</h6>
              <a className="collapse-item" href="">
                Devices
              </a>
              <a className="collapse-item" href="">
                Conditions
              </a>
              <a className="collapse-item" href="">
                Plants
              </a>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={handleToggle}
          />
        </div>

        <div className="sidebar-card d-none d-lg-flex">
          <img
            className="sidebar-card-illustration mb-2"
            src="/favicon.png"
            alt="..."
          />
          <p className="text-center mb-2">
            <span className="fw-bolder fs-5" style={{ fontFamily: "Monospace" }}>
              SmartGrow
            </span>{" "}
            is packed with premium features, components, and more!
          </p>
          <a className="btn btn-success btn-sm" href="">
            Upgrade to Pro!
          </a>
        </div>
      </ul>
    </div>
  );
}

export default SideBar;
