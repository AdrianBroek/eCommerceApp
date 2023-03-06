import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomInput = ({name, value, active, setActive}) => {
    const ref = useRef()

    function clickHandler(e){

        switch(ref.current.value){
            case "visa" :
                setActive(state => ({
                    ...state,
                    payment: 'visa'
                }))
                break;
            case "mastercard" :
                setActive(state => ({
                    ...state,
                    payment: 'mastercard'
                }))
                break;
            case "GPay" :
                setActive(state => ({
                    ...state,
                    payment: 'GPay'
                }))
                break;
            case "APay" :
                setActive(state => ({
                    ...state,
                    payment: 'APay'
                }))
                break;
            case "p-collection" :
                setActive(state => ({
                    ...state,
                    payment: 'p-collection'
                }))
                break;
            case "p-delivery" :
                setActive(state => ({
                    ...state,
                    payment: 'p-delivery'
                }))
                break;
            case "dpd" :
                setActive(state => ({
                    ...state,
                    courier: 'dpd'
                }))
                break;
            case "dhl" :
                setActive(state => ({
                    ...state,
                    courier: 'dhl'
                }))
                break;
            case "box" :
                setActive(state => ({
                    ...state,
                    delivery: 'box'
                }))
                break;
            case "collection_point" :
                setActive(state => ({
                    ...state,
                    delivery: 'collection_point'
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
                <input defaultChecked="false" ref={ref} type="checkbox" checked={active==value ? true : false} value={value}/>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 50 L 40 86 L 90 10" stroke="#AEF359" stroke-dasharray="140" stroke-dashoffset="140"></path>
                </svg>
            </p>
            <p>{name}</p>
        </div>
    )
}

export default CustomInput