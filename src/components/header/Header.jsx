import React from "react";
import "./header.css";
import logo from "./react-redux.png";
import { NavLink } from "react-router-dom";

const Header = ({ isAuth, login, logOutUser }) => {
  return (
    <div className="header">
      <div>
        <img src={logo} alt="img" />
      </div>
      <div>
        <div>
          {isAuth ? (
            <div>
              {login}
              <button onClick={logOutUser}>LogOut</button>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
