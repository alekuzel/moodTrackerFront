import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components
import LogoutButton from './LogoutButton'; // Import the LogoutButton component
import '../Navigation.css'; // Import custom CSS for styling

function Footer() {
  return (
    <div className="footer-wrapper">
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
