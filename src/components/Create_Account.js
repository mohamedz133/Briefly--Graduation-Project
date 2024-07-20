// Create_Account.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faLock,
  faTimes,

} from "@fortawesome/free-solid-svg-icons";
import "../styles/Login_Signup.css";
import useFetch from "../customHooks/useFetch";

function Create_Account({ onClose, onSigninClick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [JsonData, , sendRequest] = useFetch()


  console.log(FormData)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log('handleSignup fn ...')
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword,
    };
    sendRequest('https://localhost:7250/api/v1/Auth/Register', { method: 'POST', name: 'POSTCreateAccount', body: data ,jsonSuccessProp:'message',jsonFailProp:'message'})
  }

  if (JsonData){
    console.log(JsonData);
  }
  
  return (
    <>
      <div className="form_sign">
        <div className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} id="X" />
        </div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          {/* firstName */}
          <div className="input-field">
            <FontAwesomeIcon
              icon={faUser}
              beat
              id="awesome1"
            />
            <input
              type="text"
              required
              placeholder="First Name"
              name="firstName"
            />
          </div>

          {/* lastName */}
          <div className="input-field">
            <FontAwesomeIcon
              icon={faUser}
              beat

              id="awesome1"
            />
            <input
              type="text"

              required
              placeholder="Last Name"
              name="lastName"
            />
          </div>
          {/* email */}
          <div className="input-field">
            <FontAwesomeIcon
              icon={faAt}
              beat
              id="awesome1"
            />

            <input type="email" required placeholder="Email" name="email" />
          </div>
          {/* password */}
          <div className="input-field">
            <FontAwesomeIcon
              style={{ color: "#1d3ee2" }}
              icon={faLock}
              beat
              id="awesome1"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              className="pass-key"
              required
              autoComplete="new-password"
              placeholder="Password"
              name="password"
            />
            <span className="show" onClick={togglePasswordVisibility}>
              {passwordVisible ? "hide" : "show"}
            </span>
          </div>
          {/* Confirm password */}
          <div className="input-field">
            <FontAwesomeIcon
              icon={faLock}
              beat
              id="awesome1"
            />
            <input
              type={passwordVisible ? "text" : "password"}
              className="confirm-pass-key"
              required
              autoComplete="new-password"
              placeholder=" Confirm Password"
              name="confirmPassword"
            />
            {/* FIX  */}
            <span className="show" onClick={togglePasswordVisibility}>
              {passwordVisible ? "hide" : "show"}
            </span>
          </div>

          <div className="buttons">
            <a href="/">
              <button type="submit" id="signupBtn">
                Sign Up
              </button>
            </a>
          </div>
        </form>
        <div className="transmitCRT">
          <button   type="button" id="signinBtn" onClick={onSigninClick}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Create_Account;

