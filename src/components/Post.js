import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAction from "../actions/PostAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import popupAction from '../actions/popupAction'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faInfoCircle, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostComment from "./PostComment";
import loaderGif  from '../images/loaderGif.gif'

const Post = () => {
    const dispatch = useDispatch()
    const {activePost} = useSelector(state => state.blog)
    const {userData, logged} = useSelector(state => state.loggedStatus)
    const [comment, setComment] = useState()
    const [image, setImage] = useState(false)

    function sendIMG(){
        if(!image){
            axios.get('https://picsum.photos/1200')
            .then((res)=>{
                if(res) {
                    // console.log(res.request.responseURL)
                    setImage(res.request.responseURL)
                }
            })
        }
    }
    // on load post, load some img from picsum api
    useEffect(()=>{
        sendIMG()
    },[])

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
            // alert popup
            dispatch(dispatch(popupAction('error', 'comment cannot be empty')))
            return
        }
        if(newPost){
            const samePost = comment.filter(del=>del.body==newPost.body)
            
            if(samePost.length > 0){
                // console.log(samePost)
                dispatch(dispatch(popupAction('error', 'you cannot spam!')))
                return
            }
        }
        
        setComment(state => ([newPost, ...state]))
        // alert popup
        return dispatch(dispatch(popupAction('success')))
        
    }

    return (
        <>
        
        {activePost ? 
        <article id="post" className={'vol flex ' + activePost.id}>
            <div className="post-container">
                <Link className="exit-post"
                to="/blog/">
                    x
                </Link>
                <div className="post-pic">
                    {image ? 
                        <img src={image} alt="random generated image"/>
                    : 
                    <div className="img-loader">
                        <img style={{padding: '25vh', transition: ".25s"}} src={loaderGif} />
                        <p>api had no images in posts, so i had to simulate it.</p>
                    </div>
                    }

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
                {comment && comment.length > 0 ? 
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