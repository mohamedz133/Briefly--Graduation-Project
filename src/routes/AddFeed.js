import React, {  useState } from "react";
import PreviewFeed from "../components/PreviewFeed.js";
import '../styles/addfeed.css'
import '../styles/common.css'
import useFetch from "../customHooks/useFetch.js";
// https://www.smh.com.au/rss/feed.xml

let feedLink;


const AddFeed = () => {
  const [, , sendRequest] = useFetch();

  //we need feedlink it once ,no need to use state
  // states are used if we need ,to reload ui after js value change.

  const [channel_obj, setChannelObj] = useState({
    channel_img_url: "",
    channel_img_title: "",
    channel_title: "",
    channel_description: "",
    channel_language: "",
    channel_updateDate: ""
  });
  const [showPreview, setShowPreview] = useState(false); // State to control visibility of PreviewFeed

  const [rssLink, setRssLink] = useState('')

  const handleSearch = () => {

    const UrlBase = "https://cors.eu.org/";
    fetch(UrlBase + rssLink)
      .then((response) => response.text())
      .then((xmlText) => {
        console.log(xmlText);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");


        // #graduation_discution thow error
        const channel_obj1 = {
          channel_description: xmlDoc.querySelector("description")?.textContent,
          channel_img_title: xmlDoc.querySelector("image title ")?.textContent,
          channel_img_url: xmlDoc.querySelector("image url")?.textContent,
          channel_title: xmlDoc.querySelector("title")?.textContent,
          channel_pubDate: xmlDoc.querySelector("pubDate")?.textContent
        };

        setChannelObj(channel_obj1);
        console.log(channel_obj1);
        // #Note_case empty input show bad view
        if (channel_obj.channel_title) {
          setShowPreview(true); // Show PreviewFeed after search
          const articles = xmlDoc.querySelectorAll("item");
          for (let i = 0; i < articles.length; i++) {
            const innerHtmlChildren = new DOMParser().parseFromString(articles[i].innerHTML, 'text/html');
            const article_obj1 = {
              article_description: innerHtmlChildren.querySelector("description").textContent,
              article_title: innerHtmlChildren.querySelector("title").textContent,
              article_pubDate: innerHtmlChildren.querySelector("pubDate").textContent
            };
            console.log(article_obj1);
          }

          // Clear the input field after search
          // will make input.current.value empty
          setRssLink("")
        }


      })


  };

  const handleKeyPress = (event) => {
    //reserve it before clear the field

    if (event.key === "Enter"&&rssLink?.match(/https?:\/\/(\w|\W)+\.(rss|xml)/)  ) {
      handleSearch();
    }
    else
    setShowPreview(false)
  };
  function addCustomFeed(feedLink) {

    let token = JSON.parse(localStorage.getItem('data')).token
    console.log(feedLink);
    sendRequest(`https://localhost:7250/api/v1/Rss/CreateUserRss?rssUrl=${feedLink}`, {
      method: 'POST', name: 'POSTADDrss', token: token, jsonSuccessProp: 'message', onSucceed: () => {

      }, jsonFailProp: 'message'
    })





  }
  return (
    <>
      <div className="centerFlex RSS-search-wrapper-p-div">
        <p className={``}>Enter Rss URL below and hit enter</p>


      </div>
      <p className={`rss_info`}> An RSS link is a web address that directs to an RSS feed, typically ending in <span className="redTag">.rss</span> or <span >.xml</span>, allowing users to subscribe and access updates from a website in a standardized format.</p>
      <div className="addFeed">


        <div className={`RSS-search-wrapper  `}>
          {/* search functionallity #todo_4 */}
          <input
            className={`search-input  `}
            type="text"
            onChange={(event) => {
              setRssLink(event.target.value)
            }}
            onKeyPress={handleKeyPress}
          // #Note_case validate input
          />





          <p className="rsslink_err">{!rssLink?.match(/https?:\/\/(\w|\W)+\.(rss|xml)/) && rssLink !== '' ? "Link is not xml or rss" : null}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="feather feather-search"
            viewBox="0 0 24 24"
          >
            <defs />
            <circle cx={11} cy={11} r={8} />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {showPreview && <PreviewFeed feedLink={feedLink} showPreview={showPreview} channel_obj={channel_obj} addCustomFeed={addCustomFeed} />}
        {/* show if preview is visible */}

      </div>
    </>
  );
};

export default AddFeed;
