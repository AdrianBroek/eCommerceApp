import React, {useEffect} from "react";
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

    console.log(pathname.substring(pathname.lastIndexOf("/")))

    useEffect(()=> {
        dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
        dispatch(categoriesDataAction())
        console.log('i work')
    },[])

    const {data, isLoading} = useSelector(state => state.categoryProducts)
    const {dataCat, isLoadingCat} = useSelector(state => state.categories)

    return (
        <section>
            <section className="categories-list flex">
                <h2>Pick category:</h2>
                {!isLoadingCat && dataCat.map((el, index) => (
                    <CategorySquare key={index} cat={el} />
                ))}
            </section>
            <section className="product-list">
                {isLoading ? dummyData.map((el)=> (<DummyProducts key={el.id} props={el}/>)) : console.log('')}

                {!isLoading && data.map((el) => (
                    <Products key={el.id} props={el}/>
                ))}
            </section>
            
        </section>
    )
}

export default ProductsPage