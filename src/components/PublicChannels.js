import React, { useEffect, useState } from "react";
import ChannelsView from "./ChannelsView";
import "../styles/publicChannels.css";
import "../styles/common.css";

import useFetch from "../customHooks/useFetch";

const categories = [
    { name: "General", key: "general" },
    // { name: "World", key: "world" },
    // { name: "Nation", key: "nation" },
    { name: "Sports", key: "sports" },
    { name: "Science", key: "science" },
    { name: "Health", key: "health" },
    { name: "Business", key: "business" },
    { name: "Technology", key: "technology" },
    { name: "Entertainment", key: "entertainment" }
];

const countries = [
    { name: "Egypt", key: "eg", lang: "ar" },
    { name: "United Arab Emirates", key: "ae", lang: "ar" },
    // { name: "Saudi Arabia", lang: "ar", key: "sa" },
    { name: "United States", lang: "en", key: "us" },
    { name: "United Kingdom", lang: "en", key: "gb" }
];

function PublicChannels() {
    const [selectedSpan, setSelectedSpan] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [categorisHover, setCategorisHover] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [data, , sendRequest] = useFetch();

    const apikey = '7d004691ba5a41539c5f91afd96c786f';

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
        sendRequest(`https://newsapi.org/v2/top-headlines?category=${categories[selectedSpan].key}&lang=${countries[selectedCountry].lang}&country=${countries[selectedCountry].key}&apikey=${apikey}`, { useEffect: true, method: 'Get', name: 'newsAPI' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSpan, selectedCountry]);

    let modifiedArticles = data?.articles?.map((item, index) => ({
        thumbnail: item?.urlToImage,
        title: item?.title,
        description: item?.author,
        id: index,
        content: item?.content,
        publishedAt: item?.publishedAt,
        src: item?.src,
        url: item?.url
    }));

    return (
        <>
            <h1 className="public_channels_h1">World top headlines..</h1>

            {windowWidth > 768 ? (
                <>
                    <div className="category-container"
                        style={{
                            display: 'flex', width: '80%', alignItems: 'center',
                            justifyContent: 'center', cursor: categorisHover ? 'default' : 'pointer'
                        }}>
                        {categories?.map((item, index) => (
                            <div key={index}
                                style={{ width: '11.1%' }}
                                onMouseEnter={() => setCategorisHover(true)} onMouseOut={() => setCategorisHover(false)}
                                onClick={() => setSelectedSpan(index)}>
                                <p style={{ textAlign: 'center' }}>{item?.name}</p>
                                {index === selectedSpan &&
                                    <span style={{
                                        borderBottomStyle: 'solid',
                                        borderColor: 'rgb(255, 0, 0)',
                                        display: 'block'
                                    }}></span>}
                            </div>
                        ))}
                    </div>

                    <div className="country-container"
                    style={{cursor: categorisHover ? 'default' : 'pointer'}}
                         >
                        {countries?.map((item, index) => (
                            <div className={index === selectedCountry ? 'selectedCountryOrCategry' : ''}
                                key={index} style={{ width: '11.1%' }} onClick={() => setSelectedCountry(index)}>
                                <p style={{ textAlign: 'center' }}>{item?.name}</p>
                                {index === selectedCountry && <span style={{
                                    borderBottomStyle: 'solid',
                                    borderColor: 'rgb(255 ,0 ,0)', display: 'block'
                                }}></span>}
                            </div>
                        ))}
                    </div>
                </>
            )
            
            
            : 
            
            
            (
                <div className="dropdown">
                    <select value={selectedSpan} onChange={(e) => setSelectedSpan(parseInt(e.target.value))}>
                        {categories.map((item, index) => (
                            <option key={index} value={index}>{item?.name}</option>
                        ))}
                    </select>

                <select value={selectedCountry} onChange={(e) => setSelectedCountry(parseInt(e.target.value))}>
                        {countries?.map((item, index) => (
                            <option key={index} value={index}>{item?.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <ChannelsView type="public_channels" channels={modifiedArticles} />
        </>
    );
}

export default PublicChannels;
