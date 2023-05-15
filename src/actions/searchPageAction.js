import React from "react";
import axios from "axios";

const searchPageAction = (query) => async (dispatch) => {
    // console.log(query)
    const options = {
        method: "GET",
        url: `https://dummyjson.com/products/search?q=${query}&limit=5`
    }
    
    const data = await axios.request(options)
    .then(dispatch({type:"LOADED_SEARCH_RESULT"}))

    dispatch({
        type: "PUT_SEARCHPAGE_RESULT",
        payload: data.data.products,
        query: query
    })
}

export default searchPageAction