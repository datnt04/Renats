import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/home/LandingPage';
import Introduce from './features/home/Introduce';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gioi-thieu" element={<Introduce />} />
      </Routes>
    </Router>
  );
}

export default App;
