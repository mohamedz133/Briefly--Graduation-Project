import React, { useState, useEffect } from 'react';
import useFetch from "../customHooks/useFetch";

const HeartIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'red' : 'grey'}
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
  </svg>
);

const LikeDislikeBtn = ({ articleId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [, , sendRequest] = useFetch();

  // Retrieve the liked state from localStorage when the component mounts
  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || {};
    if (likedArticles[articleId]) {
      setIsLiked(true);
    }
  }, [articleId]);

  const handleToggleLike = async (e) => {
    e.stopPropagation(); 

    if (!articleId) {
      console.error('Article ID is not defined');
      return;
    }

    let token = localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null
      ? JSON.parse(localStorage.getItem('data')).token
      : null;

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    // Determine the endpoint based on the like state
    const url = `https://localhost:7250/api/v1/Article/${isLiked ? 'DeleteLikeArticle' : 'AddLikeArticle'}/${articleId}`;
    const method = 'POST';

    console.log(`Sending request to ${url} with method ${method} and articleId ${articleId}`);

    // Make the request
    sendRequest(url, {
      method: method,
      name: isLiked ? 'DeleteLikeArticle' : 'AddLikeArticle',
      token: token,
      onSucceed: (response) => {
        if (!response.succeeded) {
          console.error(`Failed to ${isLiked ? 'dislike' : 'like'} the article: ${response.message}`);
        } else {
          console.log(`Article ${isLiked ? 'disliked' : 'liked'} successfully`);
          // Update the local state and local storage
          setIsLiked(!isLiked);
          const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || {};
          if (isLiked) {
            delete likedArticles[articleId];
          } else {
            likedArticles[articleId] = true;
          }
          localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
        }
      },
      onFailed: (error) => {
        console.error(`An error occurred while ${isLiked ? 'disliking' : 'liking'} the article:`, error);
      }
    });
  };

  return (
    <div onClick={handleToggleLike}>
      <HeartIcon filled={isLiked} />
    </div>
  );
};

export default LikeDislikeBtn;
