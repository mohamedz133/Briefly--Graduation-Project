import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/error404.css'; // Assuming you have the necessary styles in this file

const Error404 = ({ errorType, errorMessage }) => {
    
  let displayMessage = "An error occurred";

  if (errorType === "404") {
    displayMessage = "404 Page Not Found";
  } else if (errorMessage) {
    displayMessage = errorMessage;
  }



  return (
    <div className="wrapper">
      <div className="container">
        <div className="title glitch">
          {displayMessage}
        </div>
        <Link to="/">
          <button className="back-to-home-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
