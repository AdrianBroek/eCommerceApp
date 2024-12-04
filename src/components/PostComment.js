import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import popupAction from "../actions/popupAction"
import { AnimatePresence, motion } from "framer-motion";

const PostComment = ({setComment, comment, item}) => {
    const {userData, logged} = useSelector(state=>state.loggedStatus)
    const dispatch = useDispatch()

    useEffect(()=> {
        console.log(comment)
    }, [])

    function deleteHandler(){
        const newArray = comment.comments.filter(del=>del.postId != item.postId)
        // setComment(newArray)
        setComment(prevState => ({
            ...prevState,
            comments: newArray
        }))
        dispatch(popupAction('success', 'comment deleted'))
    }


    return (
        <motion.div className="comment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="body">{item.body}</p>
            <p className="author">~{item.user.username}</p>
            {item.user.id==userData.id ? 
                <button className="b" onClick={()=> deleteHandler()}>Delete</button>
            :""}
        </motion.div>
    )
}

export default PostComment