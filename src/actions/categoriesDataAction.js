import React from "react";
import axios from "axios";

const categoriesDataAction = () => async (dispatch) => {
    const options = {
        method: "GET",
        url: 'https://dummyjson.com/products/categories'
    }

    const data = await axios.request(options);
    // console.log(data)
    dispatch({
        type: "FETCH_CATEGORIES",
        payload: {
            data: data.data
        }
    })
}

export default categoriesDataAction
