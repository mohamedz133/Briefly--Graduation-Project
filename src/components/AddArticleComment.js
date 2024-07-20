import React, { useRef } from 'react';
import useFetch from '../customHooks/useFetch';
import '../styles/AddArticleComment.css';

function AddArticleComment({ articleId, setTriggerFetchComments }) {
    const addCommentRef = useRef();
    const [, , sendRequest] = useFetch();

    const sendAddComment = () => {
        let token;

        if (localStorage.getItem("data") !== 'undefined' && localStorage.getItem("data") !== null) {
            token = JSON.parse(localStorage.getItem('data')).token;
        }

        if (addCommentRef.current?.value && articleId) {
            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/AddGeneralCommentArticle?text=${addCommentRef.current.value}&articleId=${articleId}`, {
                method: 'POST',
                name: 'POSTGlobalComment',
                token: token,
                jsonFailProp: 'message',
                jsonSuccessProp: 'message',
                onSucceed: () => {
                    addCommentRef.current.value = '';
                    setTriggerFetchComments(old => !old);
                }
            });
        }
    };

    return (
        <div className="addComment">
            
                <textarea
                    className="textarea"
                    ref={addCommentRef}
                    placeholder='Add a comment...'
                />
            
            
                <button className="button" onClick={sendAddComment}>Submit</button>
            
        </div>
    );
}

export default AddArticleComment;
