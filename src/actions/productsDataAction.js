import React from 'react'
import axios from 'axios'

// https://fakestoreapi.com/docs        <--api

const productsDataAction = () => async (dispatch) => {
    const options = {
        method: 'GET',
        url: 'https://dummyjson.com/products?limit=50',
    };

    const data = await axios.request(options)
    //   console.log(data)
    dispatch({
        type: "FETCH_PRODUCTS",
        payload: {
          data: data.data.products,
        }
    })
    
}

export default productsDataAction
