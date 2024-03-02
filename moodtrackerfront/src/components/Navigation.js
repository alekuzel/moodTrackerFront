import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components
import LogoutButton from './LogoutButton'; // Import the LogoutButton component
import { useLocation } from 'react-router-dom';
import '../Navigation.css'; // Import custom CSS for styling

function Navigation() {

   // Function to determine whether to show navigation links based on the route
   const location = useLocation();

   // Function to determine whether to show navigation links based on the route
   const showNavigationLinks = () => {
     // List of routes where navigation links should be hidden
     const hiddenRoutes = ['/login', '/register'];
     return !hiddenRoutes.includes(location.pathname);
   };
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    setExpanded(false); // Close the menu when a link is clicked
  };

  return (
    <div className="nav-wrapper">
      
      {showNavigationLinks() && (
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/about" onClick={handleNavLinkClick}>About</Nav.Link>
            <Nav.Link as={Link} to="/details" onClick={handleNavLinkClick}>Notes</Nav.Link>
          </Nav>
          <Nav>
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>)}
    </div>
  );
}

export default Navigation;
