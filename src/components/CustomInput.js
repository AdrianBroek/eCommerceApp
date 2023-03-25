import { faL } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef} from "react";
import { useSelector } from "react-redux";

const CustomInput = ({name, value, active, setActive}) => {
    const ref = useRef()


    const {delivery} = useSelector(state => state.totalCart)
    console.log(delivery)

    function checkboxHandler(){
        if(active == value){
            return true 
        }

    }

    function clickHandler(e){

        switch(ref.current.value){
            case "VISA" :
                setActive(state => ({
                    ...state,
                    payment: 'VISA'
                }))
                break;
            case "MasterCard" :
                setActive(state => ({
                    ...state,
                    payment: 'MasterCard'
                }))
                break;
            case "GooglePay" :
                setActive(state => ({
                    ...state,
                    payment: 'GooglePay'
                }))
                break;
            case "ApplePay" :
                setActive(state => ({
                    ...state,
                    payment: 'ApplePay'
                }))
                break;
            case "Personal collection" :
                setActive(state => ({
                    ...state,
                    payment: 'Personal collection'
                }))
                break;
            case "Payment on delivery" :
                setActive(state => ({
                    ...state,
                    payment: 'Payment on delivery'
                }))
                break;
            case "DPD" :
                setActive(state => ({
                    ...state,
                    courier: 'DPD'
                }))
                break;
            case "DHL" :
                setActive(state => ({
                    ...state,
                    courier: 'DHL'
                }))
                break;
            case "BOX" :
                setActive(state => ({
                    ...state,
                    delivery: 'BOX'
                }))
                break;
            case "Collection point" :
                setActive(state => ({
                    ...state,
                    delivery: 'Collection point'
                }))
                break;
            case "agreement" :
                setActive(state => ({
                    ...state,
                    agreement: 'agreement'
                }))
                break;
            default : return (state => ({...state}))
        }

    }

    useEffect(()=> {

    }, [active])

    return (
        <div onClick={(e)=>clickHandler(e)} className={'customInput '+value}>
            <p className="check">
                <input defaultChecked="false" ref={ref} type="checkbox" checked={checkboxHandler()} value={value}/>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 50 L 40 86 L 90 10" stroke="#AEF359" stroke-dasharray="140" stroke-dashoffset="140"></path>
                </svg>
            </p>
            <p>{name}</p>
        </div>
    )
}

export default CustomInput