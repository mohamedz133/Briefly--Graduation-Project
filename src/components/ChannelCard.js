import React, { useState } from "react";
import '../styles/ChannelCard.css'
import briefimg from '../assets/Eo_circle_red_white_letter-b.svg';
import '../styles/common.css'
function ChannelCard({ parrallelDiscover, setTriggerFetch, setModalData, type, item }) {

  const [, setAlertMessage] = useState(false);
  const [, setAlertType] = useState(false);

  let token
  // first cond to avoid bad data:undefined ,value,second avoid if it data entry not exist in localstorage
  if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
    token = JSON.parse(localStorage.getItem('data')).token

  }

  const checkImageUrl = (item) => {
    /* #Note_image if  image link is bad ex - ,_ */
    let src = item?.image
    // console.log(item?.image);
    // #graduation_disccution error boundry
    if (!src?.match(/http(\w|\W)+/)) {
      src = briefimg
    }

    return src
  }

  const subscribeHandler = (resolve, id) => {
    fetch(`https://localhost:7250/api/v1/Rss/RssUserSubscribe/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }, method: 'POST'
    }).then((response) => {
      console.log('Subscribing ...');
      if (!response.ok) {
        console.log(response);
        setAlertMessage(response.status);
        setAlertType('error');
      }
      return response.json();
    }).then((jsonData) => {
      console.log(jsonData);
      if (jsonData.succeeded) {
        setAlertMessage(jsonData.message);
        setAlertType('success');
        resolve();
      } else {
        setAlertMessage(jsonData.message);
        setAlertType('error');
      }
    }).catch((err) => {
      setAlertMessage(err.message);
      setAlertType('error');
    });
  };

  const unsubscribeHandler = (resolve, id) => {
    console.log(id);
    fetch(`https://localhost:7250/api/v1/Rss/RssUserUnSubscribe/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }, method: 'POST'
    }).then((response) => {
      console.log('Unsubscribing ...');
      if (!response.ok) {
        console.log('GetUnSubscribing !response.ok...');
        console.log(response);
        setAlertMessage(response.status);
        setAlertType('error');
      } else {
        console.log('GetUnSubscribing response.ok...');
      }
      return response.json();
    }).then((jsonData) => {
      if (jsonData.succeeded) {
        console.log('GetUnSubscribing jsonData.succeeded');
        setAlertMessage(jsonData.message);
        setAlertType('success');
        resolve();
      } else {
        console.log('GetUnSubscribing !jsonData.succeeded');
        setAlertMessage(jsonData.message);
        setAlertType('error');
      }
    }).catch((err) => {
      setAlertMessage(err.message);
      setAlertType('error');
    });
  };

  return (
    <div>

      {type === 'public_channels' ? 
      (<a target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} href={`${item?.url}`}>
        <div className="gallary_item"
          key={item?.id}
          onClick={() => {
            setModalData(item)

          }}>
          {/* #Note_image if 404 image >callback */}
          <div className="gallary_img_wrapper">
            <img
              src={checkImageUrl(item)}
              alt=''
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = briefimg
              }}
            />

          </div>
          <div className="gallary_item_details">
            <h2 className="gallary_item_headding">{item?.title}</h2>
            <p className={type !== "public_channels" ? 'gallary_item_description' : 'gallary_item_descriptio_public_channels'}>{item?.description}</p>
          </div>
        </div>
      </a>) :
      ( <div className="gallary_item"
        key={item?.id}
        onClick={() => {
          setModalData(item)

        }}>
        {/* #Note_image if 404 image >callback */}
        <div className="gallary_img_wrapper">
          <img
            src={checkImageUrl(item)}
            alt=''
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = briefimg
            }}
          />

        </div>
        <div className="gallary_item_details">
          <h2 className="gallary_item_headding">{item?.title}</h2>
          <p className={type !== "public_channels" ? 'gallary_item_description' : 'gallary_item_descriptio_public_channels'}>{item?.description}</p>
        </div>
      </div>)}
      <div className="gallary_item_actions">
        {type === "subscription_channels" &&
          <button className="subscribe_btn" onClick={() => {
            new Promise((resolve, reject) => {
              unsubscribeHandler(resolve, item?.id);
            }).then(() => {
              setTriggerFetch((old) => !old);
              // #NOTE_CASE if the removed was the  activeChannel (from localStorage) remove it
              if (JSON.parse(localStorage.getItem('activeChannel'))?.id===item?.id) 
                localStorage.setItem('activeChannel',null)


            });
          }}>
            UnFollow
          </button>
        }
        {type === "discover_channels" && item?.subscribed ?
          <button className="subscribe_btn" onClick={() => {
            new Promise((resolve, reject) => {
              unsubscribeHandler(resolve, item?.id);
            }).then(() => {
              parrallelDiscover();
            });
          }}>
            UnFollow
          </button>
          : null
        }
        {!item?.subscribed && type === "discover_channels" &&
          <button className="subscribe_btn" onClick={() => {
            new Promise((resolve, reject) => {
              subscribeHandler(resolve, item?.id);
            }).then(() => {
              parrallelDiscover();
            });
          }}>
            Follow
          </button>
        }
      </div>
    </div>
  );
}

export default ChannelCard;
