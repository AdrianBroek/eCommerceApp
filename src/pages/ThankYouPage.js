import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import registerAction from "../actions/registerAction";
import gandalf from '../images/gandalf-you-shall-not-pass.gif'
import thankYou from '../images/thank-you.png'

const ThankYouPage = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.orders)
    
    const orderData = orders[orders.length-1]
    const loggedStatus = useSelector(state => state.loggedStatus)
    function pushOrderToLocalStorage(){
        // get what is in local storage
        const oldOrders = JSON.parse(localStorage.getItem('orders')) || []
        // push new order from action
        oldOrders.push(orderData)
        // set local storage to what is in local storage + new one
        localStorage.setItem('orders', JSON.stringify(oldOrders))
        dispatch({type: "ORDER_RESET"})
    }
    
    
    useEffect(()=> {
        pushOrderToLocalStorage()
        // check if user in storage
        if(loggedStatus.logged){
            // if order in userData redux is empty
            if(loggedStatus.userData.order == null){
                dispatch(registerAction({
                    username: loggedStatus.userData.username,
                    firstname: loggedStatus.userData.firstname,
                    lastname: loggedStatus.userData.lastname,
                    id: loggedStatus.userData.id,
                    email: loggedStatus.userData.email,
                    address: loggedStatus.userData.address,
                    password: loggedStatus.userData.password,
                    order: [
                        orderData.id
                    ],
                    avatar: loggedStatus.userData.avatar
                }))
                
       
            }else {
                // if not empty, add another order ID to the array
                let array = loggedStatus.userData.order
                array.push(orderData.id)
                dispatch(registerAction(loggedStatus.userData))
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
                    <p>Thank you for ordering {orderData.user.userData.firstname}!</p>
                    <p>You will find information about your order on your account section</p>
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