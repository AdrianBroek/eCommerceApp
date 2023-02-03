import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../actions/productAction";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import sendToCart from '../actions/sendToCart'
import Loader from '../components/Loader'

const ProductPage = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state => state.productData)

    useEffect(()=>{
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(productAction(linkDone))
        console.log(data)
    }, [])

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
                        <button onClick={() => dispatch(sendToCart(data))}>Add to cart<FontAwesomeIcon icon={faCartShopping} /></button>
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