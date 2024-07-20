import React, { useEffect, useState } from "react";
import ChannelCard from "./ChannelCard";
import "../styles/ChannelsView.css";
import "../styles/common.css";
import Spinner from "./Spinner";
import ChannelModal from "./ChannelModal";
import Pagination from "./Pagination";
function ChannelsView({ totalPages, pageNumber, setPageNumber, parrallelDiscover, setTriggerFetch, channels, type }) {
  const [ModalData, setModalData] = useState('')
  // when state of model updates scrolling behavior updates 
  // #Note_case direct_manipulate_dom
  // console.log(`-----------------------`)
  useEffect(() => {

    const body = document.body;
    if (ModalData && type !== "public_channels") {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ModalData])
  // #Note_case if channels is not empty
  if (channels)
    return (
      <>
        {ModalData && type !== "public_channels" ? <ChannelModal type={type} setModalData={setModalData} data={ModalData} /> : null}

        {type !== 'public_channels' && <Pagination totalPages={totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        }

        <div className={`gallary_items ${type}_class`}>

          {channels?.map((item, id) => (
            <ChannelCard
              parrallelDiscover={parrallelDiscover}
              setTriggerFetch={setTriggerFetch}
              setModalData={(dataFromChild) => { setModalData(dataFromChild) }}
              key={id}
              type={type}
              item={item} />
          ))}

        </div>
      </>
    );

  // #Note_case empty data return null in channels
  // else if (channels?.data === undefined) {
  else if (channels === null) {

    return (
      <div className={`gallary_items ${type}_class`}>
        <p className="noDataText">
          There is no data
        </p>
      </div>)

  }
  else {
    return (
      <div className={`gallary_items ${type}_class`}>
        <Spinner style={{ position: 'static', height: 'auto' }} />
      </div>

    );
  }
}

export default ChannelsView;

