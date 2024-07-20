import React from "react";
import "../styles/PreviewFeed.css";

const PreviewFeed = ({ channel_obj, articlesArr,showPreview,addCustomFeed,feedLink }) => {
  //add custom Feed



  return (
    <div className="preview_channel_feed">
      <img
        src={channel_obj.channel_img_url}
        alt={channel_obj.channel_img_title}
      />

      <header className="preview_channel__info">
        <h3>{channel_obj.channel_title} </h3>
        <div dangerouslySetInnerHTML={{__html:channel_obj.channel_description}}>      
        </div>

        <div className="preview_channel_meta">
          {" "}
          <span>{channel_obj.channel_language} </span>
          <span> {channel_obj.channel_updateDate}</span>
        </div>
      </header>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      {
        showPreview && <button className='sub_btn'
          onClick={() => { addCustomFeed(feedLink) }}>
          Subscribe
        </button>
      }
</div>
    </div>
  );
};
export default PreviewFeed;

