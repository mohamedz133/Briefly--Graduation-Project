import React, { useState } from 'react';
import '../styles/SumWindow.css';
import briefimg from '../assets/Eo_circle_red_white_letter-b.svg'
import Comments from './Comments';
import RelatedArticles from './RelatedArticles';



function ArticleModal({ data, setArticleModalData }) {
    const [showTab, setshowTab] = useState(0)
    //article data in data.data
    console.log(`🖌️ ArticleModal`) // #debug 
    console.log(data) // #debug 

    const checkImageUrl = (item) => {
        /* #Note_image if  image link is bad ex - ,_ */
        let src = item.image
        console.log(item.image);
        if (!src?.match(/http(\w|\W)+/)) {
            src = briefimg
        }

        return src
    }

    return (
        <>
            <div
                style={{

                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    cursor: 'pointer',
                    zIndex: '800',
                    backgroundColor: 'rgb(171, 171, 171)',
                    opacity: '0.8'

                }}
                className="receive_click_div_helper"

                onClick={() => {
                    console.log('clicked wrapper');
                    setArticleModalData((old) => {
                        if (old !== '')
                            return ''



                    })//close modal

                }}
            >
            </div>

            <div className='sumwindow'>
                <span onClick={()=>{setArticleModalData('')}}className='back-articleModal-btn'>Back</span>


                {data?.data &&
                    <> <div style={{
                        borderBottom: '1px solid rgb(50, 45, 45)',
                        width: '100%'
                    }}>

                        {/* categories */}

                        <span className='category' >{data.data.category || 'No Categories'}</span>


                        {/* creation */}
                        <span className='date'>{data.data.createdAt.match(/\d+-\d+-\d+/)}</span>
                        {/* #Note_case sometimes img in descirption ,and no src diectly in .link */}

                        <img
                            src={checkImageUrl(data.data)}
                            alt=''
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = briefimg;
                            }}



                        />
                    </div>
                        <div className="content">
                            {/* link title */}
                            {/* #Note_case fallback image if err */}


                            <div style={{ display: 'flex' }}>
                                <span className={` articelTab ${showTab === 0 ? 'selectedTab' : ''}`} onClick={() => { setshowTab(0) }} >Description</span>
                                <span className={`articelTab  ${showTab === 1 ? 'selectedTab' : ''}`} onClick={() => { setshowTab(1) }}>Summary</span>
                                <span className={`articelTab  ${showTab === 2 ? 'selectedTab' : ''}`} onClick={() => { setshowTab(2) }}>Comments</span>
                                <span className={`articelTab  ${showTab === 3 ? 'selectedTab' : ''}`} onClick={() => { setshowTab(3) }}>RelatedArticles</span>
                            </div>
                            <p
                                style={{
                                    fontFamily: 'roboto,sans-serif',
                                    textDecoration: 'none',
                                    color: 'whitesmoke',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}  >
                                {data.data.title
                                }                    </p>

                            {/* description */}
                            {showTab === 0 && <div style={{
                                color: 'beige',
                                marginLeft: '3rem',
                                fontSize: '.9rem',
                                fontWeight: 'lighter'
                            }} dangerouslySetInnerHTML={{ __html: data.data.description }}>


                            </div>
                            }
                            {/* summary */}
                            {showTab === 1 &&
                                <div className='summary' >

                                    {/* if first not fond display second #Note_case fallback render */}
                                    <p className='p_summarization'> {data.data.summarized || 'no summarization Available'} </p>


                                </div>
                            }
                            {/* comments */}
                            {showTab === 2 &&
                                <div className='comments' >

                                    <Comments articleId={data.data.id} />

                                </div>
                            }
                             {/* RelatedArticles */}
                             {showTab === 3 &&
                                    <RelatedArticles setArticleModalData={setArticleModalData} data={data?.data?.clusters} />
                            }
                        </div></>}
                        {showTab === 0 &&
                <button className='Full-Article-button'>
                    <a target='_blank' rel="noreferrer" href={`${data.data.link}`}>
                        <svg className='Full-Article' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <g fill="currentColor">
                                <path d="M14.5 14.5v-3.25a.5.5 0 0 1 1 0V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h3.75a.5.5 0 0 1 0 1H5.5v9h9Z" />
                                <path d="M10.354 10.354a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708.708l-5 5Z" />
                                <path d="M15.5 8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 1 0v3.5Z" />
                                <path d="M11.5 5.5a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1h-3.5Z" />
                            </g>
                        </svg>
                    </a>
                </button>}
            </div >


        </>  
    );
}

export default ArticleModal;
