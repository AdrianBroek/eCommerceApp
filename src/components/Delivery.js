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
import CustomInput from "./CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faMoneyBill, faStore, faTruck, faTruckDroplet, faTruckFast, faTruckField, faTruckPickup } from "@fortawesome/free-solid-svg-icons";
import { faApplePay, faCcMastercard, faCcVisa, faDhl, faFacebook, faGooglePay } from "@fortawesome/free-brands-svg-icons"
import { useOutletContext } from "react-router-dom";

const Delivery = () => {

    const dispatch = useDispatch()
    
    const { logged, userData } = useSelector(state => state.loggedStatus)
    const totalCart = useSelector(state => state.totalCart)
    //here
    const [data, setData] = useOutletContext();
    console.log(data)
    // const [data, setData] = useState({
    //     username: userData ? userData.username : totalCart.personalData.username,
    //     email: userData ? userData.email : totalCart.personalData.email,
    //     firstname: userData ? userData.firstname : totalCart.personalData.firstname,
    //     lastname: userData ? userData.lastname : totalCart.personalData.lastname,
    //     password: userData ? userData.password : totalCart.personalData.password,
    //     address: userData ? userData.address : totalCart.personalData.address,
    //     id: userData.id
    // })
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

    // delivery options
    const delivery = useSelector(state => state.delivery)
    const [active, setActive] = useState({
        payment: null,
        courier: null,
        delivery: null,
        agreement: false,
    })

    // update delivery options
    useEffect(()=> {
        dispatch({type: "CHANGE_DELIVERY_OPTION", payload: active.courier})
    }, [active.courier])
    useEffect(()=> {
        // console.log(active.payment)
        dispatch({type: "CHANGE_COURIER_OPTION", payload: active.payment})
    }, [active.payment])
    useEffect(()=> {
        // console.log(active.payment)
        dispatch({type: "CHANGE_PAYMENT_OPTION", payload: active.delivery})
    }, [active.delivery])
    useEffect(()=> {
        // console.log(active.payment)
        dispatch({type: "CHANGE_AGREEMENT_OPTION", payload: active.agreement})
    }, [active.agreement])

    // totalData delivery
    useEffect(()=> {
        if (delivery != null){
            if (delivery.payment && delivery.courier && delivery.delivery && delivery.agreement){
                dispatch({type: "SET_DELIVERY_DATA", payload: delivery})
            }
        }
        
    }, [active])

    // check json data
    useEffect(()=> {
        // console.log(JSON.parse(localStorage.getItem('user')))
    }, [data])

    useEffect(()=> {
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
        }else{
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

    // here
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
            default : return setData(state => ({...state, password: e.target.value}))
        }
    }

    useEffect(()=> {
        if(totalCart.personalData){
            dispatch({
                type: 'SET_PERSONAL_DATA',
                payload: data
            })
        }
        console.log(data)
    }, [data])

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

    useEffect(()=>{
        console.log(activePopup)
    }, [activePopup])

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
                        {/* here */}
                        <div className="firstname">
                            <input id="firstname" name="firstname" onChange={inputHandler} type="text" value={totalCart.personalData.firstname ? totalCart.personalData.firstname : data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input id="lastname" name="lastname" onChange={inputHandler} type="text" value={totalCart.personalData.lastname ? totalCart.personalData.lastname : data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input className="email" id="email" name="email" onChange={inputHandler} type="text" value={totalCart.personalData.email ? totalCart.personalData.email : data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input id="address" name="address" onChange={inputHandler} type="text" value={totalCart.personalData.address ? totalCart.personalData.address : data.address} />
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
            <section className="flex" id="delivery-options">
                <div className="container">
                <h2><FontAwesomeIcon icon={faTruck}/> Choose delivery option</h2>
                <div>
                    <h3>Payment method</h3>
                    <div className="pay-method">
                        <CustomInput name='VISA' value='visa' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faCcVisa}/>
                        <CustomInput name='MasterCard' value='mastercard' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faCcMastercard}/>
                        <CustomInput name='Google Pay' value='GPay' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faGooglePay}/>
                        <CustomInput name='Apple Pay' value='APay' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faApplePay}/>
                        <CustomInput name='Personal collection' value='p-collection' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faTruckFast}/>
                        <CustomInput name='Payment on delivery' value='p-delivery' active={active.payment} setActive={setActive}/><FontAwesomeIcon icon={faMoneyBill}/>
                    </div>
                </div>
                <div>
                    <h3>Courier type</h3>
                    <div className="courier-method">
                        <CustomInput name='DPD' value='dpd' active={active.courier} setActive={setActive}/><FontAwesomeIcon icon={faTruckField}/>
                        <CustomInput name='DHL' value='dhl' active={active.courier} setActive={setActive}/><FontAwesomeIcon icon={faDhl}/>
                    </div>
                </div>
                <div>
                    <h3>Delivery method</h3>
                    <div className="pickup-method">
                        <CustomInput name='Collection point' value='collection_point' active={active.delivery} setActive={setActive}/><FontAwesomeIcon icon={faStore}/>
                        <CustomInput name='BOX' value='box' active={active.delivery} setActive={setActive}/><FontAwesomeIcon icon={faBoxesStacked}/>
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