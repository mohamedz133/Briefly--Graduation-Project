import { useEffect } from "react";
import useFetch from "../customHooks/useFetch";

function Protected({ children, showLoginPopupfn }) {
  // Note: not intersted
  const [, , sendRequest] = useFetch()
  let token
  // #Note_case: Token not defined 
  //#Note_case: localStorage data not null
  // #Note_case: handle json.parse(undefined),throw err

  if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
    let data = JSON.parse(localStorage.getItem("data"))
    token = data.token

  }
  useEffect(() => {
    // #Note_case: Token not defined 

    if (token) {
      sendRequest(`https://localhost:7250/api/v1/Auth/CheckValidationToken?token=${token}`, { method: 'POST', name: 'POSTcheckToken', onOk: handleCorrectToken, onOkFailed: handleBadToken })
    }
      // #Note_case: User Not Logined

    else {

      throw new Error('Plz, Login First')

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCorrectToken() {
    // in our api returns 200 ,means good token
    // return children
  }

  function handleBadToken() {
      // #Note_case: Bad Token

    throw new Error('Plz, Login First')

  }

  // #Note_case user without thrown errors ,is authenticated one
  return children

}


export default Protected;

