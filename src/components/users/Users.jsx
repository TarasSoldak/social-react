import React from "react";
import { connect } from "react-redux";
import Preloader from "../preloader/Preloader";
import {
  getUsers,
  unFollowSuccess,
  followSuccess,
} from "../redux/usersReducer";
import User from "./User";

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChange = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <div>
        {this.props.isFetching ? <Preloader /> : null}
        <User {...this.props} onPageChange={this.onPageChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
  };
};

export default connect(mapStateToProps, {
  getUsers,
  followSuccess,
  unFollowSuccess,
})(Users);
