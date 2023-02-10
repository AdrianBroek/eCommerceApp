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
        <section id="registerPage">
            <form onSubmit={(e) => detectSubmit(e)}>
                <h2>Register a Walmart account!</h2>
                <div className="name">
                    <input onChange={usernameInputHandler} type="text"/>
                    <label htmlFor="username">username</label>
                </div>
                <div className="password">
                    <input onChange={passwordInputHandler} type="text"/>
                    <label htmlFor="password">password</label>
                </div>
                <div className="email">
                    <input onChange={emailInputHandler} type="text"/>
                    <label htmlFor="email">email</label>
                </div>
                <div className="address">
                    <input onChange={addressInputHandler} type="text"/>
                    <label htmlFor="address">address</label>
                </div>
                <button className="abutton a" onClick={() => dispatch(registerAction(input))}>Register</button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </form>
        </section>
    )
}

export default RegisterPage