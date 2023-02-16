import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"

const InCartItem = ({props, price, setPrice}) => {
    const dispatch = useDispatch()
    const {item} = useSelector(state => state.cart)

    useEffect(()=> {
        console.log(price)
        setPrice(prevPrice => [
            ...prevPrice,
            props.price
        ])
    }, [])


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
            <section className="product">
                <div>
                    quantity
                </div>
                <div>
                    <img src={props.image} height='auto' width='80px'></img>
                </div>
                <div>
                    {props.title}
                </div>
                <div>
                    {props.price} $
                </div>
                <div className="del">
                    <button onClick={()=> deleteItem()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </section>
    )
}

export default InCartItem