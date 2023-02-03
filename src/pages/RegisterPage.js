import React, { useEffect, useState } from "react";
import registerAction from "../actions/registerAction";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

const RegisterPage = () => {

    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        id: uuid(),
        address: ''
    })

    // console.log(window.localStorage.getItem('user'))

    const dispatch = useDispatch()

    function usernameInputHandler(e){
        setInput(prevState => ({
            ...prevState,
            username: e.target.value
        }))
    }
    function passwordInputHandler(e){
        setInput(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }
    function emailInputHandler(e){
        setInput(prevState => ({
            ...prevState,
            email: e.target.value
        }))
    }
    function addressInputHandler(e){
        setInput(prevState => ({
            ...prevState,
            address: e.target.value
        }))
    }

    function detectSubmit(e){
        e.preventDefault();
        setInput(prevState => ({
            ...prevState,
            id: uuid()
        }))
    }

    return (
        <form id="registerPage" onSubmit={(e) => detectSubmit(e)}>
            <p>Register a Walmart account!</p>
            <input onChange={usernameInputHandler} type="text" placeholder="username"/>
            <input onChange={passwordInputHandler} type="text" placeholder="password"/>
            <input onChange={emailInputHandler} type="text" placeholder="email"/>
            <input onChange={addressInputHandler} type="text" placeholder="address"/>
            <button onClick={() => dispatch(registerAction(input))}>Register</button>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
    )
}

export default RegisterPage