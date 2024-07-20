import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../customHooks/useFetch';
import { actions } from '../redux/slices/NotifySlice';
import { useDispatch } from 'react-redux';

import userIcon from "../assets/user.svg"
import likeIcon from "../assets/like.svg"
import filledLike from "../assets/filledLike.svg"
import deleteIcon from "../assets/delete.svg"
import commentIcon from "../assets/comment.svg"
import editIcon from "../assets/edit.svg"

function Comment(props) {
    const [likedComments, setLikedComments] = useState([])

    const [showReplies, setShowReplies] = useState(false)
    const [addcommitViewForm, setaddcommitViewForm] = useState(0)
    const [editCommentViewForm, seteditCommentViewForm] = useState(0)
    const dispatch = useDispatch()

    const editInputRef = useRef()
    const addCommentRef = useRef()
    // 0 or the id of edit view
    let token
    let userName
    if (localStorage.getItem("data") !== undefined && localStorage.getItem("data") !== null) {
        token = JSON.parse(localStorage.getItem('data')).token;
    } if (localStorage.getItem("userData") !== undefined && localStorage.getItem("userData") !== null) {
        userName = JSON.parse(localStorage.getItem('userData')).UserName;
    }

    const [, , sendRequest] = useFetch()


    function editComment(id) {

        // #NOte_case check against token,send value schema
        if (token !== undefined && token != null && editInputRef.current.value !== '')

            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/EditCommentArticle?text=${editInputRef.current.value}&commentId=${id}`, {
                method: 'PUT', name: 'PUTeditComment', token: token, onSucceed: () => {
                    props.setTriggerFetchComments((old) => !old)
                    // #NOTE_CASE hide form after editing the comment
                    seteditCommentViewForm(false)


                }, jsonFailProp: 'message',
                jsonSuccessProp: 'message',
            });


        else if (editInputRef.current.value === '') {
            dispatch(actions.setError(`Comment cannot be empty`))

        }


    }

    function deleteComment() {
        if (token !== undefined || token != null)

            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/DeleteCommentArticle/${props?.data?.id}`, {
                method: 'DELETE', name: 'deleteComment', token: token, onSucceed: () =>

                    props.setTriggerFetchComments((old) => !old), jsonFailProp: 'message',
                jsonSuccessProp: 'message',


            });
    }



    function likeComment(id) {
        if (token !== undefined || token != null)

            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/AddLikeCommentArticle/${id}`, {
                method: 'POST', name: 'likeComment', token: token, onSucceed: () => {
                    // #NOTE_case to rerender component and show dislike/like

                    let tempLikedComments = likedComments
                    tempLikedComments.push(id)
                    // #Note_case persistant while rerenders

                    localStorage.setItem('likedComments', JSON.stringify(tempLikedComments))
                    setLikedComments(tempLikedComments)
                    props.setTriggerFetchComments((old) => !old)



                }
            });
    }

    function dislikeComment(id) {
        if (token !== undefined || token != null) {
            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/DeleteLikeCommentArticle/${id}`, {
                method: 'POST', name: 'dislikeComment', token: token, onSucceed: () => {
                    // #NOTE_case to rerender component and show dislike/like

                    let newLikedArr = likedComments?.filter((item) => {
                        return (item !== id)
                    })
                    // // #NOte_case dislike after like ,means empty
                    localStorage.setItem('likedComments', JSON.stringify(newLikedArr))
                    setLikedComments(newLikedArr)
                    props.setTriggerFetchComments((old) => !old)
                    // #Note_case persistant while rerenders

                }
            });
        }
    }
    function sendcommentComment(id) {
        if (token !== undefined && token != null && addCommentRef.current.value)

            sendRequest(`https://localhost:7250/api/v1/CommentsArticle/AddLocalCommentArticle?text=${addCommentRef.current.value}&articleId=${props.articleId}&parentcommentId=${id}`, {
                method: 'POST', name: 'commentComment', token: token, onSucceed: () => {
                    props.setTriggerFetchComments((old) => !old)

                    addCommentRef.current.value = ''
                    setaddcommitViewForm(false)
                }, jsonFailProp: 'message',
                jsonSuccessProp: 'message',

            });
        // addCommentRef.current.value = ''
        // setaddcommitViewForm(false)

    }


    function authorizedEditing(commentUserName) {
        // console.log(userName);
        // console.log(commentUserName);
        if (commentUserName === userName)
            return true
        else
            return false


    }

    useEffect(() => {
        if (localStorage.getItem("likedComments") !== 'undefined' && localStorage.getItem("likedComments") !== null) {
            setLikedComments(JSON.parse(localStorage.getItem('likedComments')))
        }
    }, [])
    useEffect(() => {

        if (editCommentViewForm) {
            editInputRef.current.value = props?.data?.text

        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editCommentViewForm])
    // #Note_case check if liked comment
    let ifLiked = likedComments?.findIndex((item) => item === props?.data?.id)

    return (
        <div className='globalComment' key={props.id}>

            <div className='metadataComment_user_date' >
                <img src={userIcon} alt="userIcon" />
                <p className='metadataComment_userName'>{props.data.userName}</p>

            </div>

            {/* #NOTE_CASE edit /show comment */}
            {
                editCommentViewForm === props?.data?.id
                    ?
                    <div className='editCommentParent'>

                        <textarea  ref={editInputRef} />
                        <button onClick={() => { editComment(props?.data?.id) }}>Submit</button>

                    </div>
                    :
                    <p className='metadataComment_text' >{props?.data?.text}</p>


            }

            <div className='metadataComment'>

                <p className='metadataComment_date'>{props.data.postedDate?.match(/\d+-\d+-\d+/)}</p>
                {props.data.replies?.length > 0 && <p onClick={() => setShowReplies(true)}>  replies</p>}
                <p className='metadataComment_likes'>{props.data.likes} likes</p>


            </div>




            <div className='globalCommentActions'>


                {authorizedEditing(props?.data?.userName) && <>

                    <span onClick={() => {
                        seteditCommentViewForm(props?.data?.id)
                        // #NOte_case intial comment data when edit
                    }}>

                        <img src={editIcon} alt='edit' />
                    </span>
                    <span onClick={() => deleteComment(props?.data?.id)}>

                        <img src={deleteIcon} alt='delete' />


                    </span>


                </>}

                <span onClick={() => {
                    // /* #edit */
                    try {
                    }
                    catch (err) {
                        console.log(err);
                        console.log(likedComments);
                    }
                    if (ifLiked === -1) {

                        likeComment(props?.data?.id)
                    }
                    else {
                        dislikeComment(props?.data?.id)
                    }

                }

                } >

                    {<img src={ifLiked !== -1 ? filledLike : likeIcon} alt='like' />}
                </span>



                <span onClick={() => {
                    setaddcommitViewForm(props?.data?.id)
                }} >

                    <img src={commentIcon} alt='comment' />

                </span>


                {/* #NOTE_Case global comment id not local comment id */}
                {/* // #NOTE_CASE show field for specific element */}


            </div>


            {addcommitViewForm === props?.data?.id &&

                <div className='addCommentComment'>


                    <textarea
                        ref={addCommentRef}
                    />
                    <button onClick={() => { sendcommentComment(props?.data?.id) }} >Submit</button>
                </div>

            }


            {showReplies &&

                props.data.replies.map((item) => {
                    return (
                        <Comment
                            parentCommentId={props.data.id}
                            setTriggerFetchComments={props.setTriggerFetchComments}
                            articleId={props.articleId}
                            key={item.id}
                            data={item} />
                    )
                })


            }


        </div>)
}

export default Comment