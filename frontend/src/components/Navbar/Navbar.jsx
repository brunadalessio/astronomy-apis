import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <h1 className="nav-title">Astro</h1>
      <div className="nav-links">
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="active-link"
        >
          Home
        </NavLink>
        <NavLink
          to="/observatory"
          className="nav-link"
          activeClassName="active-link"
        >
          Observatory
        </NavLink>
        <NavLink
          to="/calendar"
          className="nav-link"
          activeClassName="active-link"
        >
          Calendar
        </NavLink>
        <NavLink to="/quiz" className="nav-link" activeClassName="active-link">
          Quiz
        </NavLink>
        <NavLink
          to="/gallery"
          className="nav-link"
          activeClassName="active-link"
        >
          Gallery
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
