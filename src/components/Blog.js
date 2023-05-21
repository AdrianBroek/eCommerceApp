import React from "react";
import { useNavigate } from "react-router-dom";
import PostAction from "../actions/PostAction";
import { useDispatch } from "react-redux";


const Blog = (data) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blog = data.data

    function blogHref(){
        navigate(`/blog/${blog.id}`)
        dispatch(PostAction(blog.id))
    }

    return (
        <article onClick={()=>blogHref()} className="post">
            <p>{blog.title}</p>
            <div><img /></div>
            <div>{blog.tags.map((tag)=><p>{tag}</p>)}</div>
            <div>
                <img />
                <p>{blog.reactions}</p>
            </div>
        </article>
    )
}

export default Blog