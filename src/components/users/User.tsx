import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import {  followSuccess, unFollowSuccess, UsersItemType } from "../redux/usersReducer";
import logo from "./man-icon.png";
import "./users.css";

type UserType = {
  user:UsersItemType
  followingProgress: Array<number>


}

const User: React.FC<UserType> = ({ user, followingProgress}) => {
const dispatch =useDispatch()
  return (
    <div>
      <div className="users-container">  
            <div  className="user">
              <div className="user-logo">
                <NavLink to={"/profile/" + user.id}>
                  <img
                    src={user.photos.large !== null ? user.photos.large : logo}
                    alt="img"
                  />
                </NavLink>
              </div>
              <div>
                <h3>
                  User Name: <span>{user.name}</span>
                </h3>
              </div>
              <div>
                {user.followed && (
                  <Button
                    title="UnFollow"
                    disabled={followingProgress.some(
                      (userId) => userId === user.id
                    )}
                onClick={() => dispatch(unFollowSuccess(user.id))}
                  />
                )}
                {!user.followed && (
                  <Button
                    title="Follow"
                    disabled={followingProgress.some(
                      (userId) => userId === user.id
                    )}
                onClick={() => dispatch(followSuccess(user.id))}
                  />
                )}
              </div>
            </div>
      </div>
    </div>
  );
};

export default User;
