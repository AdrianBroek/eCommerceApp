import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDiagramSuccessor, faInfoCircle, faThumbsUp, faX } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
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

    // turn off popup after some time
    setTimeout(()=>{
        setPopStatus(state => ({
            success: false,
            confirm: false,
            error: false,
            info: false,
            reset: true
        }))
    },[5000])

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

    function deletePopup(){
        const newPopupList = popupList.filter((item,ind) => ind != index)
        dispatch({
            type: "DELETE_POPUP",
            payload: newPopupList
        })
    }

    return (
        <>
        {!popStatus.reset && (
            <motion.div 
            className="container-popup" 
            onClick={(e)=>deletePopup(e)}
            variants={popupAlertAnim}
            initial="hidden"
            animate="show"
            exit="exit"
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
        )}
        </>
    )
}

export default Popup