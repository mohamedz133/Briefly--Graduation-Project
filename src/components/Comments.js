import React, { useEffect, useState } from 'react'
import '../styles/common.css'
import AddComment from './AddArticleComment'
import useFetch from '../customHooks/useFetch'
import Comment from './Comment'
function Comments({ articleId }) {
    let [comments, , sendRequest] = useFetch()
    const [triggerFetchComments, setTriggerFetchComments] = useState()


    useEffect(() => {
        let token;

        if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
            token = JSON.parse(localStorage.getItem('data')).token;

            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/GetAllCommentsArticle/${articleId}`, {
                method: 'get', name: 'GETComments', token: token,
            }, [triggerFetchComments]);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerFetchComments])


    




    return (
        <div className='commentsParent'>
              <AddComment
                articleId={articleId}
                setTriggerFetchComments={setTriggerFetchComments}

            />

            {/* #NOTE_CASE auto handle  */}
            {
                comments?.data?.map((item) => {
                    return (
                        <Comment
                            articleId={articleId}
                            setTriggerFetchComments={setTriggerFetchComments}
                            key={item.id}
                            data={item}
                        />
                    )
                })

            }

          


        </div>
    )
}

export default Comments