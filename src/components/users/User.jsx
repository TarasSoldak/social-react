import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import logo from "./man-icon.png";
import Pagination from "./Pagination";
import "./users.css";

const User = (props) => {
  return (
    <div className="users-container">
      <div className="pagination">
        <Pagination {...props} />
      </div>
      {props.users.map((user) => {
        return (
          <div key={user.id} className="user">
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
                  disabled={props.followingProgress.some(
                    (userId) => userId === user.id
                  )}
                  onClick={() => props.unFollowSuccess(user.id)}
                />
              )}
              {!user.followed && (
                <Button
                  title="Follow"
                  disabled={props.followingProgress.some(
                    (userId) => userId === user.id
                  )}
                  onClick={() => props.followSuccess(user.id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
