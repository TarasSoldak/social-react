import React from "react";
import "./App.css";
import Navbar from "../navbar/Navbar";
import Users from "../users/Users";
import Profile from "../profile/Profile";
import Home from "../home/Home";
import Login from "../login/Login";
import Preloader from "../preloader/Preloader";
import HeaderContainer from "../header/HeaderContainer";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializationApp } from "../redux/appReducer";
import { compose } from "redux";

class App extends React.Component {
  componentDidMount() {
    this.props.initializationApp();
  }
  render() {
    if (!this.props.initialization) {
      return <Preloader />;
    }
    return (
      <div className="app">
        <div>
          <HeaderContainer />
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/profile/:userId?" component={Profile} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { initialization: state.app.initialization };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { initializationApp })
)(App);
