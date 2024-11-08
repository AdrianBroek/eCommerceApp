import React, {useEffect, useRef, useState, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux'
import productsDataAction from '../actions/productsDataAction'
import categoriesDataAction from '../actions/categoriesDataAction'
import Products from '../components/Products'
import CategorySquare from '../components/CategorySquare'
import '../styles/app.scss'
import { Link } from "react-router-dom";
import popupAction from "../actions/popupAction"
import ProductSlider from '../components/ProductSlider'
import { motion } from "framer-motion";
import { categorySquareHomePageAnim } from "../animations";
import HomePageSliderMain from "../components/HomePageSliderMain";

function HomePage() {
    const dispatch = useDispatch();
    const productSliderCount = 5;

    useEffect(()=> {
      dispatch(productsDataAction())
      dispatch(categoriesDataAction())
    },[dispatch])

    const {dataCat, isLoadingCat} = useSelector(state => state.categories)

  const [showAllCat, setShowAllCat] = useState(false)

  return (
    <div id="home-page">
        <HomePageSliderMain />
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
