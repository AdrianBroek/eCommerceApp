import React from "react";

const loginAction = (props) => async (dispatch) => { 

    const data = await props

    const userData = JSON.parse(localStorage.getItem('user'))

    dispatch({
        type: "USER_LOGIN",
        payload: data
    })

    if(data) {
        const usedUser = userData.filter(item => item.id == data.id)[0]
        console.log(usedUser)
        dispatch({
            type: "USER_REGISTER",
            payload: {
                username: usedUser.username,
                firstname: usedUser.firstname,
                lastname: usedUser.lastname,
                id: usedUser.id,
                email: usedUser.email,
                address: usedUser.address,
                password: usedUser.password
            }
        })
    }
}

export default loginAction