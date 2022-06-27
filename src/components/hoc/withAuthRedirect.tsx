import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../redux/store";
type MapStatePropsType = {
  isAuth:boolean
}
export function withAuthRedirect (WrappedComponent:ComponentType) {
  function WithAuth(props:MapStatePropsType){
    if (!props.isAuth) {
      return <Redirect to="/login" />;
    }
    const {isAuth, ...restProps}=props
    return <WrappedComponent {...restProps} />;
  };

  const mapStateToProps = (state:RootState) => {
    return { isAuth: state.auth.isAuth };
  };
  return connect(mapStateToProps, {})(WithAuth);
};
