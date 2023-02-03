import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartPopup = ({props}) => {

    const dispatch = useDispatch()

    return (
        <div id="cartPopup" >
            <h2>Product added to a cart!</h2>
            <button onClick={()=>dispatch({type: "CLOSE_POPUP"})}>x</button>
            <div className="flex">
                <img width='200px' src={props.image} />
                <p>{props.title}</p>
                <p><h3>{props.price}</h3> $</p>
            </div>
            <Link onClick={()=>dispatch({type: "CLOSE_POPUP"})} className="toCart" to="/cart">
                <FontAwesomeIcon icon={faCartShopping}/>
                To cart
            </Link>
        </div>

    )
}

export default CartPopup