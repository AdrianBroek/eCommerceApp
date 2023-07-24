import React, { useEffect, useState, useRef } from "react";
import getProductsCategoryAction from '../actions/getProductsCategoryAction'
import { useDispatch } from "react-redux";
import Products from "../components/Products"
import Slider from "react-slick"

const ProductSlider = ({url}) => {
    const [products, setProducts] = useState([])

    async function getProductsFromCategory() {
      // rerendering went bad, so if products are loaded just off the function
      if(products.length == 0){
        const data = await getProductsCategoryAction(url)
        setProducts(data)
      }else {return}
    }
    getProductsFromCategory()

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
            breakpoint: 1640,
            settings: {
              slidesToShow: 3,
              arrows: false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              arrows: false,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              arrows: false,
            }
          },
          {
            breakpoint: 320,
            settings: {
              arrows: false,
              slidesToShow: 1,
              rows: 1,
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


