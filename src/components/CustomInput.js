import { faL } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef} from "react";
import { useSelector } from "react-redux";

const CustomInput = ({name, value, active, setActive, cost}) => {
    const ref = useRef()


    const {delivery} = useSelector(state => state.totalCart)

    // console.log(active)
    // console.log(value)

    function clickHandler(e){
        switch(ref.current.value){
            case "VISA" :
                setActive(state => ({
                    ...state,
                    payment: {
                        type: "VISA"
                    }
                }))
                break;
            case "MasterCard" :
                setActive(state => ({
                    ...state,
                    payment: {
                        type: "MasterCard"
                    }
                }))
                break;
            case "GooglePay" :
                setActive(state => ({
                    ...state,
                    payment:  {
                        type: "GooglePay"
                    }
                }))
                break;
            case "ApplePay" :
                setActive(state => ({
                    ...state,
                    payment: {
                        type: "ApplePay"
                    }
                }))
                break;
            case "Personal collection" :
                setActive(state => ({
                    ...state,
                    payment: {
                        type: "Personal collection"
                    }
                }))
                break;
            case "Payment on delivery" :
                setActive(state => ({
                    ...state,
                    payment: {
                        type: "Payment on delivery"
                    }
                }))
                break;
            case "DPD" :
                setActive(state => ({
                    ...state,
                    courier: {
                        type: "DPD"
                    }
                }))
                break;
            case "DHL" :
                setActive(state => ({
                    ...state,
                    courier: {
                        type: "DHL"
                    }
                }))
                break;
            case "BOX" :
                setActive(state => ({
                    ...state,
                    delivery: {
                        type: "BOX",
                        cost: cost
                    }
                }))
                break;
            case "Collection point" :
                setActive(state => ({
                    ...state,
                    delivery: {
                        type: "Collection point",
                        cost: cost
                    }
                }))
                break;
            case "agreement" :
                setActive(state => ({
                    ...state,
                    agreement: {
                        type: "agreement"
                    }
                }))
                break;
            default : return (state => ({...state}))
        }

    }

    useEffect(()=> {
        // console.log(active)
    }, [active])

    return (
        <div onClick={(e)=>clickHandler(e)} className={'customInput '+value}>
            <p className="check">
                <input defaultChecked="false" ref={ref} type="checkbox" checked={active.type == value ? true : false} value={value}/>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 50 L 40 86 L 90 10" stroke="#AEF359" stroke-dasharray="140" stroke-dashoffset="140"></path>
                </svg>
            </p>
            <p>{name}</p>
        </div>
    )
}

export default CustomInput