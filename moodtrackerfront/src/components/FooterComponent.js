import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import '../Navigation.css';

function Footer() {
  return (
    <div className="footer-wrapper" style={{ marginTop: '5vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
        <Navbar.Brand>Mood tracker. 2024</Navbar.Brand>
        <Nav className="ml-auto">
          {/* Add any additional links or components here */}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Footer;
