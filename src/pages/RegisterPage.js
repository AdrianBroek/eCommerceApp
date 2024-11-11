import React, { useEffect, useState, useRef } from "react";
import registerAction from "../actions/registerAction";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { Link, Navigate } from "react-router-dom";
import {
    inputsValidate,
    containsUppercase,
    checkMail,
    checkPassw,
    checkIfMailExist
} from '../functions/inputValidate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import popupAction from "../actions/popupAction";
import InputHelper from "../components/InputHelper";
import { motion } from "framer-motion";

const RegisterPage = () => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        id: uuid(),
        address: ''
    })

    //input helper
    const [finput, setFinput] = useState()
    function setFocusInput (e){
        setFinput(e.target.id)
        // console.log(finput)
    }

    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)

    // validation
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

    // if every input is correct -> set activePopup.valid to true
    useEffect(()=> {
        if(correctCheck.username && correctCheck.firstname && 
            correctCheck.lastname && correctCheck.email && 
            correctCheck.address && correctCheck.password){
            setActivePopup(prevState => ({
                ...prevState,
                valid: true
            }))
        }else {
            setActivePopup(prevState => ({
                ...prevState,
                valid: false
            }))
        }
        // console.log(correctCheck)
    }, [correctCheck])

    // set inputs value
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

    // validate inputs just for border color and animation
    useEffect(()=> {
        inputsValidate(true)
    }, [inputHandler])

    // after register click, popup set to open
    // function confirm(){
    //     // console.log('confirm')
    //     setActivePopup(state => ({
    //         ...state,
    //         open: true
    //     }))
    // }
    function confirm() {
        setActivePopup((state) => ({
            ...state,
            open: true,
        }));
    }

    // Aktualizacja efektu po zmianie inputu
    useEffect(() => {
        // Uruchom sprawdzenie poprawności, jeśli dane uległy zmianie
        submitHandler(); // Upewnia się, że wszystkie pola są aktualne
    }, [input]);

    // after submit (register click) validate all of the inputs
    // and then set correct check if input is valid
    function submitHandler (e){
        // e.preventDefault();
        if (e) e.preventDefault();
        // check inputs correct and set state correctCheck if it is
        const inputs = document.querySelectorAll('input')
        
        inputs.forEach((element, index) => {
            if (element.value.length >= 3){
                // if has more than 3 letters - start
                
                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
                    // console.log(element.value)
                    element.style.border="2px solid green"
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
                
                    // check passw
                    if (element.classList.contains("password")){
                        console.log(element.value)
                        // console.log(correctCheck)
                        // console.log(activePopup)
                        if (checkPassw(element.value)){
                            element.style.border="2px solid green"
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: true,
                            }))
                        } else {
                            element.style.border="2px solid red"
                            element.classList.add('wrong')
                            setTimeout(()=> {
                                element.classList.remove('wrong')
                            },[1000])
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: false,
                            }))
                        }
                    }
                    // check mail
                    if (element.classList.contains("email")){
                        if (checkMail(element.value) && checkIfMailExist(element.value) == true){
                            element.classList.remove('wrong')
                            element.style.border="2px solid green"
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: true,
                            }))  
                        }else {
                            dispatch(popupAction('error','Email has already been registered'))
                            element.style.border="2px solid red"
                            element.classList.add('wrong')
                            setTimeout(()=> {
                                element.classList.remove('wrong')
                            },[1000])
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: false,
                            })) 
                        }
                    }
                }else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    // change correctCheck state for wrong inputs as well
                    switch(element.id){
                        case "username": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                username: false,
                            }))                            
                            break
                        }
                        case "firstname": {
                            
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                firstname: false,
                            }))                          
                            break
                        }
                        case "lastname": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                lastname: false,
                            }))                            
                            break
                        }
                        case "email": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: false,
                            }))                           
                            break
                        }
                        case "address": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                address: false,
                            }))                      
                            break
                        }
                        case "password": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                password: false,
                            }))                      
                            break
                        }
                        default :
                            return setCorrectCheck(prevState => ({...prevState}))
                    }
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }
            } else {
                element.style.border="2px solid red"
                element.classList.add('wrong')
                // change correctCheck state for wrong inputs as well
                switch(element.id){
                    case "username": {
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            username: false,
                        }))                            
                        break
                    }
                    case "firstname": {
                        
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            firstname: false,
                        }))                          
                        break
                    }
                    case "lastname": {
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            lastname: false,
                        }))                            
                        break
                    }
                    case "email": {
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            email: false,
                        }))                           
                        break
                    }
                    case "address": {
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            address: false,
                        }))                      
                        break
                    }
                    default :
                        return setCorrectCheck(prevState => ({...prevState}))
                }
                setTimeout(()=> {
                    element.classList.remove('wrong')
                },[1000])
            }
        });
    }

    // after register click, active popups run and this logic starts
    useEffect(()=> {
        console.log('start')
        console.log(activePopup)
        // if user confirms that data is correct *click yes*
        // if activepopup is closed and inputs are valid then register user
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
            // then reset correctCheck state
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
            // then reset input state
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
            // then set popup with success type
            .then (
                dispatch(popupAction('success'))
            )
        } 
        // else if (activePopup.confirm === false && activePopup.open === true && activePopup.valid === false && !checkIfMailExist(input.email))  {
        //     dispatch(popupAction('error','Email has already been registered'))
        // }
    }, [activePopup])


    return (
        <section id="registerPage">
            <form noValidate="noValidate" onSubmit={submitHandler}>
                <div className="input-helper-container">
                    {finput ? 
                        <InputHelper activeInput={finput}/>
                    : "" }
                </div>
                <h2>Register a Walmart account!</h2>
                <div className="name">
                    <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required noValidate onChange={(e)=>inputHandler(e,'username')} value={input.username} type="text" id="username" name="username"/>
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
                <div className="name">
                    <input className="email" onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'email')} value={input.email} id="email" type="text"/>
                    <label htmlFor="email">email</label>
                </div>
                <div className="address">
                    <input className="address" onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required onChange={(e)=>inputHandler(e,'address')} value={input.address} id="address" type="text"/>
                    <label htmlFor="address">address</label>
                </div>
                <motion.button whileTap={{scale: .95}} className="abutton a" onClick={confirm}>Register</motion.button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                {activePopup.open ? 
                (
                    <div className="confirmation">
                        Is your data correct?
                        {/* <button disabled={activePopup.valid ? false : true} onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>Yes</button> */}
                        <button
                            disabled={activePopup.valid ? false : true}
                            onClick={() => {
                                // Sprawdź poprawność przed rejestracją
                                if (activePopup.valid) {
                                    setActivePopup((prevState) => ({
                                        ...prevState,
                                        confirm: true,
                                        open: false,
                                    }));
                                }
                            }}
                        >
                            Yes
                        </button>
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