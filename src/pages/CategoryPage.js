import React, {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import categoryProductsAction from "../actions/categoryProductsAction";
import { useLocation } from "react-router-dom";
import CategorySquare from '../components/CategorySquare'
import categoriesDataAction from '../actions/categoriesDataAction'
// dummyData
import dummyData from '../dummyProductsData'
import DummyProducts from '../components/DummyProducts'

const ProductsPage = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation()

    // console.log(pathname.substring(pathname.lastIndexOf("/")))

    useEffect(()=> {
        dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
        dispatch(categoriesDataAction())
    },[])

    const {data, isLoading} = useSelector(state => state.categoryProducts)
    const {dataCat, isLoadingCat} = useSelector(state => state.categories)


    return (
        <section>
            <h2 style={{margin: '2rem auto', width: 'fit-content'}}>Pick category:</h2>
            <section className="categories-list">
                    {!isLoadingCat && dataCat.map((el, index) => (
                        <CategorySquare key={index} cat={el} />
                    ))}
            </section>
            <section className="product-list">
                {isLoading ? dummyData.map((el)=> (<DummyProducts key={el.id} props={el}/>)) : ""}

                {!isLoading && data.map((el) => (
                    <Products key={el.id} props={el}/>
                ))}
            </section>
        </section>
    )
}

export default ProductsPage