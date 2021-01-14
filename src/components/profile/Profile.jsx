import React from "react";
import ProfileInfo from "./ProfileInfo";
import "./profile.css";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
} from "../redux/profileReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class Profile extends React.Component {
  profileRefresh = () => {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  };
  componentDidMount() {
    this.profileRefresh();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.profileRefresh();
    }
  }
  render() {
    const {
      profile,
      match,
      savePhoto,
      saveProfile,
      status,
      updateUserStatus,
    } = this.props;
    return (
      <div className="profile-container">
        <ProfileInfo
          profile={profile}
          isOwner={!match.params.userId}
          savePhoto={savePhoto}
          saveProfile={saveProfile}
          status={status}
          updateUserStatus={updateUserStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  })
)(Profile);
