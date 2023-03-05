import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerAction from "../actions/registerAction";
import testAvatar from '../images/avatar/text_avatar.png';
import {
    inputsValidate,
    containsUppercase,
    checkMail,
    checkPassw
} from '../components/inputValidate'

const Delivery = () => {

    const dispatch = useDispatch()

    const { logged, userData } = useSelector(state => state.loggedStatus)
    const [data, setData] = useState({
        username: userData ? userData.username : null,
        email: userData ? userData.email : null,
        firstname: userData ? userData.firstname : null,
        lastname: userData ? userData.lastname : null,
        password: userData ? userData.password : null,
        address: userData ? userData.address : null,
        id: userData.id
    })
    const [activePopup, setActivePopup] = useState({
        open: false,
        confirm: false,
        valid: false
    })
    const [info, setInfo] = useState()
    const [correctCheck, setCorrectCheck] = useState({
        username: false,
        firstname: false,
        lastname: false,
        email: false,
        address: false,
        password: false,
    })

    useEffect(()=> {
        // console.log(JSON.parse(localStorage.getItem('user')))
    }, [data])

    useEffect(()=> {
        if(logged){
            if(correctCheck.username && correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address){
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
        }else{
            if(correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address){
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
        }
        // console.log(activePopup)

    }, [correctCheck])


    function inputHandler(e){
        switch(e.target.id) {
            case "username" :
                setData((state) => ({...state, username: e.target.value}))
                break;
            case "firstname" :
                setData((state) => ({...state, firstname: e.target.value}))
                break;
            case "lastname" :
                setData((state) => ({...state, lastname: e.target.value}))
                break;
            case "email" :
                setData((state) => ({...state, email: e.target.value}))
                break;
            case "address" :
                setData((state) => ({...state, address: e.target.value}))
                break;
            case "password" :
                setData(state => ({...state, password: e.target.value}))
                break;
        }
    }

    function submitHandler (e){
        e.preventDefault();

        const inputs = document.querySelectorAll('input')
        inputs.forEach((element, index) => {
            
            if (element.value.length >= 6){
                // if has more than 5 letters - start
                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
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
                } else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }

                // check mail
                if (element.classList.contains("email")){
                    
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
                            console.log('chuj')
                            
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                firstname: false,
                            }))   
                            console.log(correctCheck)                         
                            console.log(activePopup)                         
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

    useEffect(()=> {
        // setActivePopup(state => ({...state}))
        // console.log(correctCheck)
    }, [inputHandler])

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

    useEffect(()=> {
        if(activePopup.confirm === true && activePopup.open === false && activePopup.valid === true) {
            (setActivePopup(prevState => ({
                ...prevState,
                open: false,
                confirm: false
            }))
            )
        }
    }, [activePopup])

    return (
        <section id="delivery" className="flex">
            {logged ? (
                <div>
                    <form onSubmit={submitHandler}>
                        <h2>Personal data for the order</h2>
                        <div className="username">
                            <input id="username" name="username" onChange={inputHandler} type="text" value={data.username} />
                            <label for="username">User name</label>
                        </div>
                        <div className="firstname">
                            <input id="firstname" name="firstname" onChange={inputHandler} type="text" value={data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input id="lastname" name="lastname" onChange={inputHandler} type="text" value={data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input className="email" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        <button onClick={confirm} type="submit">Verify</button>
                    </form>
                    {activePopup.open ? 
                    (
                        <div className="confirmation">
                            
                            {activePopup.valid ? 
                            <>
                                Your data is correct
                                <button className="close" onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>X</button>
                            </>
                            :
                            <>
                                Correct wrong inputs
                                <button className="close" onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>X</button>
                            </>
                            }
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <>
                <button style={{marginTop: '1rem'}} className="buttona a flex">
                    <Link to="/login">
                        Login to your account
                    </Link> 
                </button>
                <p>or order as a <b>guest</b></p>
                <div>
                    <form onSubmit={submitHandler}>
                        <h2>Order as a guest</h2>
                        {/* <div className="username">
                            <input id="username" name="username" onChange={inputHandler} type="text" value={data.username} />
                            <label for="username">User name</label>
                        </div> */}
                        <div className="firstname">
                            <input id="firstname" name="firstname" onChange={inputHandler} type="text" value={data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input id="lastname" name="lastname" onChange={inputHandler} type="text" value={data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input className="email" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        {/* <div className="password">
                            <input className="password" id="password" name="password" onChange={inputHandler} type="password" value={data.password} />
                            <label for="password">Password</label>
                        </div> */}
                        <button onClick={confirm} type="submit">Verify</button>                
                    </form>
                </div>
                </>
            )}
            {activePopup.open ? 
            (
                <div className="confirmation">
                    
                    {activePopup.valid ? 
                    <>
                        Your data is correct
                        <button className="close" onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>X</button>
                    </>
                    :
                    <>
                        Correct wrong inputs
                        <button className="close" onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>X</button>
                    </>
                    }
                </div>
            ) : (
                <></>
            )}
        </section>
    )
}

export default Delivery