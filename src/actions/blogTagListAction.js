import axios from "axios"

const blogTagListAction = () => async (dispatch) => {
    const options = {
        method: "GET",
        url: 'https://dummyjson.com/posts/tag-list'
    }
    const data = await axios.request(options)

    dispatch({
        type: "SET_TAG_LIST",
        payload: data.data
    })
    dispatch({type:"LOADED_TAG_LIST"})
    // console.log(data)
}

export default blogTagListAction