import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login_Signup.css";
import GLogin from "./Google_Login";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { jwtDecode } from "jwt-decode";

function LoginForm({ onClose, onSignupClick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const NavigateFn = useNavigate()
  //to not render success at begining
  const [, , sendRequest] = useFetch()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleSignin = (event) => {
    // event.target.preventDefault()
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    //#todo_4 email Email usr_mail >> map
    const data = { 'Email': email, 'password': password };
    //#Note_case_useless_state direct receive updated json value insteead of using state (uselessState)
    sendRequest(`https://localhost:7250/api/v1/Auth/Login`, { method: 'POST', name: 'POSTlogin', body: data, onSucceed: handleSuccessSignIn, jsonSuccessProp: 'message', jsonFailProp: 'message' })
  };


  function handleSuccessSignIn(jsonData) {
    // #Note_case set token then forward user to login..
    // #Note_case j clossures we cannot use jsonData state directlt


    localStorage.setItem('data', JSON.stringify(jsonData.data))
    localStorage.setItem('userData', JSON.stringify(jwtDecode(jsonData.data.token)))

    NavigateFn('/home', { replace: true })

  }
  return (
    <>

      <div className="login_assist"></div>
      <div className="form_sign">
        <div className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} id="X" />
        </div>
        <form onSubmit={handleSignin}>
          <h1 id="title">Login</h1>
          <div className="input-group">
            <div className="input-field">
              <FontAwesomeIcon
                icon={faAt}
                beat
                id="awesome1"
              />
              <input type="email" required placeholder="Email"
                name="email" />
            </div>
            <div className="input-field">
              <FontAwesomeIcon
                icon={faLock}
                beat
                id="awesome1"
              />
              <input
                type={passwordVisible ? "text" : "password"}
                className="pass-key"
                required
                placeholder="Password"
                name="password"
              />
              <span className="show" onClick={togglePasswordVisibility}>
                {passwordVisible ? "hide" : "show"}
              </span>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" id="signinBtn">

              Login
            </button>
          </div>
          <div>
            <b className="reset">
              forget password{" "}

              <Link to={'/Reset_Password'} >
                click here

              </Link>
            </b>
          </div>
        </form>
        <div className="transmit">
          <button type="button" id="signupBtn" onClick={onSignupClick}>
            Sign up
          </button>
        </div>
        <GLogin className="Glogin" />
      </div>
    </>
  );
}

export default LoginForm;

