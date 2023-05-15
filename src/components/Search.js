import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import searchAction from "../actions/searchAction";
import searchPageAction from "../actions/searchPageAction";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import loaderGif from '../images/loaderGif.gif'

const Search = () => {
    const [text, setText] = useState('')
    const [clearIcon, setClearIcon] = useState(false)
    const dispatch = useDispatch()
    const {searchResult, isLoading} = useSelector(state => state.search)
    const {open} = useSelector(state => state.overlay)
    const inputSearch = useRef()
    // image
    const [loadImg, setLoadImg] = useState(true)
    const navigate = useNavigate();

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
        setText('')
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

    //on input pressing search
    function searchPageResult(){
        dispatch(searchPageAction(inputSearch.current.value))
    }

    // on enter key press search
    function handleKeyPress(e){
        if (e.key === 'Enter'){
            navigate("/search")
            dispatch(searchPageAction(inputSearch.current.value))
            // e.target.parentNode.classList.remove('search-active')
            dispatch({type: 'OVERLAY_OFF'})
            clear()
        }
    }

    return (
        <>
        {inputSearch && (
            <section id='search' className={text.length > 0 ? 'search-active' : ''}>
                <input onKeyDown={(e) => handleKeyPress(e)} onFocus={(e)=>focusInput(e)} type="text" ref={inputSearch} onChange={inputHandler} />
                <div className="icon flex">
                    {clearIcon ? (
                        <div className="clearIcon">
                            <FontAwesomeIcon onClick={()=>clear()} icon={faX} width='10px'/>
                        </div>
                    ) : ""}
                    <div onClick={() => searchPageResult()} className="searchIcon">
                        <Link to="/search"><FontAwesomeIcon icon={faSearch} width='12px'/></Link>
                    </div>
                </div>
                {searchResult.length > 0 && text.length > 0 && (
                    <div className="searchResultProducts flex">
                        {searchResult.map(item => (
                            <Link className="sProduct flex" to={`/product/${item.id}`}>
                                <div className="image">
                                    <img onLoad={()=>setLoadImg(false)} src={loadImg ? loaderGif : item.thumbnail} width='30px'/>
                                </div>
                                <div className="title">
                                    <p>{item.title}</p>
                                </div>
                                <div className="price">
                                    <p>{item.price} $</p>
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