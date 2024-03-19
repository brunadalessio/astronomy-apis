import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className="navbar-brand">
        {/* <img src={logo} alt="Logo" /> */} <h1>Scuti</h1>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="navbar-menu">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/calendar" className="nav-link">
          Calendar
        </NavLink>
        <NavLink to="/news" className="nav-link">
          News
        </NavLink>
        <NavLink to="/gallery" className="nav-link">
          Gallery
        </NavLink>
        <NavLink to="/observatory" className="nav-link">
          Observatory
        </NavLink>
      </ul>
    </nav>
  );
};
export default Navbar;
