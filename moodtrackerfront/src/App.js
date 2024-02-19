


import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Details from './components/Details';


function App() {
  return (
    <Router>
      <div> {/* Wrap both Navbar and Routes in a parent div */}
        <Navigation /> {/* Render the Navbar component */}
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/details" component={Details} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;