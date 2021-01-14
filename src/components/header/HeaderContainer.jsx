import React from "react";
import { connect } from "react-redux";
import { logOutUser } from "../redux/authReducer";
import Header from "./Header";

const HeaderContainer = ({ isAuth, login, logOutUser }) => {
  return (
    <div>
      <Header isAuth={isAuth} login={login} logOutUser={logOutUser} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logOutUser })(HeaderContainer);
