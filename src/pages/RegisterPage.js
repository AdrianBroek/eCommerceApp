import React, { useEffect, useState, useRef } from "react";
import registerAction from "../actions/registerAction";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { Link, Navigate } from "react-router-dom";
import {
    inputsValidate,
    containsUppercase,
    checkMail,
    checkPassw
} from '../components/inputValidate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import popupAction from "../actions/popupAction";
import InputHelper from "../components/InputHelper";

const RegisterPage = () => {

    const [input, setInput] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        id: uuid(),
        address: ''
    })

    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)

    const [activePopup, setActivePopup] = useState({
        open: false,
        confirm: false,
        valid: false
    })
    const [correctCheck, setCorrectCheck] = useState({
        username: false,
        firstname: false,
        lastname: false,
        email: false,
        address: false,
        password: false,
    })

    useEffect(()=> {
        if(correctCheck.username && correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address && correctCheck.password){
            setActivePopup(prevState => ({
                ...prevState,
                valid: true
            }))
        }
        // console.log(correctCheck)
    }, [correctCheck])

    const dispatch = useDispatch()


    function inputHandler(e,name){
        e.preventDefault();

        switch(name){
            case "username":
                setInput(prevState => ({
                    ...prevState,
                    username: e.target.value
                }))
                break;
            case "firstname":
                setInput(prevState => ({
                    ...prevState,
                    firstname: e.target.value
                }))
                break;
            case "lastname":
                setInput(prevState => ({
                    ...prevState,
                    lastname: e.target.value
                }))
                break;
            case "password":
                setInput(prevState => ({
                    ...prevState,
                    password: e.target.value
                }))
                break;
            case "email":
                setInput(prevState => ({
                    ...prevState,
                    email: e.target.value
                }))
                break;
            case "address":
                setInput(prevState => ({
                    ...prevState,
                    address: e.target.value
                }))
                break;
        }
    }

    // validate
    useEffect(()=> {
        inputsValidate()
    }, [inputHandler])

    function confirm(){
        // console.log('confirm')
        setActivePopup(state => ({
            ...state,
            open: true
        }))
    }

    // if active popup valid is true and confirm is true then send registerAction
    useEffect(()=> {
        if(activePopup.confirm === true && activePopup.open === false && activePopup.valid === true) {
            dispatch(registerAction(input))
            .then(
                setActivePopup(prevState => ({
                    ...prevState,
                    open: false,
                    confirm: false,
                    valid: false,
                }))
            )
            .then(
                setCorrectCheck(prevState => ({
                    username: false,
                    firstname: false,
                    lastname: false,
                    email: false,
                    address: false,
                    password: false,
                }))
            )
            .then(
                setInput(prevState => ({
                    ...prevState,
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                address: ''
                }))
            )
            .then (
                dispatch(popupAction('success'))
            )
        } else if (activePopup.confirm === false && activePopup.open === true && activePopup.valid === false)  {
            dispatch(popupAction('error'))
        }
    }, [activePopup])

    function submitHandler (e){
        e.preventDefault();

        const inputs = document.querySelectorAll('input')
        inputs.forEach((element, index) => {
            // console.log(element)
            if (element.value.length >= 3){
                // if has more than 5 letters - start
                
                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
                    // console.log(element)
                    element.style.border="2px solid green"
                    // console.log(element.id)
                    switch(element.id){
                        case "username": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                username: true,
                            }))                            
                            break
                        }
                        case "firstname": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                firstname: true,
                            }))                            
                            break
                        }
                        case "lastname": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                lastname: true,
                            }))                            
                            break
                        }
                        case "email": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: true,
                            }))                           
                            break
                        }
                        case "address": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                address: true,
                            }))                             
                            break
                        }
                        case "password": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                password: true,
                            }))                            
                            break
                        }
                        default :
                            return setCorrectCheck(prevState => ({...prevState}))
                    }
                } else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }

                if (element.classList.contains("email")){
                    // check mail

                    // console.log(element.value)
                    if (checkMail(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            email: true,
                        }))  
                    }else {
                        element.style.border="2px solid red"
                        element.classList.add('wrong')
                        setTimeout(()=> {
                            element.classList.remove('wrong')
                        },[1000])
                    }
                }
                if (element.classList.contains("password")){
                    // check passw

                    // console.log(element.value)
                    if (checkPassw(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            password: true,
                        })) 
                    } else {
                        element.style.border="2px solid red"
                        element.classList.add('wrong')
                        setTimeout(()=> {
                            element.classList.remove('wrong')
                        },[1000])
                    }
                }
            } else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }
        });
    }

    //input helper
    const [finput, setFinput] = useState()

    function setFocusInput (e){
        setFinput(e.target.id)
        console.log(finput)
    }

    return (
        <section id="registerPage">
            <form novalidate="novalidate" onSubmit={submitHandler}>
                <div className="input-helper-container">
                    {finput ? 
                        <InputHelper activeInput={finput}/>
                    : "" }
                </div>
                <h2>Register a Walmart account!</h2>
                <div className="name">
                    <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate onChange={(e)=>inputHandler(e,'username')} value={input.username} type="text" id="username" name="username"/>
                    <label htmlFor="username">username</label>
                </div>
                <div className="name">
                    <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'firstname')} value={input.firstname} type="text" id="firstname"/>
                    <label htmlFor="firstname">firstname</label>
                </div>
                <div className="name">
                    <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'lastname')} value={input.lastname} type="text" id="lastname"/>
                    <label htmlFor="lastname">lastname</label>
                </div>
                <div className="password">
                    <input className="password" onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'password')} value={input.password} id="password" type={passwordShown ? "text" : "password"}/>
                    <label htmlFor="password">password</label>
                    <div onClick={()=>setPasswordShown(!passwordShown)}>
                        {passwordShown ? 
                            <FontAwesomeIcon icon={faEyeSlash}/>
                            :
                            <FontAwesomeIcon icon={faEye}/>    
                        }
                    </div>
                </div>
                <div className="email">
                    <input className="email" onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'email')} value={input.email} id="email" type="text"/>
                    <label htmlFor="email">email</label>
                </div>
                <div className="address">
                    <input className="address" onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'address')} value={input.address} id="address" type="text"/>
                    <label htmlFor="address">address</label>
                </div>
                <button className="abutton a" onClick={confirm}>Register</button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                {activePopup.open ? 
                (
                    <div className="confirmation">
                        Is your data correct?
                        <button disabled={activePopup.valid ? false : true} onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>Yes</button>
                        <button onClick={() => setActivePopup(prevState => ({...prevState, confirm: false, open: false}))}>No, let me fix it</button>
                    </div>
                ) : (
                <></>
            )}
            </form>
        </section>
    )
}

export default RegisterPage