import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion} from 'framer-motion'
import {CartPopupAnim} from '../animations'
import loaderGif from '../images/loaderGif.gif'

const CartPopup = ({props}) => {
    let product = props.product
    const dispatch = useDispatch()
    const [loadImg, setLoadImg] = useState(false)
    // console.log(product)
    return (
        <motion.div 
        variants={CartPopupAnim} animate='show' initial='hidden' exit="exit"
        id="cartPopup" >
            <h2>Product added to a cart!</h2>
            <button onClick={()=>dispatch({type: "CLOSE_POPUP"})}>x</button>
            <div className="flex">
                <div className="image flex">
                    <img loading="lazy" onLoad={()=>setLoadImg(true)}
                    src={loadImg ? product.thumbnail : loaderGif} />
                </div>
                <p>{product.title}</p>
                <p><h3>{product.price}</h3> $</p>
            </div>
            <Link onClick={()=> dispatch({type: "CLOSE_POPUP"})} className="toCart" to="/cart">
                <FontAwesomeIcon icon={faCartShopping}/>
                To cart
            </Link>
        </motion.div>

    )
}

export default CartPopup