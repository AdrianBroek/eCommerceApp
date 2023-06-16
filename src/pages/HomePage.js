import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
import booksAction from "../actions/bookAction";
import changeAuthor from "../actions/changeAuthorAction";
import changeTitle from "../actions/changeTitleAction";
import productsDataAction from '../actions/productsDataAction'
import categoriesDataAction from '../actions/categoriesDataAction'
import Products from '../components/Products'
import CategorySquare from '../components/CategorySquare'
import '../styles/app.scss'
import { Routes , Route, useLocation, Link } from "react-router-dom";
// slider
import Slider from "react-slick";
// banner images
import baner1 from '../images/home page baner/letter_14-min.jpg'
import baner2 from '../images/home page baner/pin_12-min.jpg'
import baner3 from '../images/home page baner/tormarch19-min.jpg'
import baner4 from '../images/home page baner/payment-min.jpg'

import ProductSlider from '../components/ProductSlider'

function HomePage() {
    const dispatch = useDispatch();

    useEffect(()=> {
      dispatch(productsDataAction())
      dispatch(categoriesDataAction())
    },[dispatch])

    const {dataCat, isLoadingCat, activeCategory} = useSelector(state => state.categories)
    const {autor, tytuł} = useSelector(state => state.books)
      // slider
      const sliderRef = useRef();
      const sliderRef2 = useRef();
      //slider main options 
      const settings = {
        asNavFor: sliderRef2.current,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        fade: true,
    }

    //slider nav options
    const settings2 = {
        asNavFor: sliderRef.current,
        slidesToShow: 3,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5500,
    }

  return (
    <div id="home-page">
        {/* <section className="categories-list flex">
          {!isLoadingCat && dataCat.map((el, index) => (
             <CategorySquare key={index} cat={el} />
          ))}
        </section> */}

        {/* <section className="product-list">
          {!isLoading && data.map((el) => (
              <Products key={el.id} props={el}/>
          ))}
        </section> */}

        <section className="promoBaner">
          <div className="baner-nav-container flex">
            <Slider {...settings2} ref={sliderRef2}>
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
            <Link to="/category"> - go to categories page!</Link>
          </h2>
          <Link to="blog">blog</Link>
          <div className="categories-list">
            {!isLoadingCat && dataCat.map((el, index) => (
                <CategorySquare key={index} cat={el} />
            ))}
          </div>
        </section>
        <section className="product-sliders">
          <ProductSlider url="laptops"/>
          <ProductSlider url="smartphones"/>
          <ProductSlider url="automotive"/>
        </section>
    </div>
  );
}

export default HomePage;
