import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostAction from "../actions/PostAction";
import { useDispatch } from "react-redux";
import GenerateImage from '../components/GenerateImage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faHashtag, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";


const Blog = (data) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const blog = data.data
    const [image, setImage] = useState('')

    useEffect(()=> {
        setImage('https://picsum.photos/200')
        // console.log(image)
    }, [])

    // GenerateImage()

    function blogHref(){
        navigate(`/blog/${blog.id}`)
        dispatch(PostAction(blog.id))
    }

    return (
        <>
        <article onClick={()=>blogHref()} className="post flex">
            <h3 className="title">{blog.title}</h3>
            <div className="tags flex">
                <FontAwesomeIcon icon={faHashtag}/>
                {blog.tags.map((tag)=>(
                    <p>{tag}</p>
                ))}
            </div>
            <div className="reactions">
                <FontAwesomeIcon icon={faThumbsUp}/>
                {blog.reactions}
            </div>
        </article>
        <div className="dummy-image-container">
        </div>
        </>
    )
}

export default Blog