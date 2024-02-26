import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Notes from './pages/DetailsPage';
import MoodForm from './components/MoodForm'; // Import the MoodForm component

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
            {/* Add a new route for the mood tracking page */}
            <Route path="/track-mood" element={<MoodForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
