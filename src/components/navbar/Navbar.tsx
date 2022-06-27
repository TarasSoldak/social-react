import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { FC } from "react";

const Navbar:FC = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" activeClassName="active">
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
