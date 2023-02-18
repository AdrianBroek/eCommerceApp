import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../actions/productAction";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import sendToCart from '../actions/sendToCart'
import Loader from '../components/Loader'

const ProductPage = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state => state.productData)
    const [prodCount, setProdCount] = useState(0)

    useEffect(()=>{
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(productAction(linkDone))
        console.log(data)
        console.log(prodCount)
    }, [])

    useEffect(()=>{
        console.log(prodCount)
    }, [prodCount])

    function minusHandler(){
        if (prodCount > 0) {
            setProdCount(prodCount - 1)
        }else {
            setProdCount(0)
        }
    }

    return (
        <>
        {isLoading && (
            <section id={'product'+data.id} className="productPage">
            <div className="breadcrumbs">
                <p><Loader /></p>
            </div>
            <div className="box">
                <div className="left">
                    <div className="prod-image">
                        <Loader />
                    </div>
                </div>
                <div className="right">
                    <p><Loader /></p>
                </div>
            </div>
            <div className="description">
                <p><Loader /></p>
            </div>
        </section>

        )}
        {data && !isLoading && (
            <section id={'product'+data.id} className="productPage">
                <div className="breadcrumbs">
                    <p>{data.category}</p>
                </div>
                <div className="box">
                    <div className="left">
                        <div className="prod-image">
                            <img src={data.image} />
                        </div>
                        {/* <p>{data.rating.count}</p>
                        <p>{data.rating.rate}</p> */}
                    </div>
                    <div className="right">
                        <p>{data.title}</p>
                        <p className="price">{data.price} $</p>
                        <div className="prodCount">
                            <input maxLength={1} value={prodCount} type="number" />
                            <div className="buttonHolder">
                                <button onClick={()=>setProdCount(prodCount + 1)} className="plus"><FontAwesomeIcon icon={faPlus} /></button>
                                <button onClick={()=>minusHandler()} className="minus"><FontAwesomeIcon icon={faMinus} /></button>
                            </div>         
                        </div>
                        <button className="addToCart" onClick={() => dispatch(sendToCart(data, prodCount))}>Add to cart<FontAwesomeIcon icon={faCartShopping} /></button>
                    </div>
                </div>
                <div className="description">
                    <p>{data.description}</p>
                </div>
            </section>
        )}
        </>
    )
}

export default ProductPage