import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Order = ({id}) => {
    const [order, setOrder] = useState()
    const {orders} = useSelector(state => state.orders)

    function filtreOrders() {
        const singleOrder = orders.filter(state=> state.id == id)
        setOrder(singleOrder[0])
        console.log(singleOrder[0])
    }

    useEffect(()=> {
        filtreOrders()
    }, [])

    return (
        <section className="order">
            {order && (
                <>
                <div className="id flex">
                    <p>Order ID: </p>
                    <p>{order.id}</p>
                </div>
                <div className="status flex">
                    <p>Delivery status: </p>
                    <p>{order.deliveryStatus}</p>
                </div>
                <hr />
                <div className="products flex">
                    {order.products.map((product)=> (
                        <div className="product">
                            <img width="50px" src={product.product.thumbnail} />
                            <p className="quantity">{product.quantity}</p>
                            <div className="title">
                                <h4>{product.product.title}</h4>
                                <p className="brand">{product.product.brand}</p>
                            </div>
                            <h4 className="prod-price">{product.product.price} $</h4>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="info flex">
                    <div className="flex">
                        <p>Order payment:</p>
                        <h4>{order.delivery.payment.type}</h4>
                    </div>
                    <div className="flex">
                        <p>Order courier:</p>
                        <h4>{order.delivery.delivery.type}</h4>
                    </div>
                    <div className="flex">
                        <p>Order address:</p>
                        <h4>{order.user.userData.address}</h4>
                    </div>
                    <div className="flex">
                        <p>Total:</p>
                        <h2>{order.totalPrice}</h2>
                    </div>
                </div>
                </>
            )}
            
        </section>
    )
}

export default Order