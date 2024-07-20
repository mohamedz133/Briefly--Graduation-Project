import React, { useEffect, useState } from "react";
import Spinner from './Spinner';
import ArticleCard from "./ArticleCard";
import SubscribedList from "./SubscribedList";
import useFetch from "../customHooks/useFetch";
import ArticleModal from "./ArticleModal";
import Pagination from "./Pagination";
import '../styles/common.css';

function UserArticles() {
  // const [subscribedChannelsExist, setSubscribedChannelsExist] = useState(false);
  const [articleModalData, setArticleModalData] = useState('');
  const [rssTitle, setRssTitle] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Initialize pageNumber to 1
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  let token;
  if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
    token = JSON.parse(localStorage.getItem('data')).token;
  }

  const [jsonData, , sendRequest] = useFetch();

  function GetRssArticlesById(id, title) {
    // #NOTE_CASE only changes by GetRssArticlesById ,when called by subscribedLIst on intial render

    setRssTitle(title);
    setSelectedChannelId(id);
    setPageNumber(1); // Reset pageNumber to 1 when selecting a new channel

    if (id) {
      setLoading(true);


      sendRequest(`https://localhost:7250/api/v1/Article/GetAllRssArticles?Rssid=${id}&PageNumber=1&PageSize=10`, {
        method: 'get', name: 'GETuserArticles', token: token, onSucceed: (data) => {
          setLoading(false);
          // Assume response contains total articles count
          setTotalPages(Math.ceil(jsonData?.totalPages)); // Adjust according to your API response
        }, jsonFailProp: 'message'
      });
    }
  }

  useEffect(() => {
    const activeChannel = JSON.parse(localStorage.getItem('activeChannel'));
    if (activeChannel) {
      setSelectedChannelId(activeChannel.id)
      GetRssArticlesById(activeChannel.id, activeChannel.title);
      setRssTitle(activeChannel.title);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // #Note_case if current channel is x ,then user unsubscirbe it, we should remove it from localstorage  
    if (selectedChannelId) {
      sendRequest(`https://localhost:7250/api/v1/Article/GetAllRssArticles?Rssid=${selectedChannelId}&PageNumber=${pageNumber}&PageSize=10`, {
        method: 'get', name: 'GETuserArticles', token: token, onSucceed: (data) => {
          setLoading(false);
          setTotalPages(Math.ceil(jsonData?.totalPages));
        }, onFailed: () => { setLoading(false) }
        // #Note_CASE empty data ,loading finshed

      });
    }
    else {
      // #Note_case happens if we unsubscribed all channels
      setLoading(false);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, selectedChannelId]);



  return (
    <>
      {<div className="channel-title"><h2>{rssTitle}</h2></div>}
      {articleModalData && <ArticleModal setArticleModalData={setArticleModalData} data={articleModalData} />}

      <div className="div_userArticles">

        <div className="subscribedList">
          <SubscribedList GetRssArticlesById={GetRssArticlesById} loading={loading} />
        </div>
        {
// #NOTE_CASE bad transient tryit
          // jsonData?.data === null
          jsonData?.data?.length===0
          &&
          <div className={`gallary_items `}>
            <p className="noDataText">
              There is no data
            </p>
          </div>
        }
        {
          // #NOTE_CASE ENSSURE   DATA has no 0 length
          loading ? (
            <div className="gallary_items ">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="articlesNavbar">
                <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />
              </div>
              <div className="gallary_items ">
                {jsonData.data && jsonData.data.map((item) => (
                  <ArticleCard key={item.id} setArticleModalData={setArticleModalData} item={item} />
                ))}
              </div>
            </>
          )
        }

      </div>
    </>
  );
}

export default UserArticles;
