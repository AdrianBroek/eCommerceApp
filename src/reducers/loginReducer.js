import React from "react";

// const userData = window.localStorage.getItem('user')
// const user = JSON.parse(userData)

const initState = {
    logged: false,
    userData: {
        username: '',
        firstname: "",
        lastname: "",
        id: '',
        email: '',
        address: '',
        password:''
    }
}

const login = (state = initState, action) => {
    switch(action.type){
        case "USER_LOGIN":
            return {
                ...state,
                logged: true,
                userData: action.payload
            }
        case "USER_REGISTER":
            return {
                ...state,
                userData: action.payload
            }
        case "USER_LOGOUT":
            return {
                ...state,
                logged: false,
            }
        default:
            return {
                ...state
            }
    }
}

export default login