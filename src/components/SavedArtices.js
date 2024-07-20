import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import '../styles/common.css';

const SavedArticles = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(null); // State to hold fetched data
  const [pageSize, setPageSize] = useState(10); // Default pageSize
  const [refetch, setRefetch] = useState(false); // State to trigger refetch

  useEffect(() => {
    const storedData = localStorage.getItem("savedDataPagination");
    const token = JSON.parse(localStorage.getItem("data")).token
    if (storedData && storedData !== 'undefined') {
      const parsedData = JSON.parse(storedData);
      if (parsedData && token) {
        setToken(token);
      }
      if (parsedData && parsedData.pageSize) {
        setPageSize(parsedData.pageSize);
      }
      if (parsedData && parsedData.pageNumber) {
        setPageNumber(parsedData.pageNumber);
      }
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage when token, pageSize, or pageNumber change
    const dataToStore = {
      pageSize,
      pageNumber
    };
    localStorage.setItem("savedDataPagination", JSON.stringify(dataToStore));
  }, [pageSize, pageNumber]);

  useEffect(() => {
    // Fetch data from API when token, pageNumber, pageSize, or refetch change
    const fetchData = async () => {
      if (!token) {
        setData(null);
        return;
      }

      const url = `https://localhost:7250/api/v1/Article/GetAllUserSavedArticles?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();

        setData(result); // Set fetched data

        if (result && result.succeeded) {
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null); // Clear data on error
      }
    };

    fetchData();
  }, [token, pageNumber, pageSize, refetch]);  // Added refetch to dependencies

  const handleLogout = () => {
    // Implement logout logic to clear token and related data
    setToken(null);
    setPageNumber(1); // Reset page number
    setData(null); // Clear saved data
    localStorage.removeItem("data"); // Clear localStorage
  };

  const handleRefetch = () => {
    setRefetch(prev => !prev); // Toggle refetch state to trigger re-fetch
  };

  if (!token) {
    return (
      <div>
        <div>Please log in to view saved articles.</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (!data) {
    return <Spinner />;
  }

 

  return (
    <div>
      <div className="channel-title"><h2>Saved Articles</h2></div>
      {data.data && data.data.length > 0 ? (
        <>
          <div className="articlesNavbar">
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />
          </div>
          <div className="gallary_items div_userArticles">
            {data.data.map((article) => (
              <div key={article.id} className="articleCardContainer">
                <ArticleCard item={article} onUnsave={handleRefetch} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No saved articles available.</div>
      )}
    </div>
  );
};

export default SavedArticles;
