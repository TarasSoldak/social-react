import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Button from "../button/Button";
import CreateField from "../formControl/CreateField";
import "./profile.css";
import "../formControl/field.css";
import { GetProfileType } from "../redux/profileReducer";

type PropsType={
  profile:GetProfileType
}

const ProfileDataForm: FC<InjectedFormProps<GetProfileType, PropsType> 
  & PropsType > = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit} className="form-data">
      {error && <span className="error">{error}</span>}
      <div className="buttonSave">
        <Button disabled={false} title="Save" />
      </div>
      <Field name="fullName" component={CreateField} label="full name" />
      <Field name="aboutMe" component={CreateField} label="about me" />
      {Object.keys(profile.contacts).map((key) => {
        return (
          <Field
            key={key}
            name={"contacts." + key}
            component={CreateField}
            label={key}
          />
        );
      })}
      <label>
        <div>
          <b>My professional skills</b>
        </div>
        <Field name="looking for a job description" component="textarea" />
      </label>
      <Field
        name="lookingForAJob"
        component={CreateField}
        label="looking for a job"
        type="checkbox"
      />
    </form>
  );
};
const ProfileReduxFormData = reduxForm<GetProfileType, PropsType>({
  form: "profile-data",
})(ProfileDataForm);
export default ProfileReduxFormData;
