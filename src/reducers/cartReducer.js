import React from "react"

const initState = {
    item: [

    ],
    open: false,
    popup: {
        op: false,
        prod: null,
    }
}

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case "SEND_PRODUCTS":
            return {
                ...state,
                item: [
                    ...state.item,
                    action.payload,
                ],
                popup: {
                    op: true,
                    prop: action.payload
                }
            }
        case "CLOSE_POPUP": 
            return {
                ...state,
                popup: {
                    op: false
                }
            }

        case "OPEN_CART":
            return {
                ...state,
                open: !state.open,
            }
        case "DELETE_PROD":
            return {
                ...state,
                item: action.payload.data,
            }
        case "CLEAR_ALL_PROD":
            return {
                ...state,
                item: [

                ]
            }
        default :
            return {...state}
    }
}

export default cartReducer

