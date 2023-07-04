import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import registerAction from "../actions/registerAction";
// import testAvatar from '../images/avatar/text_avatar.png';
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
import { act } from "react-dom/test-utils";

const Delivery = () => {

    const dispatch = useDispatch()
    
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
        payment: delivery.payment ? delivery.payment : null,
        courier: delivery.courier ? delivery.courier : null,
        delivery: delivery.delivery ? delivery.delivery : null,
        agreement: delivery.agreement ? delivery.agreement : false,
        isSet: false
    })

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

    console.log(active)

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
            console.log('tak2')
        }
    }, [deliveryOption])

    useEffect(()=> {
        if (delivery.payment.type && delivery.courier.type && delivery.delivery.type && delivery.agreement.type){
            if(active.isSet) {
                setDeliveryOption(true)
                console.log('tak')
            }
        }
    }, [active.isSet])

    //////////////


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

    function submitHandler (e){
        e.preventDefault();

        // check inputs correct and set state correctCheck if it is
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
                <button style={{marginTop: '4rem'}} className="buttona a flex">
                    <Link to="/login">
                        Login to your account
                    </Link> 
                </button>
                <p>or order as a <b>guest</b></p>
                <div>
                    <form onSubmit={submitHandler}>
                        <h2>Order as a guest</h2>
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