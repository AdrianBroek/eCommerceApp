import axios from "axios";
import React, { useEffect } from "react";

const productAction = (id) => async (dispatch) => {
    dispatch({type: "PRODUCT_RESET"})
    const options = {
        method: "GET",
        url: "https://fakestoreapi.com/products/"+id
    }

    const data = await axios.request(options)
    
    dispatch({type: "PRODUCT_RESET"})

    dispatch({
        type: "FETCH_PRODUCT",
        payload: {
            data: data
        }
    })
}

export default productAction