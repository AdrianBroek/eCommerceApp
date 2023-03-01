import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import InCartItem from '../components/InCartItem'
import { useDispatch } from "react-redux";
import sendTotalData from "../actions/sendTotalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faForwardStep, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OrderProducts = () => {
    const dispatch = useDispatch()
    const {item, open} = useSelector(state => state.cart)
    const {totalPrice, edit} = useSelector(state => state.totalCart)

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
        console.log('change')
        dispatch(sendTotalData(item, totalSum))
    }, [item])


    return (
        <section>
            <div className="flex page-title">
                <h1>Your order</h1>
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
                            <div className="quantity">
                                <button onClick={()=> dispatch({type: "EDIT_TOTAL_DATA", payload: !edit})} className="a edit flex"><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                            </div>
                            <div className="image"></div>
                            <div style={{textAlign: 'right'}} className="prodname">Total price: </div>
                            <div className="price">{totalPrice} $</div>
                            <div className="delete"></div>
                        </div>
                        :
                        <p className="page-title"><FontAwesomeIcon icon={faCircleInfo} /> Empty, add something.</p>
                    }
                </section>
            </section>
        </section>
    )
}

export default OrderProducts