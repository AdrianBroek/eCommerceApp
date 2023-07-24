import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useRef} from "react";
import Slider from "react-slick";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ProductImageSliderAnim } from "../animations";

const ProductImageSlider = ({images, setProdImageState}) => {
    
    const sliderRef = useRef()

    console.log(images)
    //slider nav options 
    const settings = {
        dots: true,
        infinite: false,
        arrow: true,
        // speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        focusOnSelect: true,
        speed: 300
    }

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
            <Slider {...settings} ref={sliderRef} >
                {images.map((image)=> (
                    <div className="prod-image-container flex">
                        <img src={image} />
                    </div>
                ))}
                
            </Slider>   
             {/*doesnt work*/}
            {/* <div class="prod-slider-overlay"
                onClick={()=> setProdImageState(false)}
            ></div> */}


        </motion.section>
    )
}

export default ProductImageSlider