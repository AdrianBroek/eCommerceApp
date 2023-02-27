import React from "react";
import { useSelector, useDispatch } from "react-redux";

const OrderPage = () => {

    const {totalPrice, items} = useSelector(state => state.totalCart)



    return (
        <section id="orderPage" className="flex">
            <div id="orderStep" className="flex">
                <p className="step st flex">
                    Step: 1
                </p>
                <p className="step nd flex">
                    Step: 2
                </p>
                <p className="step rd flex">
                    Step: 3
                </p>
            </div>
            <h2>Your order</h2>
            <table>
                {items && items.map((prod)=> (
                    <tr>
                        <td>{prod.product.title}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.product.price}</td>
                    </tr>
                    ))}
                   <tr className="totalPrice">
                    <td></td>
                    <td>TotalPrice: </td>
                    <td>{totalPrice}</td>
                    </tr>
            </table>
            <button className="a">Next</button>
        </section>
    )
}

export default OrderPage