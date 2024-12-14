import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoIosNotifications } from 'react-icons/io';
import { CiMail, CiMenuBurger } from 'react-icons/ci';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="mx-4">
        {/* Navbar Brand */}
        <Navbar.Brand href="#">IOT</Navbar.Brand>

        {/* Navbar Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbarScroll">
          <CiMenuBurger />
        </Navbar.Toggle>

        {/* Collapsible Navbar Content */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 ms-lg-5" navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Status</Nav.Link>
            <NavDropdown title="Devices" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Temperature</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Humidity</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Water Pump</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Switches</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Notification Icons */}
          <div className="d-flex gap-3 fs-5 justify-content-end">
            <IoIosNotifications />
            <CiMail />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
