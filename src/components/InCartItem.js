import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

const InCartItem = ({props}) => {
    const dispatch = useDispatch()
    const {item} = useSelector(state => state.cart)

    let prodata = props.product

    // useEffect(()=> {
    //     // console.log(item)
    //     // console.log(prodata.id)
    //     setPrice(prevPrice => [
    //         ...prevPrice,
    //         props.price
    //     ])
    // }, [])

    let link = "/product/" + prodata.id

    const deleteItem = () => {
        const newCartData = item.filter(items => prodata.id != items.product.id)
        
        dispatch({
            type: "UPDATE_CART",
            payload: {
                data: newCartData
            }
        })
    }

    const [prodQty, setProdQty] = useState(props.quantity)

    useEffect(()=> {
        if (prodQty >= 1){
            props.quantity = prodQty
            console.log(prodQty)
            console.log(props.quantity)
        }

    }, [prodQty])

    function plusQuantity(){
        if (prodQty >= 1){
            setProdQty(prodQty+1)
        }
    }

    function minusQuantity(){
        if (prodQty > 1){
            setProdQty(prodQty-1)
        }
    }


    return (
        <section className="product">
            <div className="quantity">
                <button onClick={ ()=> plusQuantity() } className="plus"><FontAwesomeIcon icon={faPlus} /></button>
                {prodQty}
                <button onClick={ ()=> minusQuantity() } className="minus"><FontAwesomeIcon icon={faMinus} /></button>
            </div>
            <div>
                <img src={prodata.image} height='auto' width='80px'></img>
            </div>
            <div>
                <Link to={link}>
                {prodata.title}
                </Link>
            </div>
            <div>
                {prodata.price} $
            </div>
            <div className="del">
                <button className="a" onClick={()=> deleteItem()}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </section>
    )
}

export default InCartItem