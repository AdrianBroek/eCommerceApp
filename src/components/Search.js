import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import searchAction from "../actions/searchAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const dispatch = useDispatch()
    const {searchResult} = useSelector(state => state.search)
    const {open} = useSelector(state => state.overlay)

    const inputSearch = useRef()

    function inputHandler(e){
        dispatch(searchAction(inputSearch.current.value))
    }

    useEffect(()=> {
        inputSearch.current.parentNode.classList.contains('search-active') ? dispatch({type: 'OVERLAY_ON'}) : dispatch({type: 'OVERLAY_OFF'})
    }, [searchResult])

    function clickHandler(e){
        console.log(e.target)
    }

    function clear(){
        dispatch(searchAction(inputSearch.current.value))
        inputSearch.current.value = ''
    }

    return (
        <section id='search' onClick={(e)=>clickHandler(e)} className={searchResult.length > 1 && inputSearch.current.value ? 'search-active' : ''}>
            <input type="text" ref={inputSearch} onChange={inputHandler}>
                
            </input>
            <div className="icon">
                <FontAwesomeIcon icon={faSearch} width='12px'/>
            </div>
            {searchResult.length > 1 && inputSearch.current.value && (
                <div className="searchResultProducts flex">
                    {searchResult.map(item => (
                        <Link className="sProduct flex" to={`/product/${item.id}`}>
                            <div className="image">
                                <img src={item.thumbnail} width='30px'/>
                            </div>
                            <div className="title">
                                <p>{item.title}</p>
                            </div>
                            <div className="price">
                                <p>{item.price}</p>
                            </div>
                        </Link>
                    )
                    )}
                    <button onClick={()=>clear()} className="clear a">Clear</button>
                </div>
            )}
        </section>
    )
}

export default Search