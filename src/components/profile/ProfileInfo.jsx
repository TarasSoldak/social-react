import React, { useState } from "react";
import Preloader from "../preloader/Preloader";
import ava from "../users/man-icon.png";
import ProfileDataForm from "./ProfileDataForm";
import "./profile.css";
import ProfileStatus from "./ProfileStatus";
import Button from "../button/Button";

const ProfileInfo = ({
  profile,
  isOwner,
  savePhoto,
  saveProfile,
  status,
  updateUserStatus,
}) => {
  const [editMod, setEditMod] = useState(false);
  const goToEditMod = () => {
    setEditMod(true);
  };
  if (!profile) {
    return <Preloader />;
  }
  const onMainPhotoChange = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMod(false);
    });
  };
  return (
    <div className="info-container">
      <div className="file">
        <img src={profile.photos.large || ava} alt="" />
        <div>
          {isOwner && (
            <label htmlFor="file" className="label">
              Change avatar
              <input
                type="file"
                id="file"
                className="input-file"
                onChange={onMainPhotoChange}
              />
            </label>
          )}
        </div>
        <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
      </div>
      <div className="file">
        {editMod ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMod={goToEditMod}
          />
        )}
      </div>
    </div>
  );
};
const ProfileData = ({ profile, isOwner, goToEditMod }) => {
  return (
    <div className="data-container">
      {isOwner && (
        <div>
          <Button title="Edit" onClick={goToEditMod} />
        </div>
      )}
      <div>
        <h4>
          Full name: <span>{profile.fullName}</span>
        </h4>
      </div>
      <div>
        <h4>
          Looking for a job:{" "}
          <span> {profile.lookingForAJob ? "yes" : "no"}</span>
        </h4>
      </div>
      {profile.lookingForAJob && (
        <div>
          <h4>
            My professional skills:
            <span> {profile.lookingForAJobDescription} </span>
          </h4>
        </div>
      )}
      <div>
        <h4>
          About me: <span> {profile.aboutMe}</span>{" "}
        </h4>
      </div>
      <div>
        <h3>Contacts</h3>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <h4>
        {contactTitle}: <span> {contactValue}</span>
      </h4>
    </div>
  );
};

export default ProfileInfo;
