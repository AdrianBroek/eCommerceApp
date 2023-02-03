import React from "react";

const initState = {
    data: [],
    isLoading: true
}

export const productsReducer = (state = initState, action) => {
    switch(action.type){
        case "FETCH_PRODUCTS":
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case "LOADING_PRODUCTS":
            return {
                ...state,
                isLoading: true
            }
        default:
            return {...state}
    }
}