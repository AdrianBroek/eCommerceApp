import React from "react";
import axios from "axios"

const blogTagAction = (url) => async (dispatch) => {
    const options = {
        url: 'https://dummyjson.com/posts?tag='+url,
        method: "POST"
    }

    const data = await axios.request(options)
    console.log(data)
    console.log('jestem')
    dispatch({
        type: "SET_ACTIVE_TAG_POSTS",
        payload: data.data
    })
}

export default blogTagAction