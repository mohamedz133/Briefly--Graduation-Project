import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faAt, faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Reset_Password.css";
import useFetch from "../customHooks/useFetch";
import { useSelector } from "react-redux";
import Alert from "./Alert";

function ResetPassword() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const notifySliceState = useSelector((state) => state.notifyState);


  const [togglesCodeForm, setogglesCodeSent] = useState(0);
  const [toggleEnterPassword, setoggleEnterPassword] = useState(0);
  const [toggleSuccessReset, setoggleSuccessReset] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, , sendgetResetCode] = useFetch();
  const [, , sendNewPassword] = useFetch();
  const [, , sendconfirmResetCode] = useFetch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [togglesCodeForm, toggleEnterPassword, toggleSuccessReset]);

  const togglePasswordVisibility = () => { setPasswordVisible(!passwordVisible); };

  function resetPasswordHandler() {
    setoggleSuccessReset(1);
  }

  function verifyCodeHandler() {
    setoggleEnterPassword(1);
  }

  function sendCodeHandler() {
    setogglesCodeSent(1);
  }

  const getDynamicText = () => {
    if (toggleSuccessReset) return "";
    if (toggleEnterPassword) return "Enter your new password below";
    if (togglesCodeForm) return "Check your Email, Copy the Sent OTP below";
    return "Enter your email address and we will send you a new password";
  };

  const handleKeyPress = (event, callback) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

  return (
    <div className="reset_page">
      {notifySliceState.message?.payload  && <Alert type={notifySliceState.type} alertText={notifySliceState.message.payload} />}

      <div className="reset_container">
        {!toggleSuccessReset && <h2>Reset your password</h2>}
        <div>
          <h5>{getDynamicText()}</h5>

          <Link to="/Reset_Password" onClick={() => {
            setoggleEnterPassword(0);
            setoggleSuccessReset(0);
            setogglesCodeSent(0);
            setEmailInput('');
            setCodeInput('');
            setPasswordInput('');
          }}>enter other email</Link>
        </div>

        {!togglesCodeForm && <div className="input-field">
          <FontAwesomeIcon
            icon={faAt}
            beat
            id="awesome1"
          />
          <input
            ref={inputRef}
            className="resetPassword_input"
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={(event) => setEmailInput(event.target.value)}
            value={emailInput}
            onKeyPress={(event) => handleKeyPress(event, () => {
              sendgetResetCode(`https://localhost:7250/api/v1/Auth/SendResetpassword`, { method: 'POST', name: 'POSTsendgetResetCode', body: { 'email': emailInput }, onSucceed: sendCodeHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
            })}
          />
        </div>}

        {!togglesCodeForm && <div>
          <button onClick={() => {
            sendgetResetCode(`https://localhost:7250/api/v1/Auth/SendResetpassword`, { method: 'POST', name: 'POSTsendgetResetCode', body: { 'email': emailInput }, onSucceed: sendCodeHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
          }}>send code </button>
        </div>}

        {togglesCodeForm && !toggleEnterPassword ?
          (<div>
            <div className="input-field">
              <FontAwesomeIcon
                icon={faKey}
                beat
                id="awesome1"
              />
              <input
                ref={inputRef}
                type="text"
                className="resetPassword_input"
                placeholder="Enter Code"
                name="confirmationCode"
                onChange={(event) => setCodeInput(event.target.value)}
                value={codeInput}
                onKeyPress={(event) => handleKeyPress(event, () => {
                  sendconfirmResetCode(`https://localhost:7250/api/v1/Auth/ConfirmResetPassword`, { method: 'POST', name: 'POSTsendconfirmResetCode', body: { 'email': emailInput, 'code': codeInput }, onSucceed: verifyCodeHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
                })}
              />
            </div>
            <div>
              <button id="sub_btn" onClick={() => {
                sendconfirmResetCode(`https://localhost:7250/api/v1/Auth/ConfirmResetPassword`, { method: 'POST', name: 'POSTsendconfirmResetCode', body: { 'email': emailInput, 'code': codeInput }, onSucceed: verifyCodeHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
              }}>
                Enter Code
              </button>
            </div>
          </div>) : null
        }

        {toggleEnterPassword && !toggleSuccessReset ? (<div>
          <div className="input-field">
            <FontAwesomeIcon
              icon={faLock}
              beat
              id="awesome1"
            />
            <input
              ref={inputRef}
              type={passwordVisible ? "text" : "password"}
              className="resetPassword_input"
              placeholder="Enter New Password"
              name="confirmationCode"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              onKeyPress={(event) => handleKeyPress(event, () => {
                sendNewPassword(`https://localhost:7250/api/v1/Auth/Resetpassword`, { method: 'POST', name: 'POSTsendNewPaasword', body: { 'email': emailInput, 'password': passwordInput }, onSucceed: resetPasswordHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
              })}
            />
            <span className="show" onClick={togglePasswordVisibility}>
              {passwordVisible ? "hide" : "show"}
            </span>
          </div>
          <div>
            <button
              className="resetPassword_btn"
              onClick={() => {
                sendNewPassword(`https://localhost:7250/api/v1/Auth/Resetpassword`, { method: 'POST', name: 'POSTsendNewPaasword', body: { 'email': emailInput, 'password': passwordInput }, onSucceed: resetPasswordHandler, jsonSuccessProp: 'message', jsonFailProp: 'message' })
              }}
            >
              Submit
            </button>
          </div>
        </div>) : null
        }

        {toggleSuccessReset ?
          <>
            <h1>Password Changed successfully ✔️ </h1>
            <div>
              <button onClick={() => navigate('/')}>
                Home
              </button>
            </div>
          </> : null
        }

        {!toggleSuccessReset && (
          <div>
            <p>
              <Link className="Link" to="/">
                Home
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
