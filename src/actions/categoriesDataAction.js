import React from "react";
import axios from "axios";

const categoriesDataAction = () => async (dispatch) => {
    const options = {
        method: "GET",
        url: 'https://fakestoreapi.com/products/categories'
    }

    const data = await axios.request(options);

    dispatch({
        type: "FETCH_CATEGORIES",
        payload: {
            data: data.data
        }
    })
}

export default categoriesDataAction
