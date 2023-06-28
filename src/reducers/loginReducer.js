import React from "react";

const initState = {
    logged: false,
    userData: {
        username: '',
        firstname: "",
        lastname: "",
        id: '',
        email: '',
        address: '',
        password:'',
        order: [],
        avatar: '',
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
        case "USER_ORDER_ADD":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    order: [
                        action.payload
                    ]
                }
                
            }
        case "USER_LOGOUT":
            return {
                logged: false,
                userData: {
                    username: '',
                    firstname: "",
                    lastname: "",
                    id: '',
                    email: '',
                    address: '',
                    password:'',
                    order: [],
                    avatar: '',
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default login