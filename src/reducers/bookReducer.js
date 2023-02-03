import React from "react";

const initState = {
    autor: ['lej'],
    tytuł: []
}

const booksReducer = (state = initState, action) => {
    switch(action.type) {
        case "FETCH_BOOKS":
            return {
                ...state,
                autor: action.payload.author,
                tytuł: action.payload.tytuł
            }
        case "CHANGE_AUTHOR":
            return {
                ...state,
                autor: action.payload.author
            }
        case "CHANGE_TITLE":
            return {
                ...state,
                tytuł: action.payload.tytuł
            }
        default: 
            return {...state}
    }
}

export default booksReducer