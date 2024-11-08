import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import popupAction from "../actions/popupAction";

const CartItem = ({props}) => {
    const dispatch = useDispatch()
    const {item, open} = useSelector(state => state.cart)

    let prodata = props.product

    const deleteItem = () => {
        const newCartData = item.filter(items => prodata.id != items.product.id)
        dispatch({
            type: "UPDATE_CART",
            payload: {
                data: newCartData
            }
        })
        dispatch(popupAction('success'))
    }

    return (
        <div className="product-cart">
            <img loading="lazy" src={prodata.thumbnail}></img>
            <Link to={'/product/'+prodata.id}>{prodata.title}</Link>
            <button className="abutton" onClick={()=> deleteItem()}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )

}

export default CartItem

