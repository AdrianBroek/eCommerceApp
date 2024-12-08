import React from "react";
import { useNavigate } from "react-router-dom";
import PostAction from "../actions/PostAction";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faHashtag, faHeart } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const Blog = (data) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blog = data.data

    function blogHref(){
        dispatch(PostAction(blog.id))
        navigate(`/blog/${blog.id}`)
    }

    return (
        <AnimatePresence>
            <motion.article 
            layout 
            key={blog.id} 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={()=>blogHref()} className="post flex">
                <h3 className="title">{blog.title}</h3>
                <div className="tags flex">
                    <FontAwesomeIcon icon={faHashtag}/>
                    {blog.tags.map((tag, index)=>(
                        <p key={index}>{tag}</p>
                    ))}
                </div>
                <div className="reactions flex">
                    <FontAwesomeIcon icon={faHeart} color="orange"/>
                    {blog.reactions.likes}
                </div>
            </motion.article>
        </AnimatePresence>
    )
}

export default Blog