import axios from "axios"

const blogAction = () => async (dispatch) =>{
    const options = {
        method: "GET",
        url: "https://dummyjson.com/posts"
    }
    const data = await axios.request(options)


    dispatch({
        type: "GET_BLOGS",
        payload: data.data
    })
    .then(dispatch({type:"LOADED_BLOG_LIST"}))
    // console.log(data)
}

export default blogAction