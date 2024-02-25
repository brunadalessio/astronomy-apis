import React from 'react';
import { NavLink } from 'react-router-dom';
import  '../../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav-container">
      <h1 className="nav-title">Astronomy App</h1>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/observatory" className="nav-link">
          Observatory
        </NavLink>
        <NavLink to="/calendar" className="nav-link">
          Calendar
        </NavLink>
        <NavLink to="/quiz" className="nav-link">
          Quiz
        </NavLink>
        <NavLink to="/gallery" className="nav-link">
          Gallery
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
