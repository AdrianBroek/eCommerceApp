import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "../actions/loginAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
        <section id="loginPage">
        <form  onSubmit={(e)=>submitHandler(e)}>
            <h2>Login to your Walmart account!</h2>
            <div className="email">
                <input type="text" onChange={mailCheck}/>
                <label for="email">Email</label>
            </div>
            <div className="password">
                <input type="text" onChange={passCheck}/>
                <label for="password">Password</label>
            </div>
            <button className="a" type="submit">Login</button>
            <button className="abutton b">
                <Link to="/register">Sign in</Link>
            </button>
        </form>
        {logged && (
            <div className="popup">
                <p>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </p>
                <p>You are <strong>logged</strong> in {userData.username}!</p>
                <Link className="abutton a" to='/my_account'>Got it!</Link>
            </div>
        )}
        </section>
    )
}

export default Login