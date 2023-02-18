import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import InCartItem from '../components/InCartItem'

const CartPage = () => {

    const [price, setPrice] = useState([])
    const {item, open} = useSelector(state => state.cart)
    const [sum, setSum] = useState()

    let proData = item[0]

    // useEffect(()=> {
    //     console.log(price)
    //     setSum(price.reduce((prevNm, nm) => prevNm + nm, 0))
    // }, [item, []])

    useEffect(()=> {
        // console.log(proData)
    }, [item, []])

    // let sum = price.reduce((prevNm, nm) => prevNm + nm, 0)


    
    return (
        <section id="cartPage">
            <div className="flex page-title">
                <h1>Your cart</h1>
            </div>
            <section id="products" className="flex">
                <div className="table">
                    <div className="quantity">Quantity</div>
                    <div className="image">Image</div>
                    <div className="prodname">Product name</div>
                    <div className="price">Price</div>
                    <div className="delete">Delete</div>
                </div>
                {item.map((product)=> (
                    <InCartItem  key={product.id} props={product}/>
                ))}
                {item.length > 0 ? 
                    <section>
                        <div className="table">
                            <div className="quantity">Quantity</div>
                            <div className="image">Image</div>
                            <div className="prodname">Product name</div>
                            <div className="price">{sum ? sum : ""}</div>
                            <div className="delete">Delete</div>
                        </div>
                    </section>
                :
                    <h5 className="page-title">Empty, add something.</h5>}
            </section>
        </section>
    )
}

export default CartPage