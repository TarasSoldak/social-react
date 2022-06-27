import React, { ComponentType } from "react";
import ProfileInfo from "./ProfileInfo";
import "./profile.css";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
  GetProfileType,
} from "../redux/profileReducer";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { RootState } from "../redux/store";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType ={
  getUserProfile:(usrId:number)=>void
  getUserStatus: (usrId: number)=>void
  updateUserStatus:(status:string)=>void
  savePhoto:(file:File)=>void
  saveProfile: (profile: GetProfileType) => Promise<GetProfileType>
}
type PathParamType={
  userId:string
}
type PropsType = MapStatePropsType & DispatchPropsType& RouteComponentProps<PathParamType>
class Profile extends React.Component<PropsType> {
  profileRefresh = () => {
    let userId:number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId as number);
    this.props.getUserStatus(userId as number);
  };
  componentDidMount() {
    this.profileRefresh();
  }
  componentDidUpdate(prevProps: PropsType) {
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

const mapStateToProps = (state:RootState) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
});

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  })
)(Profile);
