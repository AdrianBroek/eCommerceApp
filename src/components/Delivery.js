import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import registerAction from "../actions/registerAction";
// import testAvatar from '../images/avatar/text_avatar.png';
import {
    inputsValidate,
    containsUppercase,
    checkMail,
    checkPassw,
    checkIfMailExist
} from '../functions/inputValidate'
import CustomInput from "./CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faMoneyBill, faStore, faTruck, faTruckDroplet, faTruckFast, faTruckField, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { faApplePay, faCcMastercard, faCcVisa, faDhl, faFacebook, faGooglePay } from "@fortawesome/free-brands-svg-icons"
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import popupAction from "../actions/popupAction";

const Delivery = () => {

    const dispatch = useDispatch()
    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)
    
    const { logged, userData } = useSelector(state => state.loggedStatus)

    const [data, setData] = useOutletContext();
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

    // delivery options
    const delivery = useSelector(state => state.delivery)
    
    // active delivery input detect
    const [active, setActive] = useState({
        payment: delivery.payment.type ? delivery.payment : false,
        courier: delivery.courier.type ? delivery.courier : false,
        delivery: delivery.delivery.type ? delivery.delivery : false,
        agreement: delivery.agreement.type ? delivery.agreement : false,
        isSet: false
    })

    const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false)
    const [existPasswordValid, setExistPasswordValid] = useState(false)

    // console.log(active.delivery)

    // update delivery options
    useEffect(()=> {
        dispatch({type: "CHANGE_COURIER_OPTION", payload: active.courier})
    }, [active.courier])

    useEffect(()=> {
        // console.log(active.payment)
        dispatch({type: "CHANGE_PAYMENT_OPTION", payload: active.payment})
    }, [active.payment])

    useEffect(()=> {
        // console.log(active.payment)
        dispatch({
            type: "CHANGE_DELIVERY_OPTION",
            payload: {
                type: active.delivery.type,
                cost: active.delivery.cost,
            }
        })
    }, [active.delivery])

    // if all active types are setted, set active.isSet to true
    useEffect(()=> {
        if (active.payment.type && active.agreement.type && active.delivery.type && active.courier.type && active.isSet == false){
            setActive((state => ({...state, isSet: true})))
        }
    }, [active])

    // console.log(active)

    useEffect(()=> {
        // console.log(active.payment)
        dispatch({type: "CHANGE_AGREEMENT_OPTION", payload: active.agreement})
    }, [active.agreement])


    // deliveryData set or not
    const [deliveryOption, setDeliveryOption] = useState(false)

    // totalData delivery
    useEffect(()=> {
        if(active.isSet) {
            dispatch({type: 'ORDER_DELIVERY_SET', payload: true})
        }
    }, [deliveryOption])

    useEffect(()=> {
        if (delivery.payment.type && delivery.courier.type && delivery.delivery.type && delivery.agreement.type){
            if(active.isSet) {
                setDeliveryOption(true)
            }
        }
    }, [active.isSet])

    //////////////

    // if correct inputs, dispatch personal data to redux
    useEffect(()=> {
        // if logged user
        if(logged){
            if(correctCheck.username && correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address){
                // totalData delivery
                dispatch({type: 'SET_PERSONAL_DATA', payload: data})
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
        // if guest and email exists
        else if(!logged && emailAlreadyInUse){
            if(correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address && correctCheck.password && existPasswordValidate){
                // totalData delivery
                dispatch({type: 'SET_PERSONAL_DATA', payload: data})
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
        // if guest
        else{
            if(correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address){
                // totalData delivery
                dispatch({type: 'SET_PERSONAL_DATA', payload: data})
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
                // if email already exists
                if(!checkIfMailExist(e.target.value) && e.target.classList.contains('guest')){
                    e.target.classList.add('email-used') 
                    setEmailAlreadyInUse(true)
                    dispatch(popupAction('info', 'This email address is already used, you can still purchase but you have to add correct password'))
                }else {
                    e.target.classList.remove('email-used')
                    setEmailAlreadyInUse(false)
                }
                setData((state) => ({...state, email: e.target.value}))
                break;
            case "address" :
                setData((state) => ({...state, address: e.target.value}))
                break;
            case "password" :
                setData(state => ({...state, password: e.target.value}))
                break;
            default : return setData(state => ({...state, password: e.target.value}))
        }
    }

    function submitHandler (e){
        e.preventDefault();

        // check inputs correct and set state correctCheck if it is
        const inputs = document.querySelectorAll('input')
        
        inputs.forEach((element, index) => {
            if (element.value.length >= 3){
                // if has more than 3 letters - start
                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
                    // element.style.border="2px solid green"
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
                    // console.log(element.value)
                    if (checkPassw(element.value) && existPasswordValidate){
                        element.style.border="2px solid green"
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            email: true,
                        }))
                    } else {
                        element.classList.add('wrong')
                        element.classList.add('exist')
                        dispatch(popupAction('error','Password is wrong'))
                        setTimeout(()=> {
                            element.classList.remove('wrong')
                            element.classList.remove('exist')
                        },[1000])
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            email: false,
                        }))
                    }
                    
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

    // inputs validate
    useEffect(()=> {
        inputsValidate()
    }, [inputHandler])

    // verify button on click
    function confirm(){
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


    // if password for guest existed mail is correct
    
    const existUser = JSON.parse(localStorage.getItem('user'))
    console.log(existUser)
    let existPasswordValidate = false
    if(existUser != null){
        const foundUser = existUser.filter(user => user.email == data.email)[0]
        // get password of that user
        if(foundUser){
        // check if password is correct
        existPasswordValidate = data.password == foundUser.password
        }
    }

    return (
        <section id="delivery" className="flex">
            {logged ? (
                <div>
                    <form novalidate="novalidate" onSubmit={submitHandler}>
                        <h2>Personal data for the order</h2>
                        <div className="username">
                            <input required novalidate id="username" name="username" onChange={inputHandler} type="text" value={data.username} />
                            <label for="username">User name</label>
                        </div>
                        <div className="firstname">
                            <input required novalidate id="firstname" name="firstname" onChange={inputHandler} type="text" value={data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input required novalidate id="lastname" name="lastname" onChange={inputHandler} type="text" value={data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input required novalidate className="email" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input required novalidate id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        <motion.button whileTap={{scale: .95}} onClick={confirm} type="submit">Verify</motion.button>
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
                <button style={{marginTop: '4rem'}} className="buttona a flex">
                    <Link to="/login">
                        Login to your account
                    </Link> 
                </button>
                <p>or order as a <b>guest</b></p>
                <div>
                    <form noValidate="noValidate" onSubmit={submitHandler}>
                        <h2>Order as a guest</h2>
                        <div className="firstname">
                            <input required novalidate id="firstname" name="firstname" onChange={inputHandler} type="text" value={data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input required novalidate id="lastname" name="lastname" onChange={inputHandler} type="text" value={data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input required novalidate className="email guest" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input required novalidate id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        {emailAlreadyInUse ? 
                        <div className="password">
                            <input type={passwordShown ? "text" : "password"} className="password" id="password" name="password" onChange={inputHandler} value={data.password} />
                            <label for="password">Password</label>
                            <div onClick={()=>setPasswordShown(!passwordShown)}>
                                {passwordShown ? 
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    :
                                    <FontAwesomeIcon icon={faEye}/>    
                                }
                            </div>
                        </div>
                        : ""}
                        <motion.button whileTap={{scale: .95}} onClick={confirm} type="submit">Verify</motion.button>                
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
            <section className="flex" id="delivery-options">
                <div className="container">
                <h2><FontAwesomeIcon icon={faTruck}/> Choose delivery option</h2>
                <div>
                    <h3>Payment method</h3>
                    <div className="pay-method">
                        <CustomInput name='VISA' value='VISA' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faCcVisa}/>
                        <CustomInput name='MasterCard' value='MasterCard' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faCcMastercard}/>
                        <CustomInput name='Google Pay' value='GooglePay' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faGooglePay}/>
                        <CustomInput name='Apple Pay' value='ApplePay' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faApplePay}/>
                        <CustomInput name='Personal collection' value='Personal collection' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faTruckFast}/>
                        <CustomInput name='Payment on delivery' value='Payment on delivery' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faMoneyBill}/>
                    </div>
                </div>
                <div>
                    <h3>Courier type</h3>
                    <div className="courier-method">
                        <CustomInput name='DPD' value='DPD' active={active.courier} setActive={setActive}/><FontAwesomeIcon icon={faTruckField}/>
                        <CustomInput name='DHL' value='DHL' active={active.courier} setActive={setActive}/><FontAwesomeIcon icon={faDhl}/>
                    </div>
                </div>
                <div>
                    <h3>Delivery method</h3>
                    <div className="pickup-method">
                        <CustomInput name='Collection point' value='Collection point' active={active.delivery} setActive={setActive} cost='25'/><FontAwesomeIcon icon={faStore}/>
                        <CustomInput name='BOX' value='BOX' active={active.delivery} setActive={setActive} cost='20'/><FontAwesomeIcon icon={faBoxesStacked}/>
                    </div>
                </div>
                
                <div>
                    <CustomInput name='Data processing agreement' value='agreement' active={active.agreement} setActive={setActive}/>
                </div>
                </div>
            </section>
        </section>
    )
}

export default Delivery