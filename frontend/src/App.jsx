// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarObservatory from './pages/StarObservatory';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/observatory" element={<StarObservatory />} />
      </Routes>
    </Router>
  );
};

export default App;
