import axios from "axios"

const PostAction = (url) => async (dispatch) => {
    const options = {
        method: "GET",
        url: "https://dummyjson.com/posts/" + url
    }

    console.log(url)

    const data = await axios.request(options)

    dispatch({
        type: "SET_ACTIVE_POST",
        payload: data.data
    })
}   

export default PostAction