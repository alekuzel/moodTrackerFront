import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components
import LogoutButton from './LogoutButton'; // Import the LogoutButton component
import '../Navigation.css'; // Import custom CSS for styling

function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="nav-wrapper">
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/details">Notes</Nav.Link>
          </Nav>
          <Nav>
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
