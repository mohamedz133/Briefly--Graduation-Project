import React from "react";

import '../styles/common.css'
import useFetch from "../customHooks/useFetch";
const RelatedArticles = (props) => { // Added onUnsave prop

  const [, , sendRequest] = useFetch()
  let token
  if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
    let data = JSON.parse(localStorage.getItem("data"))
    token = data.token

  }
  function fetchArticleDataById(id) {
    sendRequest(`https://localhost:7250/api/v1/Article/GetRssArticle/${id}`, { method: 'get', name: 'GetArticleData', token: token, onSucceed: (jsondata) => { props.setArticleModalData(jsondata) } });
  }
  return (
    <div className="relatedArticles"
      on
    >

      {/* onClick open modal in article  */}

      {props?.data.length > 0 && props?.data?.map((item, idx) => <div key={idx} onClick={() => { fetchArticleDataById(item?.id) }} className="relatedArticle">
        <img src={item?.image} alt={item?.title} />
        <p >{item?.title}</p>
        <span className="date">{item?.createdAt.match(/\d+-\d+-\d+/)}</span>
      </div>
      )}
      {
        props?.data.length === 0 &&
        <p className="noDataText">
          There is no data
        </p>
      }



    </div>
  );
}

export default RelatedArticles;
