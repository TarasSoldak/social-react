import React from "react";
import "./login.css";
import "../formControl/field.css";
import CreateField from "../formControl/CreateField";
import Button from "../button/Button";
import { Field, reduxForm } from "redux-form";
import { maxLength, required, minLength } from "../validators/validators";
import { connect } from "react-redux";
import { loginUser } from "../redux/authReducer";
import { Redirect } from "react-router-dom";

const Login = ({ loginUser, isAuth, captchaUrl }) => {
  const submit = (values) => {
    loginUser(values.email, values.password, values.rememberMe, values.captcha);
  };
  if (isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <LoginReduxForm onSubmit={submit} captchaUrl={captchaUrl} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);

const maxLength25 = maxLength(25);
const minlength4 = minLength(4);

const LoginForm = ({ handleSubmit, captchaUrl, error }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-block">
        <Field
          name="email"
          component={CreateField}
          type="email"
          validate={[required, maxLength25, minlength4]}
          label="Email"
        />

        <Field
          name="password"
          component={CreateField}
          type="password"
          validate={[required, maxLength25, minlength4]}
          label="Password"
        />

        <label htmlFor="rememberMe">
          <b>Remember me</b>
        </label>
        <Field name="rememberMe" component="input" type="checkbox" />

        {captchaUrl && <img src={captchaUrl} alt="img" />}
        {captchaUrl && (
          <Field component={CreateField} name="captcha" label="Captcha" />
        )}

        <div>
          <Button title="Submit" />
          <span>{error && <span className="error">{error}</span>}</span>
        </div>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);
