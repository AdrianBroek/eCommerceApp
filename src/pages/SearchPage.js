import React, {useEffect, useState} from "react";
import { useSelector  } from "react-redux";
import Products from "../components/Products"
import noResultImg from "../images/no-results.png"
import loaderGif from '../images/loaderGif.gif'
// dummyData
import dummyData from '../dummyProductsData'
import DummyProducts from '../components/DummyProducts'

const SearchPage = () => {
    const {searchPageResults, isLoading} = useSelector(state => state.search)
    const [imgLoad, setImgLoad] = useState(false)

    function loadImgHandler(){
        setImgLoad(true)
    }

    return (
        <section id="searchPage">
            <div class="flex page-title"><h1>Search results:</h1></div>
            {searchPageResults.length > 0 ? (
                <div className="product-list">
                    {isLoading ? dummyData.map((el)=> (<DummyProducts key={el.id} props={el}/>)) : ""}

                    {!isLoading && searchPageResults.map((el) => (
                        <Products key={el.id} props={el}/>
                    ))}
                </div>
            )
        :
            <section className="flex noSearchResults">
            <div className="flex">
                <img onLoad={()=>loadImgHandler()} src={imgLoad ? noResultImg : loaderGif} />
            </div>
                <h2>No results found</h2>
                <p>Please try again with another keywords or maybe use generic term</p>
            </section>
        }
        </section>
    )
}

export default SearchPage