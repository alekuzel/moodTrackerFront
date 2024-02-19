import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Details from './pages/DetailsPage';

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navigation style={{ zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '82vw', height: '7vh', backgroundColor: 'palegreen', color: 'black', textAlign: 'center', paddingTop: '2vh', zIndex: 1  }}>
          Banner Content. Maybe not to neccessary.
        </div>
        <div style={{ marginLeft: '15vw', marginTop: '10vh', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

