import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAction from "../actions/PostAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noPicture from '../images/no-picture.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faInfoCircle, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostComment from "./PostComment";

const Post = () => {
    const dispatch = useDispatch()
    const {activePost} = useSelector(state => state.blog)
    const {userData, logged} = useSelector(state => state.loggedStatus)
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [comment, setComment] = useState()

    function getPostIdFromUrl(){
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(PostAction(linkDone))
    }

    async function getComment(){
        const options = {
            url: `https://dummyjson.com/posts/${activePost.id}/comments`,
            method: "GET"
        }
        const commentsData = await axios.request(options) 
        setComment(commentsData.data.comments)
    }

    useEffect(()=> {
        getComment()
        console.log(comment)
    }, [activePost])

    const post_input_ref = useRef()

    const [info, setInfo] = useState(false)

    function postSubmitHandler(e){
        e.preventDefault()
        const newPost = {
            id: 999,
            body: post_input_ref.current.value,
            postId: Math.floor(Math.random() * 100) + 90,
            user: {
                id: userData.id,
                username: userData.username
            }
        }
        if(newPost.body==''){
            dispatch({
                type: "LOAD_POPUP",
                payload: "error"
            })
            return
        }
        if(newPost){
            const samePost = comment.filter(del=>del.body==newPost.body)
            console.log(samePost)
            if(samePost.length > 0){
                dispatch({
                    type: "LOAD_POPUP",
                    payload: "error"
                })
                return
            }
        }
        
        setComment(state => ([newPost, ...state]))
        return dispatch({
            type: "LOAD_POPUP",
            payload: "success"
        })
        
        // console.log(comment)
    }

    return (
        <>
        {activePost ? 
        <article id="post" className={'vol flex ' + activePost.id}>
            <div className="post-container">
                <div className="exit-post"
                onClick={()=> navigate(-1)}>
                    <FontAwesomeIcon size="xl" icon={faXmarkCircle}/>
                </div>
                <div className="post-pic">
                    <img src='https://picsum.photos/1200' alt="random generated image"/>
                </div>
                <div className="title">
                    <h2>{activePost.title}</h2>
                </div>
                <div className="body">
                    <p>{activePost.body}</p>
                </div>
                <div className="tags flex">
                    <FontAwesomeIcon icon={faHashtag}/>
                    {activePost.tags.map((tag)=>(
                        <p>{tag}</p>
                    ))}
                </div>
                
                <div className="comments">
                {logged ? 
                    <form onSubmit={postSubmitHandler} className="post-input flex">
                        <input ref={post_input_ref} type="text" placeholder="type..."/>
                        <div className="comment-info">
                            <FontAwesomeIcon onMouseEnter={()=>setInfo(true)} onMouseLeave={()=>setInfo(false)} icon={faInfoCircle} />
                        </div>
                        {info ? <p className="info-text">this is just a simulation commenting, won't add to the server/redux</p> : ""}
                        <button className="b">Comment</button>
                    </form>
                :<p>to add comment, <Link to="/login">login</Link> to the page!</p>}
                {comment ? 
                    <>
                    <h4>Comments:</h4>
                        {comment && comment.map((item)=> (
                            <PostComment item={item} comment={comment} setComment={setComment}/>
                        ))}
                    </> 
                : ""}
                </div> 
            </div> 
        </article>
         : "" }
        </>
    )
}

export default Post