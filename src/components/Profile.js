import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import logout from "../images/logout.svg";
import userIcon from "../assets/user.svg"

const ProfileImage = ({ userImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Get the data object from local storage
    let data = JSON.parse(localStorage.getItem('data'));

    // Check if the data object and token exist
    if (data) {
      // Remove the token from the data object

      // Save the updated data object back to local storage
      localStorage.clear('data')
    }

    // Redirect to the home page after removing the token
    navigate('/');
  };
  let userName = ''
  if ((localStorage.getItem('userData') !== null && localStorage.getItem('userData') !== undefined)) {
    userName = JSON.parse(localStorage.getItem('userData')).UserName
  }

  return (
    <div className="profile-container">
      <div className="profile-image" onClick={toggleDropdown}>
        <img src={userIcon} alt="User Avatar" />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-item-user">
            <div>
              <img className='avatar' src={userIcon} alt="User Avatar" />
              <p>{userName}</p>
            </div>
            {/* <div>
              <p><a className='jump' href='#'>{userAccount}</a></p>
            </div> */}
          </div>

          <div className="menu-item">
            {/* <span><img className='svg' src={settings} alt="Settings Icon" /></span>
            <a className='jump' href='#'>Account Settings</a> */}
          </div>

          <div className="menu-item" onClick={handleLogout}>
            <span><img className='svg' src={logout} alt="Logout Icon" /></span>
            <span className='jump' >Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
