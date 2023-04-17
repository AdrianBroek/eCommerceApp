import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from './CartItem';

const Cart = () => {
    const dispatch = useDispatch();
    const {item, open} = useSelector(state => state.cart)
    const overlay = useSelector(state => state.overlay)

    useEffect(()=> {
        if(overlay.open) {
            // dispatch({type: "OPEN_CART"})
        }
    }, [overlay])

    return (
        <section id='cart'>
            <FontAwesomeIcon onClick={() => dispatch({type: "OPEN_CART"})} icon={faCartShopping} />
            <p className='count'>{item.length}</p>
            {open && overlay.open && (
                <div className={item.length > 0 ? "open-cart" : "open-cart fill"}>
                    {item.map((el)=>(
                        <CartItem key={el.id} props={el}/>
                    ))}
                </div>
            )}
            {open && overlay.open && (
                <div className="cartSettings">
                    <button onClick={()=>dispatch({type: "CLEAR_ALL_PROD"})} className="clearCart">Clear all</button>
                    <Link onClick={()=>dispatch({type:"OPEN_CART"})} to='/cart'><button className="toCart">To cart</button></Link>
                </div>
            )}

        </section>
    )
}

export default Cart