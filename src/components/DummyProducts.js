import React from "react";
import Loader from "./Loader";


const DummyProducts = () => {

    return (
        <div className='product'>
            <div className='imageContent'>
            <Loader />
                {/* <img src={props.image} /> */}
            </div>
            <h2 className='title'><Loader /></h2>
            <div className='items'>
                {/* <p className='brand'><Loader /></p> */}
            </div>
            <p className='description'><Loader /></p>

            <div className='price'>
                {/* <p><Loader /></p> */}
            </div>
            <div className='addToCart'>
                <Loader />
            </div>
        </div>
    )
}

export default DummyProducts