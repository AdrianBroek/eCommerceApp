import React, { useEffect } from "react";
import { useSelector } from "react-redux";


const ThankYouPage = () => {
    const {orders} = useSelector(state => state.orders)
    
    const orderData = orders[orders.length-1]

    function checkIfEditData(oldOrders){
        const dataId = oldOrders.filter(item => item.id != orderData.id)
        // return dataId
        console.log(dataId)
        console.log(orderData.id)
    }

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
    }, [orderData])
    
    return (
        <>
            {orders.length > 0 ? 
            <>
                
                <p>Thank you for ordering {orderData.user.userData.firstname}!</p>
            </>
            :
            <><p>and what are u doing here? ;P</p></>
            }
        </>
    )
}

export default ThankYouPage