import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CategorySquare = ({cat}) => {
    const dispatch = useDispatch()
    const {activeCategory} = useSelector(state => state.categories)

    

    function clickHandler(){
        dispatch({
            type: "SET_ACTIVE_CATEGORY", 
            payload: cat
        })
        // this is not reloads
        window.history.pushState('null', '/category/${cat}', `/category/${cat}`);
    }

    return (
        <>
        <div className={activeCategory === cat ? 'noselect category-square active' : 'noselect category-square'}>
            <div
                className="square"
                // onClick={() => dispatch({
                //     type: "SET_ACTIVE_CATEGORY", 
                //     payload: cat
                // })} 
                onClick={clickHandler}
                // to={"/category/"+cat}
                >
                {cat}
            </div>
        </div>
        {/* <div className="separator"/> */}
        </>
    )
}

export default CategorySquare