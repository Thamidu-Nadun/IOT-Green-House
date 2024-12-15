import React from 'react';
import { FaBars, FaSearch, FaBell, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <FaBars />
      </button>

      <form className="form-inline mr-auto">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" href="#!">
            <FaBell />
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link" href="#!">
            <FaEnvelope />
            <span className="badge badge-danger badge-counter">7</span>
          </a>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link" href="#!">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
            <FaUser />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#!">
              <FaSignOutAlt /> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
