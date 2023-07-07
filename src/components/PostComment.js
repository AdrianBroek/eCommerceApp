import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

const PostComment = ({setComment, comment, item}) => {
    const {userData, logged} = useSelector(state=>state.loggedStatus)
    const dispatch = useDispatch()

    useEffect(()=> {
        // console.log(comment)
    }, [])

    function deleteHandler(){
        const newArray = comment.filter(del=>del.postId != item.postId)
        setComment(newArray)
        dispatch({
            type: "GENERATE_POPUP",
            payload: "success"
        })
    }


    return (
        <>
            <div className="comment">
                <p className="body">{item.body}</p>
                <p className="author">~{item.user.username}</p>
                {item.user.id==userData.id ? 
                <button className="b" onClick={()=> deleteHandler()}>Delete</button>
                :""}
            </div>
        </>
    )
}

export default PostComment