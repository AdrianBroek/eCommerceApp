import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Overlay = () => {
    const dispatch = useDispatch()
    const overlay = useSelector(state => state.overlay)
    const {open, popup} = useSelector(state => state.cart)

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
            dispatch({type: "OPEN_CART"})}
       }
    //    if(popup.op){
    //         dispatch({type: 'OVERLAY_OFF'})
    //    }

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