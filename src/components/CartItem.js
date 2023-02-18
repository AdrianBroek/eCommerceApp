import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"

import { useDispatch, useSelector } from "react-redux";

const CartItem = ({props}) => {
    const dispatch = useDispatch()
    const {item, open} = useSelector(state => state.cart)

    let prodata = props.product

    const deleteItem = () => {
        const newCartData = item.filter(items => prodata.id != items.product.id)
        dispatch({
            type: "DELETE_PROD",
            payload: {
                data: newCartData
            }
        })
    }

    return (
        <div className="product-cart">
            <img src={prodata.image}></img>
            <p>{prodata.title}</p>
            <button className="abutton" onClick={()=> deleteItem()}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )

}

export default CartItem

