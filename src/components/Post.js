import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAction from "../actions/PostAction";
import { useLocation } from "react-router-dom";

const Post = () => {
    const dispatch = useDispatch()
    const {activePost} = useSelector(state => state.blog)
    const {pathname} = useLocation()

    function getPostIdFromUrl(){
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        console.log(linkDone)
        dispatch(PostAction(linkDone))
    }

    useEffect(()=> {
        getPostIdFromUrl()
    }, [])

    return (
        <>
        {activePost ? 
        <article id="post" className={'vol flex '+activePost.id}>
            <div>
                <img />
            </div>
            <div>
                <h2>{activePost.title}</h2>
            </div>
            <div>
                <p>{activePost.body}</p>
            </div>
            <div>
                <p>{activePost.body}</p>
            </div>
        </article>
         : "" }
        </>
    )
}

export default Post