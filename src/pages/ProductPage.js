import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../actions/productAction";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import sendToCart from '../actions/sendToCart'
import Loader from '../components/Loader'
import ProductSlider from "../components/ProductSlider";
// slider
import Slider from "react-slick";

const ProductPage = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state => state.productData)
    const {item} = useSelector(state => state.cart)
    const [prodCount, setProdCount] = useState(1)
    const [error, setError] = useState(false)
    //main image src
    const [imgSrc, setImgSrc] = useState(false)

    // slider
    const sliderRef = useRef();
    const sliderRef2 = useRef();

    //slider nav options 
    const settings = {
        // dots: true,
        infinite: false,
        // speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // arrows: true,
        // touchMove: true,
        // variableWidth: true,
        draggable: true,
        // centerMode: true,
        asNavFor: sliderRef2.current,
        focusOnSelect: true
    }

    //slider main options
    const settings2 = {
        // dots: false,
        infinite: false,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: sliderRef.current
        // arrows: true,
        // touchMove: true,
        // variableWidth: true,
        
    }

    useEffect(()=>{
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(productAction(linkDone))
    }, [])

    function minusHandler(){
        if (prodCount > 0) {
            setProdCount(prodCount - 1)
        }else {
            setProdCount(0)
        }
    }

    useEffect(()=> {
        if(prodCount){
            setError(false)
        }
    }, [addToCart])

    function addToCart(){
        if(prodCount){
            dispatch(sendToCart(data, prodCount, item))
        }else{
            setError(true)
        }
    }

    function changeImage(src){
        setImgSrc(src)
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
                            {/* <img src={imgSrc ? imgSrc : data.images[0]} /> */}
                            <Slider {...settings2} ref={sliderRef2} >
                                {data.images.map((src)=> (
                                    <div>
                                        <img 
                                        width="300px"
                                        src={src} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="images">
                            <Slider {...settings} ref={sliderRef}>
                                {data.images.map((src)=> (
                                    <div 
                                    className={src == imgSrc ? 'active imageContainer' : 'imageContainer'}
                                    // onClick={(e) => changeImage(src)}
                                    >
                                        <img 
                                        width="70px" 
                                        src={src} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        {/* <p>{data.rating.count}</p>
                        <p>{data.rating.rate}</p> */}
                    </div>
                    <div className="right">
                        <p>{data.title}</p>
                        <p>Brand: {data.brand}</p>
                        <p className="price">{data.price} $</p>
                        <p className="rating">Rating: {data.rating}</p>
                        <div className="prodCount">
                            <input maxLength={1} value={prodCount} type="number" />
                            <div className="buttonHolder">
                                <button onClick={()=>setProdCount(prodCount + 1)} className="plus"><FontAwesomeIcon icon={faPlus} /></button>
                                <button onClick={()=>minusHandler()} className="minus"><FontAwesomeIcon icon={faMinus} /></button>
                            </div>         
                        </div>
                        <button className="addToCart" onClick={() => addToCart()}>Add to cart<FontAwesomeIcon icon={faCartShopping} /></button>
                        {error ? <div className="error flex"><p>Count must be at least <b>1</b></p><div className="close" onClick={()=> setError(false)}><FontAwesomeIcon icon={faCircleXmark} /></div></div> : ""}
                    </div>
                </div>
                <div className="description">
                    <p>{data.description}</p>
                </div>
                
            </section>
        )}
        <section className="similar-products">
            <ProductSlider url={data.category}/>
        </section>
        </>
    )
}

export default ProductPage