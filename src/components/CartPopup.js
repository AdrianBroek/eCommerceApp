import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartPopup = ({props}) => {
    let product = props.product
    const dispatch = useDispatch()
    // console.log(product)
    return (
        <div id="cartPopup" >
            <h2>Product added to a cart!</h2>
            <button onClick={()=>dispatch({type: "CLOSE_POPUP"})}>x</button>
            <div className="flex">
                <img width='200px' src={product.thumbnail} />
                <p>{product.title}</p>
                <p><h3>{product.price}</h3> $</p>
            </div>
            <Link onClick={()=>dispatch({type: "CLOSE_POPUP"})} className="toCart" to="/cart">
                <FontAwesomeIcon icon={faCartShopping}/>
                To cart
            </Link>
        </div>

    )
}

export default CartPopup