import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import sendToCart from '../actions/sendToCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import CartPopup from './CartPopup';
import productAction from '../actions/productAction';

const Products = ({props}) => {
    const dispatch = useDispatch()
    const {item} = useSelector(state => state.cart)

    return (
        <div className='product'>
            <div onClick={() => dispatch(productAction(props.id))} className='imageContent'>
                <Link to={"/product/"+props.id}>
                    <img src={props.image} />
                </Link>
                <p className='rating'>{props.rating.rate}</p>
            </div>
            <h2 onClick={() => dispatch(productAction(props.id))} className='title'><Link to={"/product/"+props.id}>{props.title.length >= 50 ? props.title.substring(0,54) + '...' : props.title}</Link></h2>
            <div className='items'>
                <p className='brand'>{props.category}</p>
            </div>
            <p className='description' dangerouslySetInnerHTML={{__html: props.description}}></p>

            <div className='price'>
                <p>{props.price} <span>$</span></p>
            </div>
            <div className='addToCart'>
                <button onClick={() => dispatch(sendToCart(props, 1, item))}><FontAwesomeIcon icon={faCartPlus} />Add to Cart</button>
            </div>
        </div>
    )
}

export default Products