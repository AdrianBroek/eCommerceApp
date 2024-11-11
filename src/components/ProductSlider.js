import React, { useEffect, useState, useRef } from "react";
import getProductsCategoryAction from '../actions/getProductsCategoryAction'
import { useDispatch } from "react-redux";
import Products from "../components/Products"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


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


    return (
        <section className="prod-slider product-list">
            <h2>{url} <span>products</span></h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              modules={[FreeMode, Navigation, Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              freeMode={true}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
                {products.length > 0 ?
                    products.map((el)=> (
                      <SwiperSlide key={el.id}>
                        <Products props={el}/>
                      </SwiperSlide>
                    ))
                    : ""
                }
            </Swiper>
        </section>
    )
}

export default ProductSlider



    // slider
    // const sliderRef = useRef();
    // //slider main options 
    // const settings = {
    //     slidesToShow: 4,
    //     dots: true,
    //     arrows: true,
    //     swipeToSlide: true,
    //     responsive: [
    //       {
    //         breakpoint: 1640,
    //         settings: {
    //           slidesToShow: 3,
    //           arrows: false,
    //         }
    //       },
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           arrows: false,
    //         }
    //       },
    //       {
    //         breakpoint: 768,
    //         settings: {
    //           slidesToShow: 2,
    //           arrows: false,
    //         }
    //       },
    //       {
    //         breakpoint: 320,
    //         settings: {
    //           arrows: false,
    //           slidesToShow: 1,
    //           rows: 1,
    //         }
    //       }
    //   ]
    // }