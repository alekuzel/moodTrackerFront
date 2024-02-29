import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

function Navigation() {
  const navStyle = {
    width: '15vw',
    height: '100vh',
    backgroundColor: 'darkgreen',
    padding: '10px',
    margin: 0,
    listStyleType: 'none',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    padding: '5px 10px',
  };

  return (
    <nav style={navStyle}>
      <ul style={{ height: '100%', padding: 0 }}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/about" style={linkStyle}>About</Link></li>
        <li><Link to="/details" style={linkStyle}>Details</Link></li>
        {/* Add LogoutButton as a navigation item */}
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
}

export default Navigation;
