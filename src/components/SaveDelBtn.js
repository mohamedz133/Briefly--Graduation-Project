import React, { useState, useEffect } from 'react';
import useFetch from "../customHooks/useFetch";

// SVG Icons as React components
const StarIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'gold' : 'grey'}
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const SaveDelBtn = ({ articleId, onUnsave }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [, , sendRequest] = useFetch();

  useEffect(() => {
    // Check local storage for saved state
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || {};
    if (savedArticles[articleId]) {
      setIsSaved(true);
    }
  }, [articleId]);

  const handleToggleSave = (e) => {
    e.stopPropagation(); // Stop the event from propagating to parent elements

    // Get the token from localStorage
    let token = localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null
      ? JSON.parse(localStorage.getItem('data')).token
      : null;

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    // Determine the endpoint and method based on the save state
    const url = `https://localhost:7250/api/v1/Article/${isSaved ? 'DeleteUserSaveArticle' : 'SaveUserArticle'}/${articleId}`;
    const method = isSaved ? 'DELETE' : 'POST';

    console.log(`Sending request to ${url} with method ${method}`);

    // Make the request
    sendRequest(url, {
      method: method,
      name: isSaved ? 'DeleteUserSaveArticle' : 'SaveUserArticle',
      token: token,
      onSucceed: (response) => {
        if (!response.succeeded) {
          console.error(`Failed to ${isSaved ? 'unsave' : 'save'} the article: ${response.message}`);
        } else {
          console.log(`Article ${isSaved ? 'unsaved' : 'saved'} successfully`);
          // Update the local state and local storage
          setIsSaved(!isSaved);
          const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || {};
          if (isSaved) {
            delete savedArticles[articleId];
          } else {
            savedArticles[articleId] = true;
          }
          localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

          // Trigger the onUnsave callback
          if (onUnsave) {
            onUnsave();
          }
        }
      },
      onFailed: (error) => {
        console.error(`An error occurred while ${isSaved ? 'unsaving' : 'saving'} the article:`, error);
      }
    });
  };

  return (
    <div onClick={handleToggleSave}>
      <StarIcon filled={isSaved} />
    </div>
  );
};

export default SaveDelBtn;
