import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "../actions/loginAction";
import { Link } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const {logged, userData} = useSelector(state => state.loggedStatus)

    const [data, setData] = useState({
        mail: "",
        password: "",
        id: ""
    })

    useEffect(()=> {
        if (data.id){
            dispatch(loginAction(data))
        }
        
    },[data.id])

    const storage = JSON.parse(window.localStorage.getItem('user'))

    function mailCheck(e){
        setData(prevState => ({
            ...prevState,
            mail:e.target.value
        })
        )
    }

    function passCheck(e){
        setData(prevState => ({
            ...prevState,
            password:e.target.value
        })
        )
    }

    function checkData(){
        let loggedUser = storage.filter(item => 
            item.password == data.password
            &&
            item.email == data.mail
        )
        if (loggedUser.length > 0) {
            setData(prevState => ({
                ...prevState,
                id: loggedUser[0].id
                
            }))
        }
    }

    function submitHandler(e){
        e.preventDefault()
        checkData()
    }

    return (
        <>
        <form id="loginPage" onSubmit={(e)=>submitHandler(e)}>
            <p>Login to your Walmart account!</p>
            <input type="text" placeholder="email" onChange={mailCheck}/>
            <input type="text" placeholder="pass" onChange={passCheck}/>
            <button type="submit">Login</button>
            <Link to="/register">Sign in</Link>
        </form>
        {logged && (
            <div className="popup">
                <p>You are logged in {userData.mail}!</p>
            </div>
        )}
        </>
    )
}

export default Login