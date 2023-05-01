import React from "react";
import axios from "axios";

const searchAction = (query) => async (dispatch) => {

    const options = {
        method: "GET",
        url: `https://dummyjson.com/products/search?q=${query}&limit=5`
    }

    const data = await axios.request(options);

    dispatch({
        type: "GET_SEARCH_RESULT",
        payload: data.data.products
    })
}

export default searchAction