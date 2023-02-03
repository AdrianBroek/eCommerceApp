import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"

import { useDispatch, useSelector } from "react-redux";

const CartItem = ({props}) => {
    const dispatch = useDispatch()
    const {item, open} = useSelector(state => state.cart)

    const deleteItem = () => {
        const newCartData = item.filter(items => props.id != items.id)
        dispatch({
            type: "DELETE_PROD",
            payload: {
                data: newCartData
            }
        })
    }

    return (
        <div className="product-cart">
            <img src={props.image}></img>
            <p>{props.title}</p>
            <button onClick={()=> deleteItem()}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )

}

export default CartItem

