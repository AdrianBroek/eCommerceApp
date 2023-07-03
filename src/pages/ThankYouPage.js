import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import registerAction from "../actions/registerAction";


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
    }
    

    useEffect(()=> {
        pushOrderToLocalStorage()
        // check if user in storage
        if(loggedStatus.logged){
            // if order in userData redux is empty
            if(loggedStatus.userData.order == null){
                // dispatch({
                //     type: "USER_ORDER_ADD",
                //     payload: orderData.id
                // })  
                // loggedStatus.userData  
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
        <>
            {orders.length > 0 ? 
            <>
                <p>Thank you for ordering {orderData.user.userData.firstname}!</p>
            </>
            :
            <><p>aaand what are u doing here?</p></>
            }
        </>
    )
}

export default ThankYouPage