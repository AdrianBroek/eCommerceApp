import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CategorySquare = ({cat, index}) => {
    const dispatch = useDispatch()
    const {activeCategory} = useSelector(state => state.categories)
    const {pathname} = useLocation()

    function clickHandler(){
        dispatch({
            type: "SET_ACTIVE_CATEGORY", 
            payload: cat.slug
        })
        // this is not reloading
        window.history.pushState('null', '/category/${cat.slug}', `/category/${cat.slug}`);
    }

    return (
        <>
        <div className={activeCategory === cat.slug ? 'noselect category-square active' : 'noselect category-square'}>
            {pathname == '/' ? 
            <Link onClick={clickHandler} to={'category/'+cat.slug} className="square">{cat.slug}</Link>    
        : 
            <div
                className="square"
                onClick={clickHandler}
                >
                {cat.slug}
            </div>
        }
            
        </div>
        </>
    )
}

export default CategorySquare