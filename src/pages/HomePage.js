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

function HomePage() {
      // slider
      const sliderRef = useRef();
      const sliderRef2 = useRef();
      //slider main options 
      const settings = {
        asNavFor: sliderRef2.current,
        sliderToShow: 1,
        dots: true,
        arrows: false,
    }

    //slider nav options
    const settings2 = {
        asNavFor: sliderRef.current,
        slidesToShow: 3,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
    }

  const dispatch = useDispatch();

  const location = useLocation()

  useEffect(()=> {
    dispatch(productsDataAction())
    dispatch(categoriesDataAction())
  },[dispatch])

  const {data, isLoading} = useSelector(state => state.items)
  const {dataCat, isLoadingCat} = useSelector(state => state.categories)
  const {autor, tytuł} = useSelector(state => state.books)

  // useEffect(()=>{
  //   console.log(data)
  // }, [data])
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

        <Link to="category">Choose something!</Link>

        <h3>{autor}</h3>
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
    </div>
  );
}

export default HomePage;
