import React, { useEffect, useState } from "react";
import "../styles/MainLandingpage.css";
import NavBar from "../components/Nav_Bar";
// import ContactUs from "../components/ContactUs.js";
import Login from "../components/Login";
import CreateAccount from "../components/Create_Account";
import PublicChannels from "../components/PublicChannels.js";
import Alert from "../components/Alert.js";
import useFetch from "../customHooks/useFetch.js";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.js";

function MainLandingPage({
  stateShowLoginPopup,
  stateshowCreateAccountPopup,
  onClickLogin,
  onClickCreateAccount,
}) {

  const [showErrModal,] = useState(false)
  const [errContent,] = useState('')
  const [isLoginned, setIsloginned] = useState(false)
  // #Note_case used to diable ui  until useEffect finish checking userLogin
  const [loadedStyles, setLoadedStyles] = useState(false)
  let notifySliceState = useSelector((state) => state.notifyState)


  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  const [jsonData, , sendRequest] = useFetch()
  console.log(jsonData);
  useEffect(() => {
    //first step to check token,to have one
    //#Note_Case_only_strict_format only this is allowed by API, if user changed in localStorage 

    // first cond to avoid bad data:undefined ,value,second avoid if it data entry not exist in localstorage
    // #Note_case
    // when we say loaded styles 
    // user have invalid token in localStorage > display with (login plz)
    // user have valid token in localStorage > display with (go account)
    if (localStorage.getItem("data") !== undefined && localStorage.getItem("data") !== null) {


      let TokenData = {
        token: JSON.parse(localStorage.getItem("data"))?.token,
        refreshtoken: JSON.parse(localStorage.getItem("data"))?.refreshToken?.refreshTokenString
      }


      if (TokenData.token && TokenData.refreshtoken) {

        sendRequest(`https://localhost:7250/api/v1/Auth/GenerateRefreshToken`, {
          method: 'POST', name: 'GenerateRefreshToken', body: TokenData, onOk: () => {
            handleExpiredToken()
            setLoadedStyles(true)

          }, onOkFailed: () => { setIsloginned(true); setLoadedStyles(true) }
        })

      }
    } else if (localStorage.getItem("data") === undefined || localStorage.getItem("data") === null) {
      setLoadedStyles(true)
    }
    else {
      setLoadedStyles(true)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleExpiredToken() {

    localStorage.setItem('data', JSON.stringify(jsonData.data))


  }

  return (

    <>
      {/* #NOTE_CASE no refreshtoken api */}
      {loadedStyles ? <div className="landing-page">
        {notifySliceState?.message?.payload && <Alert type={notifySliceState?.type} alertText={notifySliceState?.message?.payload} />}

        {stateShowLoginPopup && !stateshowCreateAccountPopup && (
          <Login onClose={onClickLogin} onSignupClick={onClickCreateAccount} />
        )}
        {!stateShowLoginPopup && stateshowCreateAccountPopup && (
          <CreateAccount
            onClose={onClickCreateAccount}
            onSigninClick={onClickLogin}
          />
        )}
        {showErrModal && <Alert type='err' alertText={errContent} />}

        <NavBar
          isLoginned={isLoginned}
          onClickLogin={onClickLogin}
          onClickCreateAccount={onClickCreateAccount}
        />
        <div className="Slogan">
          <div className="quote-landingPage">
            <h1>Be Briefed!</h1>
            <h1>Be Brilliant!</h1>
          </div>
        </div>
        <PublicChannels />
        {/* <ContactUs /> */}

        <div className="scroll-to-top" onClick={handleScrollTop}>
          <i className="fa fa-arrow-up"></i>
        </div>
      </div> :<>
      
      <Spinner />
      {/* #NOTE_CASE no refreshtoken api */}
      {/* <p>if it is infintly loading , servers are down</p> */}
      </>}

    </>
  )
}

export default MainLandingPage;

