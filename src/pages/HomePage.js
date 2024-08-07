import React, {useEffect, useRef, useState, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux'
import productsDataAction from '../actions/productsDataAction'
import categoriesDataAction from '../actions/categoriesDataAction'
import Products from '../components/Products'
import CategorySquare from '../components/CategorySquare'
import '../styles/app.scss'
import { Link } from "react-router-dom";
import popupAction from "../actions/popupAction"
// slider
import Slider from "react-slick";
// banner images
import baner1 from '../images/home page baner/letter_14-min.jpg'
import baner2 from '../images/home page baner/pin_12-min.jpg'
import baner3 from '../images/home page baner/tormarch19-min.jpg'
import baner4 from '../images/home page baner/laptop_12-min.jpg'

import ProductSlider from '../components/ProductSlider'

import { motion } from "framer-motion";
import { categorySquareHomePageAnim } from "../animations";

function HomePage() {
    const dispatch = useDispatch();
    const productSliderCount = 5;

    useEffect(()=> {
      dispatch(productsDataAction())
      dispatch(categoriesDataAction())
    },[dispatch])

    const {dataCat, isLoadingCat} = useSelector(state => state.categories)
    // slider
    const [sliderInit, setSliderInit] = useState(false)
    const sliderRef = useRef();
    const sliderRef2 = useRef();
    //slider main options 
    const settings = useMemo(() => ({
      asNavFor: sliderRef2.current,
      slidesToShow: 1,
      dots: true,
      arrows: false,
      speed: 400,
  }), []);

  //slider nav options
  const settings2 = useMemo(() => ({
    asNavFor: sliderRef.current,
    slidesToShow: 3,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4500,
  }), []);

  const [showAllCat, setShowAllCat] = useState(false)

  return (
    <div id="home-page">
        <section className="promoBaner">
          <div className="baner-nav-container flex">
            <Slider onInit={()=>setSliderInit(true)} {...settings2} ref={sliderRef2}>
              <img 
                src={baner1} 
              />
              <img 
                src={baner2} 
              />
              <img 
                src={baner3} 
              />
              <img 
                src={baner4} 
              />
            </Slider>
          </div>
          
          <div className="baner-container">
            <Slider {...settings} ref={sliderRef} >
                  <img 
                    src={baner1} />
                  <img 
                    src={baner2} />
                  <img 
                    src={baner3} />
                  <img 
                    src={baner4} />
            </Slider>
          </div>
        </section>
        
        <section className="hp-categories">
          <h2 className="page-title flex">
            Categories
            <Link className="link" to="/category"> - go to categories page!</Link>
          </h2>
          <motion.div 
            className={showAllCat ? "categories-list visible" : "categories-list"}
            variants={categorySquareHomePageAnim}
            initial="hidden"
            animate={showAllCat ? "show" : 'hidden'}
          >
            {!isLoadingCat && dataCat.map((el, index) => (
                <CategorySquare key={index} cat={el} />
            ))}
            <div onClick={()=>setShowAllCat(!showAllCat)}
            className={showAllCat ? "hideCat flex visible" : "hideCat flex "}>
              <button>{showAllCat ? "Hide" : "Show more"}</button>
            </div>
          </motion.div>
        </section>
        <section className="product-sliders">
          {dataCat.map((cat, index) => {
            if (productSliderCount > index) {
              return <ProductSlider key={cat.slug} url={cat.slug} />;
            } else {
              return null;
            }
          })}
        </section> 
    </div>
  );
}

export default HomePage;
