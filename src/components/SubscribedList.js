import React, { useEffect, useState } from 'react';
import '../styles/common.css';
import briefimg from '../assets/Eo_circle_red_white_letter-b.svg';
import useFetch from '../customHooks/useFetch';
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

function SubscribedList({ GetRssArticlesById, loading }) {
    let token;
    if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
        token = JSON.parse(localStorage.getItem('data')).token;
    }

    const [jsonData, , sendRequest] = useFetch();
    const [activeChannel, setActiveChannel] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const getActiveChannelFromStorage = () => {
        const storedActiveChannel = localStorage.getItem('activeChannel');
        return storedActiveChannel ? JSON.parse(storedActiveChannel) : null;
    };

    const setActiveChannelInStorage = (channelId, channelTitle) => {
        localStorage.setItem('activeChannel', JSON.stringify({ id: channelId, title: channelTitle }));
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // #Note_case workarround get all rss without 10 by defauklt,without pagenation
        sendRequest('https://localhost:7250/api/v1/Rss/SubscribedRss/All?PageNumber=1&PageSize=1000', { method: 'GET', name: 'GetSubscribedList', token: token });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (jsonData.succeeded || jsonData.hasOwnProperty('data')) {
            const storedActiveChannel = getActiveChannelFromStorage();
            if (jsonData.data && jsonData.data.length > 0) {
                if (storedActiveChannel) {
                    setActiveChannel(storedActiveChannel);
                    GetRssArticlesById(storedActiveChannel.id, storedActiveChannel.title);
                } else {
                    const firstChannel = jsonData.data[0];
                    setActiveChannel({ id: firstChannel.id });
                    console.log(firstChannel);
                    // console.log('------------------------------');
                    GetRssArticlesById(firstChannel.id, firstChannel.title);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jsonData]);

    const handleChannelClick = (item, index) => {
        setActiveChannel({ id: item.id, title: item.title });
        GetRssArticlesById(item.id, item.title);
        setActiveChannelInStorage(item.id, item.title);
        setSelectedChannel(index);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    if (loading) {
        return (
            <div className="gallary_items">
                {/* Show spinner while loading */}
                <Spinner />
            </div>
        );
    } else if (jsonData.data && jsonData?.data?.length > 0) {
        return (
            <div>
                {windowWidth > 768 ? (
                    <div className="verticalCards">
                        {jsonData.data.map((item, idx) => (
                            <div
                                className={`channelsHover ${activeChannel && activeChannel.id === item.id ? 'activeChannel' : ''}`}
                                onClick={() => handleChannelClick(item, idx)}
                                key={idx}
                            >
                                <div className='channelImageBox'>
                                    <img
                                        className="channelImage"
                                        src={item.image}
                                        alt=""
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = briefimg;
                                        }}
                                    />
                                </div>
                                <div className='channelTitleBox'>
                                    <p className='channelTitle'>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <button className="dropdownButton" onClick={toggleDropdown}>
                            <img src={jsonData.data[selectedChannel].image} alt="" 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = briefimg;
                              }}/>
                        </button>
                        {showDropdown && (
                            <div className="dropdownList">
                                {jsonData.data.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`dropdownItem ${selectedChannel === index ? 'selectedDropdownItem' : ''}`}
                                        onClick={() => handleChannelClick(option, index)}
                                    >
                                        <img src={option.image} alt="" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = briefimg;
                                          }}/>
                                        <p>{option.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
        // #nOTE_cASE should be no elements solve bad transient state tryit
    } else if((jsonData.data && jsonData?.data?.length ===0)) {
        return (
            <div className='No-channels'>
                <h1>No Subscriptions, Subscribe to show articles </h1>
                <button
                    onClick={() => navigate('/home/discover')}
                >
                    Discover
                </button>
            </div>
        );
    }
}

export default SubscribedList;
