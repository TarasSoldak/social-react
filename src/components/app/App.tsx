import React, { ComponentType } from "react";
import "./App.css";
import Navbar from "../navbar/Navbar";
import Profile from "../profile/Profile";
import Home from "../home/Home";
import Login from "../login/Login";
import Preloader from "../preloader/Preloader";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializationApp } from "../redux/appReducer";
import { compose } from "redux";
import { RootState } from "../redux/store";
import Header from "../header/Header";
import UsersHook from "../users/UsersHook";
import Chat from "../chat/Chat";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType ={
  initializationApp:()=>void
}
class App extends React.Component<MapStatePropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializationApp();
  }
  render() {
    if (!this.props.initializationApp) {
      return <Preloader />;
    }
    return (
      <div className="app">
        <div>
          <Header/>
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/users" component={UsersHook} />
          <Route path="/chat" component={Chat} />
          <Route path="/profile/:userId?" component={Profile} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state:RootState) => {
  return { initialization: state.app.initialization };
};
export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializationApp })
)(App);
