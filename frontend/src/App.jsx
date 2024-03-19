import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarObservatory from './pages/StarObservatory';
import HomePage from './pages/HomePage';
import News from './pages/News';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/observatory" element={<StarObservatory />} />
        <Route path="/news" element={<News />} />
      </Routes>
  </Router>
  );
};

export default App;
