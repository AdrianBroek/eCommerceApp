import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDiagramSuccessor, faInfoCircle, faThumbsUp, faX } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";


const Popup = () => {
    const popup = useSelector(state => state.popup)
    const dispatch = useDispatch()
    const [popStatus, setPopStatus] = useState({
        success: false,
        confirm: false,
        error: false,
        info: false
    })

    useEffect(()=>{
        console.log(popup.status)
        switch(popup.status){
            case "error":
                setPopStatus(state => ({
                    ...state,
                    error: true, 
                    confirm: false,
                    success: false,
                    info: false 
                }))
                break;
            case "success":
                setPopStatus(state => ({
                    ...state,
                    error: false, 
                    confirm: false,
                    success: true,
                    info: false 
                }))
                break;
            case "confirm":
                setPopStatus(state => ({
                    ...state,
                    error: false, 
                    confirm: true,
                    success: false,
                    info: false 
                }))
                break;
            case "info":
                setPopStatus(state => ({
                    ...state,
                    error: false, 
                    confirm: false,
                    success: false,
                    info: true 
                }))
            break;
            default : 
                return setPopStatus(state => ({...state}))
        }
         
        
    }, [popup.status])

    console.log(popup.status)
    console.log(popStatus)

    return (
        <div id="popup" onClick={()=>dispatch({type: "OFF_POPUP"})}>
        {popStatus.success && (
            <div className="success flex container-popup">
                <FontAwesomeIcon color="white" icon={faCheckCircle}/>
                <div className="popup-txt-container flex">
                    <h4>success</h4>
                    <p>Cheers!</p>
                </div>
            </div>
        )}
        {popStatus.confirm && (
            <div className="confirm flex container-popup">
                <FontAwesomeIcon color="white" icon={faThumbsUp}/>
                <div className="popup-txt-container flex">
                    <h4>confirm</h4>
                    <p>Something went wrong. Please try again.</p>
                </div>
            </div>
        )}
        {popStatus.error && (
            <div className="err flex container-popup">
                <FontAwesomeIcon color="white" icon={faXmarkCircle}/>
                <div className="popup-txt-container flex">
                    <h4>error</h4>
                    <p>Something went wrong. Please try again.</p>
                </div>
                
            </div>
        )}
        {popStatus.info && (
            <div className="info flex container-popup">
                <FontAwesomeIcon color="white" icon={faInfoCircle}/>
                <div className="popup-txt-container flex">
                    <h4>info</h4>
                    <p>Something went wrong. Please try again.</p>
                </div>
            </div>
        )}
        </div>
    )
}

export default Popup