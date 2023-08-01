import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDiagramSuccessor, faInfoCircle, faThumbsUp, faX } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { motion , AnimatePresence } from "framer-motion";
import { popupAlertAnim } from "../animations";

const Popup = ({popup, index}) => {
    const {popupList} = useSelector(state => state.popup)
    const dispatch = useDispatch()
    const [popStatus, setPopStatus] = useState({
        success: false,
        confirm: false,
        error: false,
        info: false,
        reset: false
    })

    // set reset state to single popup to reset after 5 sec
    setTimeout(()=>{
        setPopStatus(state => ({
            ...state,
            reset: true
        }))
    },[5000])
    
    // detect reset, if true -> delete this popup
    useEffect(()=> {
        if(popStatus.reset == true) {
            deletePopup()
        }
    }, [popStatus.reset])
    


    function deletePopup(){
        const newPopupList = popupList.filter((item) => item.id != popup.id)
        dispatch({
            type: "DELETE_POPUP",
            payload: newPopupList
        })
    }

    useEffect(()=>{
        switch(popup.popup.status){
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

    return (
        <>
            <motion.div 
                className="container-popup"
                onClick={(e)=>deletePopup(e)}
                variants={popupAlertAnim}
                initial="hidden"
                animate="show"
                exit='exit'
                layout
            >
            {popStatus.success && (
                <div className="success flex">
                    <FontAwesomeIcon color="white" icon={faCheckCircle}/>
                    <div className="popup-txt-container flex">
                        {popup.popup.msg ? 
                            <>
                                <h4>Success</h4>
                                <p>{popup.popup.msg}</p>
                            </>
                            :<>
                                <h4>Success</h4>
                                <p>Cheers!</p>
                            </>
                        }
                    </div>
                </div>
            )}
            {popStatus.confirm && (
                <div className="confirm flex"

                >
                    <FontAwesomeIcon color="white" icon={faThumbsUp}/>
                    <div className="popup-txt-container flex">
                        {popup.popup.msg ? 
                            <>
                                <h4>Confirm</h4>
                                <p>{popup.popup.msg}</p>
                            </>
                            :<>
                                <h4>Confirm</h4>
                                <p>Something went wrong. Please try again.</p>
                            </>
                        }
                    </div>
                </div>
            )}
            {popStatus.error && (
                <div className="err flex">
                    <FontAwesomeIcon color="white" icon={faXmarkCircle}/>
                    <div className="popup-txt-container flex">
                        {popup.popup.msg ? 
                        <>
                            <h4>error</h4>
                            <p>{popup.popup.msg}</p>
                        </>
                        :<>
                        <h4>error</h4>
                        <p>Something went wrong. Please try again.</p>
                        </>
                        }
                    </div>
                    
                </div>
            )}
            {popStatus.info && (
                <div className="info flex">
                    <FontAwesomeIcon color="white" icon={faInfoCircle}/>
                    <div className="popup-txt-container flex">
                        {popup.popup.msg ? 
                            <>
                                <h4>info</h4>
                                <p>{popup.popup.msg}</p>
                            </>
                            :<>
                                <h4>error</h4>
                                <p>Something went wrong. Please try again.</p>
                            </>
                        }
                    </div>
                </div>
            )}
            </motion.div>
        </>
    )
}

export default Popup