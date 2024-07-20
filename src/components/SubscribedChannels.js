import React, { useEffect, useState } from "react";
import ChannelsView from "./ChannelsView";
import '../styles/subscripedChannels.css';
import useFetch from "../customHooks/useFetch";
import { useNavigate } from "react-router";

function SubscripedChannels() {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const navigateFn=useNavigate()
  let token;

  if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
    token = JSON.parse(localStorage.getItem('data')).token;
  }

  const [jsonData, , sendRequest] = useFetch();

  useEffect(() => {
    sendRequest(`https://localhost:7250/api/v1/Rss/SubscribedRss/All?PageNumber=${pageNumber}&PageSize=10`, { method: 'get', name: 'GETSubscribedRss', token: token });
    console.log(pageNumber);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetch, pageNumber]);

  if (jsonData.data) {
    return (<>
    <div className="channel-title">    <h2>Subscribed Channels</h2>
    </div>

      <ChannelsView
       totalPages={jsonData?.totalPages}
        pageNumber={jsonData?.pageNumber}
        className={'gallary_items_subscribed_Channels'}
        setPageNumber={setPageNumber}
        setTriggerFetch={setTriggerFetch}
        type="subscription_channels"
        channels={jsonData.data} /></>)
  }
    // #Note_case no data case if no ddata api returns null in data not empty array
    else if (jsonData?.data===null) {
    return (
      <div className='No-channels'>
                <h1>No Subscriptions, Subscribe to show articles </h1>
                <button
                    onClick={() => navigateFn('/home/discover')}
                >
                    Discover
                </button>
            </div>
    );
  }
}

export default SubscripedChannels;
