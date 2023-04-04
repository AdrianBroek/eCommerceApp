import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import InCartItem from '../components/InCartItem'
import { useDispatch } from "react-redux";
import sendTotalData from "../actions/sendTotalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CartPage = () => {
    const dispatch = useDispatch()
    const {item, open} = useSelector(state => state.cart)
    const {totalPrice} = useSelector(state => state.totalCart)

    function countSum(){
        let tablicaCen = []
        console.log(tablicaCen)
        item.forEach(element => {
            let sumka = element.product.price * element.quantity
            tablicaCen.push(sumka)
        });
        return tablicaCen
        
    }
    let sumData = countSum()
    const totalSum = sumData.reduce((prevNm, nm) => prevNm + nm, 0)

    useEffect(()=> {
        dispatch(sendTotalData(item, totalSum))
    }, [item])

    return (
        <section id="cartPage">
            <div className="flex page-title">
                <h1>Your cart</h1>
            </div>
            <section className="cartContainer">
                <section id="products" className="flex">
                    <div className="table">
                        <div className="quantity">Quantity</div>
                        <div className="image">Image</div>
                        <div className="prodname">Product name</div>
                        <div className="price">Price</div>
                        <div className="delete">Delete</div>
                    </div>
                    {item.map((product)=> (
                        <InCartItem key={product.id} props={product}/>
                    ))}
                    {item.length > 0 ? 
                        <div className="table">
                            <div className="quantity"></div>
                            <div className="image"></div>
                            <div className="prodname"></div>
                            <div className="price">{totalPrice} $</div>
                            <div className="delete"></div>
                        </div>
                    :
                        <p className="page-title"><FontAwesomeIcon icon={faCircleInfo} /> Empty, add something.</p>}
                </section>
            </section>
            {item.length > 0 ? 
            <Link className="abutton b" to="/order/products">Make an order</Link>
            :
            <Link className="abutton b off" to="/order/products">Make an order</Link>

            }
        </section>
    )
}

export default CartPage