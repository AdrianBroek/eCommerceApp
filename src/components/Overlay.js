import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import searchAction from "../actions/searchAction";

const Overlay = () => {
    const dispatch = useDispatch()
    const overlay = useSelector(state => state.overlay)
    const {open, popup} = useSelector(state => state.cart)
    const {searchResult} = useSelector(state => state.search)

    // cart open
    useEffect(()=> {
        open ? dispatch({type: 'OVERLAY_ON'}) : dispatch({type: 'OVERLAY_OFF'})
        // dispatch({type: 'OVERLAY_ON'})
    }, [open])

    // add product popup open
    useEffect(()=> {
        popup.op ? dispatch({type: 'OVERLAY_ON'}) : dispatch({type: 'OVERLAY_OFF'})
    }, [popup])

    function clickHandler(){
       if(open){
            dispatch({type: "OPEN_CART"})
        }
        if(overlay.open && searchResult.length > 0){
            console.log('sko')
            dispatch({
                type: "CLEAR_SEARCH_RESULT",
                payload: []
            })
       }
       }

    return (
        <>
            {overlay.open ? 
            <div id="overlay" onClick={()=>clickHandler()}/>
            :
            ""
            }
        </>
    )
}

export default Overlay