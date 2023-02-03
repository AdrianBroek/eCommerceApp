import React from 'react'
import axios from 'axios'

// https://fakestoreapi.com/docs        <--api

const productsDataAction = () => async (dispatch) => {
    const options = {
        method: 'GET',
        url: 'https://fakestoreapi.com/products?limit=50',
    };

    const data = await axios.request(options)
      
    dispatch({
        type: "FETCH_PRODUCTS",
        payload: {
          data: data.data,
        }
    })
    
}

export default productsDataAction
