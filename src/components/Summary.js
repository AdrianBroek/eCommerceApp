import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import InCartItem from "./InCartItem";

const Summary = () => {

    const {totalPrice, items, delivery, personalData } = useSelector(state => state.totalCart)
    const {logged} = useSelector(state => state.loggedStatus)




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
                    <p>Courier method: <span>{delivery.courier}</span></p>
                    <p>Delivery method: <span>{delivery.delivery}</span></p>
                    {/* <p>Courier method:{delivery.agreement}</p> */}
                    <p>Payment method:<span>{delivery.payment}</span></p>
                </div>
                <h2>Ordered items</h2>
                <section className="productsTable flex">
                        <div className="flex th">
                            <div><p></p></div>
                            <div><p>Product</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Price</p></div>
                        </div>
                        {items.length > 0 ?
                        <>
                            {items.map((product) => (
                                <div className="product flex">
                                    <div><img src={product.product.thumbnail} /></div>
                                    <div><p>{product.product.title.length >= 20 ? product.product.title.substring(0,24) + '...' : product.product.title}</p></div>
                                    <div><p>{product.quantity}</p></div>
                                    <div><p>{product.product.price}</p></div>
                                </div>
                            ))}
                        </>
                        :
                            <p>Empty</p>  
                        }
                </section>
            </form>
        </section>
    )
}

export default Summary