import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export const withAuthRedirect = (Component) => {
  const WithAuth = (props) => {
    if (!props.isAuth) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };

  const mapStateToProps = (state) => {
    return { isAuth: state.auth.isAuth };
  };
  return connect(mapStateToProps, {})(WithAuth);
};
