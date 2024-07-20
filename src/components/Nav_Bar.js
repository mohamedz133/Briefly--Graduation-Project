import React from "react";
import '../styles/Nav_Bar.css';
import briefimg from '../assets/Eo_circle_red_white_letter-b.svg'
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
function NavBar({ onClickLogin, isLoginned, onClickCreateAccount }) {
  const navigateFn=useNavigate()
  return (
    <div>

      <nav className="nav_bar">
        <div className="svg-logo">
          <img style={{ width: '3rem' }} src={briefimg} alt="logo" />
          <span>Briefly</span>
        </div>

        <div className="spans">
          <ul>

            {isLoginned && <li>
              <span className="Signin" onClick={()=>{navigateFn('/home')}}>My Account</span>
            </li>}
            {!isLoginned && <><li>
              <span className="Signin" onClick={onClickLogin}>Sign in</span>
            </li>

              <li>
                <span className="createAccount" onClick={onClickCreateAccount}>Create Account</span>
              </li></>}

          </ul>
        </div>


      </nav>
    </div>
  );
}

export default NavBar;