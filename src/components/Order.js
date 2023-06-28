import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Order = ({id}) => {
    const [order, setOrder] = useState()
    console.log(id)
    const {orders} = useSelector(state => state.orders)

    

    function filtreOrders() {
        const singleOrder = orders.filter(state=> state.id == id)
        setOrder(singleOrder[0])
        console.log(singleOrder[0])
    }

    useEffect(()=> {
        filtreOrders()
        console.log(order)
    }, [])

    return (
        <section>
            {order && (
                <p>Products: 
                    {order.products.map((product)=> (
                        <p>{product.product.title}</p>
                    ))}
                </p>
            )}
            
        </section>
    )
}

export default Order