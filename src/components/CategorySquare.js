import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CategorySquare = ({cat}) => {
    const dispatch = useDispatch()
    const {activeCategory} = useSelector(state => state.categories)
    const {pathname} = useLocation()
    // console.log(cat)

    function clickHandler(){
        dispatch({
            type: "SET_ACTIVE_CATEGORY", 
            payload: cat
        })
        // this is not reloading
        window.history.pushState('null', '/category/${cat}', `/category/${cat}`);
        // console.log(cat)
    }

    return (
        <>
        <div className={activeCategory === cat ? 'noselect category-square active' : 'noselect category-square'}>
            {pathname == '/' ? 
            <Link onClick={clickHandler} to={'category/'+cat} className="square">{cat}</Link>    
        : 
            <div
                className="square"
                onClick={clickHandler}
                >
                {cat}
            </div>
        }
            
        </div>
        </>
    )
}

export default CategorySquare