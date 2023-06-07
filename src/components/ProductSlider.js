import React, { useEffect, useState, useRef } from "react";
import getProductsCategoryAction from '../actions/getProductsCategoryAction'
import { useDispatch } from "react-redux";
import Products from "../components/Products"
import Slider from "react-slick"

const ProductSlider = ({url}) => {
    const [products, setProducts] = useState([])

    const getProductsFromCategory = async () => {
        const data = await getProductsCategoryAction(url)
        setProducts(data)
    }
    useEffect(()=> {
        getProductsFromCategory()
    }, [])

    //test
    useEffect(()=> {
        console.log(products)
        
    }, [products])

    // slider
    const sliderRef = useRef();
      //slider main options 
    const settings = {
        slidesToShow: 4,
        dots: true,
        arrows: true,
        swipeToSlide: true,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    }

    return (
        <section className="prod-slider product-list">
            <h2>{url} <span>products</span></h2>
            <Slider {...settings} ref={sliderRef} >
                {products.length > 0 ?
                    products.map((el)=> (
                        <Products key={el.id} props={el}/>
                    ))
                    : ""
                }
            </Slider>
        </section>
    )
}

export default ProductSlider


