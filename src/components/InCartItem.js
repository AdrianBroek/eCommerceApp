import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"

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
            <section className="product">
                <div>
                    {props.quantity}
                </div>
                <div>
                    <img src={prodata.image} height='auto' width='80px'></img>
                </div>
                <div>
                    {prodata.title}
                </div>
                <div>
                    {prodata.price} $
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