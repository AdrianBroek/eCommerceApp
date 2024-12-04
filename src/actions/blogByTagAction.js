import axios from "axios"

const blogByTagAction = (tag) => async (dispatch) => {
    const options = {
        method: "GET",
        url: `https://dummyjson.com/posts/tag/${tag}`
    }
    const data = await axios.request(options)
    // console.log(tag)
    dispatch({
        type: "SET_ACTIVE_TAG",
        payload: tag
    })
    dispatch({
        type: "GET_BLOGS",
        payload: data.data.posts
    })
    dispatch({type:"LOADED_BLOG_LIST"})
    // console.log(data)
}

export default blogByTagAction