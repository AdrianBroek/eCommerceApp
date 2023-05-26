import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAction from "../actions/PostAction";
import { useLocation, useNavigate } from "react-router-dom";
import noPicture from '../images/no-picture.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
    const dispatch = useDispatch()
    const {activePost} = useSelector(state => state.blog)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    function getPostIdFromUrl(){
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(PostAction(linkDone))
    }

    useEffect(()=> {
        getPostIdFromUrl()
    }, [])

    return (
        <>
        {activePost ? 
        <article id="post" className={'vol flex ' + activePost.id}>
            <div className="exit-post"
            onClick={()=> navigate(-1)}>
                <FontAwesomeIcon size="xl" icon={faXmarkCircle}/>
            </div>
            <div className="post-pic">
                <img src={noPicture} alt="no picture"/>
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
        </article>
         : "" }
        </>
    )
}

export default Post