import React from "react";
import { useSelector } from "react-redux";
import { sumPay } from "../functions/sumPay";

const Summary = () => {

    const {totalPrice, items, personalData } = useSelector(state => state.totalCart)
    const {logged} = useSelector(state => state.loggedStatus)
    const delivery = useSelector(state => state.delivery)

    return (
        <section id="summaryOrder" className="flex">
            <form>
                <h2>Personal informations</h2>
                {logged ? (
                    <div className="username">
                        <input className="off"  id="username" name="username" type="text" value={personalData.username} />
                        <label for="username">User name</label>
                    </div>
                )
                :
                ''}
                <div className="firstname">
                    <input id="firstname" name="firstname" className="off" type="text" value={personalData.firstname} />
                    <label for="firstname">First name</label>
                </div>
                <div className="lastname">
                    <input id="lastname" name="lastname" className="off"   type="text" value={personalData.lastname} />
                    <label for="lastname">Last name</label>
                </div>
                <div className="email">
                    <input className="email off" id="email" name="email"  type="text" value={personalData.email} />
                    <label for="email">Email</label>
                </div>
                <div className="address">
                    <input id="address" name="address" className="off"  type="text" value={personalData.address} />
                    <label for="address">Address</label>
                </div>
                <h2>Delivery method</h2>
                <div className="deliveryTable">
                    <p>Courier method: <span>{delivery.courier.type}</span></p>
                    <p>Delivery method: <span>{delivery.delivery.type}</span></p>
                    {/* <p>Courier method:{delivery.agreement}</p> */}
                    <p>Payment method:<span>{delivery.payment.type}</span></p>
                </div>
                <h2>Ordered items</h2>
                <section className="productsTable flex">
                        <div className="flex th">
                            <div><p></p></div>
                            <div><p>Product</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Price 1-pcs.</p></div>
                        </div>
                        {items.length > 0 ?
                        <>
                            {items.map((product) => (
                                <div className="product flex">
                                    <div><img src={product.product.thumbnail} loading="lazy"/></div>
                                    <div><p>{product.product.title.length >= 20 ? product.product.title.substring(0,24) + '...' : product.product.title}</p></div>
                                    <div><p>{product.quantity}</p></div>
                                    <div><p>{product.product.price} $</p></div>
                                </div>
                            ))}
                        </>
                        :
                            <p>Empty</p>  
                        }
                </section>
                <h2>Payment summary</h2>
                <section className="paysumTable flex">
                {totalPrice.length > 0 ?
                    <>
                        <p>Price products: <span>{totalPrice} $</span></p>
                    </>
                    :
                        <p>-</p>  
                }
                {delivery.delivery.cost ?
                    <>
                        <p>Delivery cost: <span>{delivery.delivery.cost} $</span></p>
                    </>
                    :
                        '' 
                }
                {delivery.delivery.cost && totalPrice.length > 0 && (
                <p><strong>To pay: </strong><span><strong>{sumPay(delivery.delivery.cost, totalPrice)} $</strong></span></p>

                )}
                </section>
            </form>
        </section>
    )
}

export default Summary