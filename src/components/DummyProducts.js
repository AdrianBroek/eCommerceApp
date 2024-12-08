import React from "react";
import Loader from "./Loader";


const DummyProducts = () => {

    return (
        <div className='product'>
            <div className='imageContent'>
                <Loader />
            </div>
            <br />
            <h2 className='title'><Loader /></h2>
            <div className='items'>
            </div>
            <p className='description'><Loader /></p>

            <div className='price'>
            </div>
            <div className='addToCart'>
                <Loader />
            </div>
        </div>
    )
}

export default DummyProducts