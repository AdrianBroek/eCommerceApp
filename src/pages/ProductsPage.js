import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import productsDataAction from "../actions/productsDataAction";

const ProductsPage = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(productsDataAction())
    },[])

    const {data, isLoading} = useScdxelector(state => state.items)

    return (
        <section>
            <div>
                category
            </div>
            <section className="product-list">
                {!isLoading && data.map((el) => (
                    <Products key={el.id} props={el}/>
                ))}
            </section>
        </section>
    )
}

export default ProductsPage