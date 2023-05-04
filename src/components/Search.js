import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import searchAction from "../actions/searchAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const [text, setText] = useState('')
    const [clearIcon, setClearIcon] = useState(false)
    const dispatch = useDispatch()
    const {searchResult, focus} = useSelector(state => state.search)
    const {open} = useSelector(state => state.overlay)
    const inputSearch = useRef()

    function inputHandler(e){
        setText(e.target.value)
        dispatch(searchAction(text))
    }

    //something in redux store with api from search ? add class
    useEffect(()=> {
        inputSearch.current.parentNode.classList.contains('search-active') ? dispatch({type: 'OVERLAY_ON'}) : dispatch({type: 'OVERLAY_OFF'})
    }, [searchResult])

    //clear event
    function clear(){
        dispatch(searchAction(text.length > 0))
        inputSearch.current.value = ''
    }

    //input focus detect then add class and overlay
    function focusInput(e){
        e.target.parentNode.classList.add('search-active')
        dispatch({type: 'OVERLAY_ON'})
    }

    // clear icon detection for text in input
    useEffect(()=> {
        text.length > 0 ? setClearIcon(true) : setClearIcon(false)
    },[text])

    return (
        <>
        {inputSearch && (
            <section id='search' className={text.length > 0 ? 'search-active' : ''}>
                <input onFocus={(e)=>focusInput(e)} type="text" ref={inputSearch} onChange={inputHandler} />
                <div className="icon flex">
                    {clearIcon ? (
                        <div className="clearIcon">
                            <FontAwesomeIcon onClick={()=>clear()} icon={faX} width='10px'/>
                        </div>
                    ) : ""}
                    <div className="searchIcon">
                        <FontAwesomeIcon icon={faSearch} width='12px'/>
                    </div>
                </div>
                {searchResult.length > 0 && text.length > 0 && (
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
        )}
        </>
    )
}

export default Search