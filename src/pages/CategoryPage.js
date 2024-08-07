import {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import categoryProductsAction from "../actions/categoryProductsAction";
import { useLocation } from "react-router-dom";
import CategorySquare from '../components/CategorySquare'
import categoriesDataAction from '../actions/categoriesDataAction'
// dummyData
import dummyData from '../dummyProductsData'
import DummyProducts from '../components/DummyProducts'
// slider
import Slider from "react-slick";

const ProductsPage = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation()

    //slider options
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 9,
        arrows: true,
        centerMode: true,
        swipeToSlide: true,
        variableWidth: true,
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 5,
                dots: false,
                variableWidth: false,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                variableWidth: false,
                dots: false
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
                rows: 1,
                variableWidth: false,
                dots: false
              }
            }
        ]
      };

    const sliderRef = useRef();

    const {data, isLoading} = useSelector(state => state.categoryProducts)
    const {dataCat, isLoadingCat, activeCategory} = useSelector(state => state.categories)
    
    // settingActiveCat when someone gives u a link or smh
    useEffect(()=> {
      if(activeCategory == null){ 
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch({
          type: "SET_ACTIVE_CATEGORY", 
          payload: linkDone
        })
      }
    },[])

    // slider
    useEffect(()=> {
        dataCat.forEach((el, index)=>{
            if(el === activeCategory){
                sliderRef.current.slickGoTo(index, false)
            }
        })
    },[activeCategory,dataCat])
    
    // products updating
    useEffect(()=> {
      // dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
      if (activeCategory){
        dispatch(categoryProductsAction('/' + activeCategory))
        
      }else {
        dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
      }
      dispatch(categoriesDataAction())
    },[activeCategory])

    return (
        <section>
            <h2 style={{margin: '2rem auto', width: 'fit-content'}}>Pick category:</h2>
            <section className="categories-list">
                <Slider {...settings} ref={sliderRef}>
                    {!isLoadingCat && dataCat.map((el, index) => (
                        <CategorySquare key={el.slug} cat={el} />
                    ))}
                </Slider>
            </section>
            <section className="product-list">
                {isLoading ? dummyData.map((el,index)=> (<DummyProducts key={index} props={el}/>)) : ""}

                {!isLoading && data.map((el) => (
                  <Products key={el.id} props={el}/>
                ))} 
            </section>
        </section>
    )
}

export default ProductsPage