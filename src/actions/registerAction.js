import React, { useEffect } from "react";
import uuid from "react-uuid";

const registerAction = (props) => async (dispatch) => {
    const data = await props
    // console.log(props)
    const oldAccs = JSON.parse(localStorage.getItem('user')) || []
    
    function checkIfEditData(){
        const dataId = oldAccs.filter(item => item.id != data.id)
        return dataId
    }

    const newAccs = checkIfEditData()

    newAccs.push(data)

    localStorage.setItem('user', JSON.stringify(newAccs));

    // localStorage.setItem('user', JSON.stringify(oldAccs));

    dispatch({
        type: "USER_REGISTER",
        payload: {
            username: data.username,
            lastname: data.lastname,
            firstname: data.firstname,
            id: data.id,
            email: data.email,
            address: data.address,
            password: data.password,
            avatar: data.avatar,
            order: data.order
        }
    })
}

export default registerAction