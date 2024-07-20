import React, {  useState } from "react";
// import google from "../images/google.svg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Alert from "./Alert";
import {  useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { jwtDecode } from "jwt-decode";
const GLogin = () => {
  const [LoginSuccess, setLoginSuccess] = useState();
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [ ,setErrState] = useState(false);
 let NavigateFn= useNavigate()

  const clienid =
    "65470565009-pjolbjeuuds1s29b764lgv86vo0ova6i.apps.googleusercontent.com";
  return (
    <>
      {LoginSuccess && <Alert alertText={LoginSuccess} type="success" />}

      <div className="signin-container">
        <GoogleOAuthProvider clientId={clienid}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log();
              // setGtoken(credentialResponse.credential);

              fetch(
                `https://localhost:7250/api/v1/Auth/Login-Google?tokenId=${credentialResponse.credential}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ 'test': 1 })
                }
              )
                .then((response) => response.json())
                .then((jsonData) => {
                  console.log(jsonData);
                  if (jsonData.statusCode === 200) {

                    localStorage.setItem('data', JSON.stringify(jsonData.data))
                    localStorage.setItem('userData', JSON.stringify(jwtDecode(jsonData.data.token)))

                    console.log(jsonData.data)
                    setErrState(false);
                    setAlertType("success");
                    setLoginSuccess("Login Success!");

                    setAlertMessage(jsonData.message);
                    NavigateFn('/home',{replace:true})
                  }
                  else{
                    setErrState(true);
                    setAlertMessage('Err in Login')
                    
                  }
                });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

        </GoogleOAuthProvider>
      {alertMessage && <Alert type={alertType} alertText={alertMessage} />}

      </div>
    </>
  );
};

export default GLogin;

