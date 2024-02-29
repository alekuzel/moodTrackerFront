import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Notes from './pages/DetailsPage';

import Login from './pages/LoginPage'; // Import the Login component
import Register from './pages/RegisterPage'; // Import the Register component
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Notes />} />
          
            {/* Add routes for login and registration */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* Include LogoutButton component here */}
          <LogoutButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
