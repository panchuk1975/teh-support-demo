import React from "react";
import { reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../utils/validators/validators";
// import {
//   ElementInput
//   //CheckBox
// } from "../Common/FormsControls/Forms.js";
import { connect } from "react-redux";
import { login } from "../Redux/authReducer.ts";
import { Redirect } from "react-router-dom";
import s from "./Login.module.css";
import {CreateField} from '../Common/FormsControls/Forms';

let maxLength40 = maxLengthCreator(40);

//let maxLength1 = maxLengthCreator(1);

//const InputElement = ElementInput("input");

//const CheckBoxInput = CheckBox("checkbox");

//---------Functional Login component-----------//

//const LoginForm = props => { // make distruktion
const LoginForm = ({handleSubmit, error, captchaUrl})=> {
  //console.log('write');
  return (
    // 1) make e.preventDefault, 2)get all formData and
    // put them to the object {formData}, 3)call props.onSubmit(formData)
    //<form onSubmit={props.handleSubmit}>
    //placeholder, name, component, maxLength, type, text, props
    <form onSubmit={handleSubmit}>
      {CreateField("Email", "email", "input", [required, maxLength40], "input")}
      {/* <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={InputElement}
          validate={[required, maxLength40]}
          type="input"
        />
      </div> */}
       {CreateField("Password", "password", "input", [required, maxLength40], "password")}
      {/* <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={InputElement}
          validate={[required, maxLength40]}
          type="password"
        />
      </div> */}
        {CreateField(null, "rememberMe", "input", [required], "checkbox", "Remember")}
      {/* <div>
        <Field
          name={"rememberMe"}
          component={InputElement}
          //validate={[required, maxLength1]}
          type={"checkbox"}
        />
        Remember
      </div> */}
      {error && (// - if props.error show error <DIV>
        <div className={s.formSummaryError}>
          {error}
        </div>
      )}
      <div>
        <button>Log on</button>
      </div>
      {captchaUrl && <img alt = "captcha" src = {captchaUrl} id = {s.captcha}/>}
      {captchaUrl && CreateField("Symbols", "captcha", "input", [required, maxLength40], "input")}
    </form>
  );
};

//---------Redux conteiner Login component-----------//

const LoginReduxForm = reduxForm({
  // a unique form name
  form: "login"
})(LoginForm); // - redux special conteiner component

//---------Conteiner Login component-----------//

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  email: state.auth.email,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
