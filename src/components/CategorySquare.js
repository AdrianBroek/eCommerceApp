import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CategorySquare = ({cat}) => {
    const dispatch = useDispatch()
    const {activeCategory} = useSelector(state => state.categories)

    return (
        <>
        <div className={activeCategory === cat ? 'noselect category-square active' : 'noselect category-square'}>
            <Link
            onClick={() => dispatch({
                type: "SET_ACTIVE_CATEGORY", 
                payload: cat
            })} 
            to={"/category/"+cat}>
            {cat}
            </Link>
        </div>
        {/* <div className="separator"/> */}
        </>
    )
}

export default CategorySquare