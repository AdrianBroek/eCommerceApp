import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useRef} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ProductImageSliderAnim } from "../animations";

import { Zoom, Navigation, Pagination } from 'swiper/modules';

import { useBodyScrollLock } from "./BodyLock";

const ProductImageSlider = ({images, setProdImageState}) => {
    useBodyScrollLock()
    return (
        <motion.section 
            variants={ProductImageSliderAnim}
            initial="hidden"
            animate="show"
            exit='exit'
            id="product-image-slider"
        >
            <motion.div whileTap={{scale: .85}} className="turn-off-product-image-slider flex"
            onClick={()=> setProdImageState(false)}>
                <FontAwesomeIcon icon={faX} />
            </motion.div>
            <Swiper
                zoom={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                slidesPerView={1}
                modules={[Zoom, Navigation, Pagination]}
            >
                {images.map((image)=> (
                    <SwiperSlide>
                        <div className="prod-image-container swiper-zoom-container">
                            <img loading="lazy" src={image} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>   
        </motion.section>
    )
}

export default ProductImageSlider