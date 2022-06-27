import React, { FC } from "react";
import "./header.css";
import logo from "./react-redux.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logOutUser } from "../redux/authReducer";



const Header: FC = () => {
 const{isAuth, login}= useSelector((state:RootState)=>state.auth)
 
 const dispatch =useDispatch()
  return (
    <div className="header">
      <div>
        <img src={logo} alt="img" />
      </div>
      <h1>Social Network React</h1>
      <div>
        <div>
          {isAuth ? <div>{login} <button onClick={dispatch(logOutUser)}>LogOut</button> </div>
            : <div>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
