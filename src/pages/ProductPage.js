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
// prod image slider
import ProductImageSlider from "../components/ProductImageSlider";
import AdditionalInfo from "../components/AdditionalInfo";
import { motion, LayoutGroup } from "framer-motion";
import popupAction from '../actions/popupAction'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ProductPage = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state => state.productData)
    const {item} = useSelector(state => state.cart)
    const [prodCount, setProdCount] = useState(1)
    const [error, setError] = useState(false)
    //main image src
    const [imgSrc, setImgSrc] = useState(false)
    // product image slider
    const [prodImageState, setProdImageState] = useState(false)
    const [navigationEnabled, setNavigationEnabled] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [imageLoad, setImageLoaded] = useState(false);

    // Reset thumbsSwiper, gdy data.images jest puste lub się zmienia
    useEffect(() => {
        if (!data.images || data.images.length === 0) {
            setThumbsSwiper(null);
        }
    }, [data.images]);

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

    useEffect(()=> {
        return ()=> {
            setThumbsSwiper(null)
        }
    }, [addToCart])

    function addToCart(){
        if(prodCount){
            dispatch(sendToCart(data, prodCount, item))
        }else{
            setError(true)
            dispatch(popupAction('error'))
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
                            <Swiper
                                observer={true}
                                observeParents={true}
                                spaceBetween={10}
                                navigation={navigationEnabled}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs]}
                                className="mySwiper2"
                                lazy={true}
                                onLazyImageReady={() => setNavigationEnabled(true)}
                            >
                                {data.images.map((src,index)=> (
                                    <SwiperSlide key={index}>
                                        <motion.img 
                                            onLoad={()=>setImageLoaded(true)}
                                            width="1500px"
                                            loading="lazy"
                                            onClick={()=> setProdImageState(true)}
                                            src={src} 
                                            initial={{ opacity: 0 }} 
                                            animate={imageLoad ? {opacity: 1} : {opacity: 0}}
                                        />
                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* nav */}
                        <div className="images">
                            <Swiper
                                modules={[Thumbs]}
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress
                                className="mySwiper"
                                lazy={true}
                            >
                                {data.images.map((src,index)=> (
                                    <SwiperSlide key={index}>
                                        <div
                                            className={src == imgSrc ? 'active imageContainer' : 'imageContainer'}
                                            onClick={(e) => changeImage(src)}
                                        >
                                            <img loading="lazy" width="70px" src={src} />
                                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="prod-name">{data.title}</h1>
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
                    </div>
                </div>
                <LayoutGroup>
                    <AdditionalInfo name="Description">
                        <hr />
                        <p>{data.description}</p>
                    </AdditionalInfo >
                    <AdditionalInfo name="Delivery cost">
                        <hr />
                        <p>Collection point 25$</p>
                        <hr />
                        <p>BOX 20$</p>
                    </AdditionalInfo>
                </LayoutGroup>
            </section>
        )}
        {data.images && prodImageState && (
            <ProductImageSlider setProdImageState={setProdImageState} images={data.images}/>
        )}
        
        <section className="similar-products">
            <ProductSlider url={data.category}/>
        </section>
        </>
    )
}

export default ProductPage