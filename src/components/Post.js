import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import popupAction from '../actions/popupAction'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faInfoCircle, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostComment from "./PostComment";
import { AnimatePresence, motion } from "framer-motion";
import { useBodyScrollLock } from "./BodyLock";
import Loader from "./Loader";
import PostAction from "../actions/PostAction";

const Post = () => {
    const dispatch = useDispatch();
    const {activePost} = useSelector(state => state.blog);
    const {pathname} = useLocation();
    const {userData, logged} = useSelector(state => state.loggedStatus);
    const [comment, setComment] = useState({
        loading: true,
        comments: []
    });
    const [image, setImage] = useState(false);
    const [imageLoad, setImageLoaded] = useState(false);
    const imageRef = useRef();

    useBodyScrollLock()

    // random image handler
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
    
    useEffect(() => {
        // on load dispatch active post
        dispatch(PostAction(pathname.split("/")[2]))
        // on load post, load some img from picsum api
        sendIMG()
        // on dismount component
        return () => {
            // set active post to null
            dispatch({
                type: "SET_ACTIVE_POST",
                payload: null
            })
            // set comments to null
            setComment({
                loading: true,
                comments: []
            })
        } 
    },[])

    async function getComment(){
        if(activePost.id){
            setComment({
                loading: true,
                comments: []
            })
            const options = {
                url: `https://dummyjson.com/posts/${activePost.id}/comments`,
                method: "GET"
            }
            
            try {
                const response = await axios.request(options);
                setComment({
                    loading: false,
                    comments: response.data.comments
                });
            }
            catch(err) {
                console.error("Error fetching comments:", err);
                dispatch(dispatch(popupAction('error', 'Error fetching comments')))
            }
        }
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
            const samePost = comment.comments.filter(del=>del.body==newPost.body)
            
            if(samePost.length > 0){
                dispatch(dispatch(popupAction('error', 'you cannot spam!')))
                return
            }
        }
        console.log(comment)
        setComment(state => ({
            ...state,
            comments: [newPost,...state.comments]
        }))
        // alert popup
        return dispatch(dispatch(popupAction('success')))
        
    }

    return (
        <AnimatePresence>
        {activePost ? 
            <motion.article 
            id="post" key={activePost.id} className={'vol flex ' + activePost.id}
            // initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <div class="overlay"/>
                <div className="post-container">
                    <Link className="exit-post"
                    to="/blog/">
                        x
                    </Link>
                    <div className="post-pic relative">
                        {image ? 
                            <motion.img 
                                ref={imageRef}
                                onLoad={()=>setImageLoaded(true)}
                                src={image} 
                                alt={`${activePost.title} - post image`} 
                                loading="lazy"
                                initial={{ opacity: 0 }} 
                                animate={imageLoad ? {opacity: 1} : {opacity: 0}} 
                            />
                        : 
                         <Loader />
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
                        {activePost.tags.map((tag, index)=>(
                            <p key={index}>{tag}</p>
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
                        :
                        <p>to add comment, <Link to="/login">login</Link> to the page!</p>}
                        <h4>Comments:</h4>
                            {comment.loading ? 
                                <div className="comments flex" style={{gap: '3rem', padding: '2rem'}}>
                                    <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                                    <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                                    <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                                </div>
                            :
                            <>
                            {comment.comments.length > 0 ?
                                comment.comments.map((item, index)=> (
                                    <PostComment key={index} item={item} comment={comment} setComment={setComment}/>
                                ))
                            : "No comments on this post."}
                            </>
                                
                            }
                    </div> 
                </div>
                
            </motion.article>
         : 
            <article id="post" className={'vol flex'}>
                <div className="post-container">
                    <div className="post-pic">
                        <Loader />
                    </div>
                    <br />
                    <div className="tags flex" style={{gap: '2rem'}}>
                        <p className="relative" style={{flex: 1}}> <Loader /></p>
                        <p className="relative" style={{flex: 1}}> <Loader /></p>
                        <p className="relative" style={{flex: 1}}> <Loader /></p>
                    </div>
                    <br />
                    <div className="title relative">
                        <h2> <Loader /></h2>
                    </div>
                    <br />
                    <div className="body">
                        <p className="relative" style={{padding: '4rem'}}> <Loader /></p>
                    </div>
                    <br />
                    <div className="comments flex" style={{gap: '3rem', padding: '2rem'}}>
                        <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                        <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                        <p className="relative" style={{flex: 1, width: '100%'}}> <Loader /></p>
                    </div>
                </div>
            </article> }
        </AnimatePresence>
    )
}

export default Post