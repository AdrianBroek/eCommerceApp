import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import registerAction from "../actions/registerAction";
import gandalf from '../images/gandalf-you-shall-not-pass.gif'
import thankYou from '../images/thank-you.png'
import { checkIfMailExist } from "../components/inputValidate";

const ThankYouPage = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.orders)
    
    const orderData = orders[orders.length-1]
    const loggedStatus = useSelector(state => state.loggedStatus)
    
    // get user from localstorage by email (email cannot be duplicated so its like id)
    const userFromOrder = JSON.parse(localStorage.getItem('user')).filter(user => user.email == orderData.user.userData.email)
    const singleUser = userFromOrder[0]

    function pushOrderToLocalStorage(){
        // get what is in local storage
        const oldOrders = JSON.parse(localStorage.getItem('orders')) || []
        // push new order from action
        oldOrders.push(orderData)
        // set local storage to what is in local storage + new one
        localStorage.setItem('orders', JSON.stringify(oldOrders))
        dispatch({type: "ORDER_RESET"})
        dispatch({type: "SET_PERSONAL_DATA", payload: false})
    }
    
    
    useEffect(()=> {
        // push order to storage
        pushOrderToLocalStorage()
        // check if user in storage
        if(singleUser){
            // if order in storage is empty
            if(singleUser.order == null){
                console.log(singleUser)
                console.log('order is empty in storage')
                dispatch(registerAction({
                    username: singleUser.username,
                    firstname: singleUser.firstname,
                    lastname: singleUser.lastname,
                    id: singleUser.id,
                    email: singleUser.email,
                    address: singleUser.address,
                    password: singleUser.password,
                    order: [
                        orderData.id
                    ],
                    avatar: singleUser.avatar
                }))
                
            }else {
                // if not empty, add another order ID to the array and update user with new order
                let arrayOfOrders = singleUser.order
                arrayOfOrders.push(orderData.id)
                console.log(arrayOfOrders)
                console.log(singleUser)
                console.log('order isnt empty so we should add')
                dispatch(registerAction({
                    username: singleUser.username,
                    firstname: singleUser.firstname,
                    lastname: singleUser.lastname,
                    id: singleUser.id,
                    email: singleUser.email,
                    address: singleUser.address,
                    password: singleUser.password,
                    order: arrayOfOrders,
                    avatar: singleUser.avatar
                }))
            }
        }

    }, [orderData])

    return (
        <section id="thankYou-page">
            {orders.length > 0 && orderData.user.userData ? 
                <div className="success flex">
                    <div className="gif">
                        <img src={thankYou}/>
                    </div>
                    {singleUser ?
                        // if user registered
                        <>
                        <p>Thank you for ordering {orderData.user.userData.firstname}!</p>
                        {checkIfMailExist(orderData.user.email) && !orderData.user.registered ? 
                            // if user has already account but ordered as a guest
                            <p>We see that you are already <strong>registered</strong> but ordered as a <strong>guest</strong>, so you will find information about your order on your <strong>account</strong> section</p>
                            :
                            // if user logged 
                            <p>You will find information about your order on your <strong>account</strong> section</p>                        }
                        </>
                        : 
                        // if user not registered
                        <>
                        <p>Thank you for ordering {orderData.user.userData.firstname}!</p>
                        <p>You will find information about your order on your <strong>e-mail</strong></p>
                        </>
                    }
                    </div>
            :
                <div className="gif">
                        <img src={gandalf}/>
                </div>
            }
        </section>
    )
}

export default ThankYouPage