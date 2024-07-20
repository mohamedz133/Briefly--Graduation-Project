import React, { useEffect, useRef, useState } from "react";
import ChannelsView from "./ChannelsView";
import '../styles/discoverChannel.css'
import '../styles/common.css'
import Alert from "./Alert";

function DiscoverChannels() {
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [channelsJson, setChannelJson] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [alertMessage,] = useState(false);
  const [alertType,] = useState(false);
  let searchInputRef = useRef();
  let token = JSON.parse(localStorage.getItem('data')).token;

  async function parrallelDiscover(searchQuery = '') {
    let allAllchannelsPromise = fetch(`https://localhost:7250/api/v1/Rss/GetAll?search=${searchQuery}&PageNumber=${pageNumber}&PageSize=7`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    let subscribedChannelsPromise = fetch(`https://localhost:7250/api/v1/Rss/SubscribedRss/All?PageNumber=1&PageSize=1000`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let [allChannelsResponse, subscribedChannelsResponse] = await Promise.all([allAllchannelsPromise, subscribedChannelsPromise]);

    if (allChannelsResponse.ok && subscribedChannelsResponse.ok) {
      let allchannelsJson = await allChannelsResponse.json();
      console.log('GetDiscover');
      console.log(allchannelsJson);
      let subscribedChannelJson = await subscribedChannelsResponse.json();
      console.log('subscribedChannelJson')
      console.log(subscribedChannelJson)

      let subscribtionIdArr = subscribedChannelJson.data?.map((item) => item.id);

      let isCurrentItemSubscribed = 0;

      let Newchannels = allchannelsJson?.data?.map((item) => {
        isCurrentItemSubscribed = subscribtionIdArr?.includes(item.id) ? 1 : 0;
        return { ...item, 'subscribed': isCurrentItemSubscribed };
      });

      allchannelsJson.data = Newchannels;

      setChannelJson(allchannelsJson);
    }
  }

  useEffect(() => {
    parrallelDiscover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleSearchIconClick = () => {
    setSearchTrigger(!searchTrigger);
  };

  const handleSearchInputChange = (e) => {
    if (e.key === 'Enter') {
      parrallelDiscover(searchInputRef.current.value);
      setSearchTrigger(!searchTrigger);

    }
  };

  return (
    <>
      {alertType && <Alert alertText={alertMessage} type={alertType} />}

      <div className="channel-title">
        <h2>Discover Our Channels 
        <svg
          onClick={handleSearchIconClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="Red"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="feather-feather-search"
          viewBox="0 0 24 24"
          style={{ marginLeft: '10px',marginTop:'2%', cursor: 'pointer' }}
        >
          <defs />
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        </h2>
   
        {searchTrigger &&
          <input
          style={{marginTop:'-5%'}}
            ref={searchInputRef}
            className="search-input"
            type="text"
            placeholder=" Write a Channel Name"
            onKeyDown={handleSearchInputChange}
          />
        }
      </div>

      <ChannelsView
        className={'gallary_items_discover_channels'}
        totalPages={channelsJson?.totalPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        parrallelDiscover={parrallelDiscover}
        type="discover_channels"
        channels={channelsJson?.data}
      />
    </>
  );
}

export default DiscoverChannels;
