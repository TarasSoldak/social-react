import React from "react";
import "./login.css";
import "../formControl/field.css";
import CreateField from "../formControl/CreateField";
import Button from "../button/Button";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, required, minLength } from "../validators/validators";
import {  useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authReducer";
import { Redirect } from "react-router-dom";
import { RootState } from "../redux/store";

// type MapStateType={
//   isAuth:boolean
//   captchaUrl:string | null
// }
// type MapDispatchType={
//   loginUser: (email: string, passward: string, rememberMe: boolean, captcha: string)=>void
// }
type LoginValuesType={
  email:string
  password:string
  rememberMe:boolean
  captcha:string 
}

const Login: React.FC = () => {
const dispatch =useDispatch()
  const { isAuth, captchaUrl}= useSelector((state:RootState)=>state.auth )

  const submit = (values: LoginValuesType) => {
    dispatch(loginUser(values.email, values.password, values.rememberMe, values.captcha));
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


export default Login

const maxLength25 = maxLength(25);
const minlength4 = minLength(4);

type LoginFormOwnType={
  captchaUrl:string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginValuesType, LoginFormOwnType> 
& LoginFormOwnType> = ({ handleSubmit, captchaUrl, error }) => {
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
          <Button disabled={false}  title="Submit" />
          <span>{error && <span className="error">{error}</span>}</span>
        </div>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm<LoginValuesType, LoginFormOwnType>({
  form: "login",
})(LoginForm);
