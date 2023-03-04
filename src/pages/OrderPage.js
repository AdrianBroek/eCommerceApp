import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import InCartItem from '../components/InCartItem'
import { useDispatch } from "react-redux";
import sendTotalData from "../actions/sendTotalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faForwardStep, faPenToSquare, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import stepAction from "../actions/stepAction";
import nextStepAction from "../actions/nextStepAction";
import prevStepAction from "../actions/prevStepAction";

const OrderPage = () => {
    const dispatch = useDispatch()
    const {orderStep, nextStep, prevStep} = useSelector(state => state.order)
    const {pathname} = useLocation()

    useEffect(()=> {
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(stepAction(linkDone))
        
        // console.log(orderStep)
    }, [pathname])

    useEffect(()=> {
        dispatch(nextStepAction(orderStep))
        console.log(nextStep)
    }, [orderStep])

    useEffect(()=> {
        dispatch(prevStepAction(orderStep))
        console.log(nextStep)
    }, [orderStep])

    return (
        <section id="orderPage" className="flex">
            <section className="stepContainer flex">
                <div className={orderStep === 'products' ? 'step flex st active' : 'step flex st'}>
                    <p>Products</p>
                </div>
                <div className={orderStep === 'delivery' ? 'step flex nd active' : 'step flex nd'}>
                    <p>Delivery</p>
                </div>
                <div className={orderStep === 'summary' ? 'step flex rd active' : 'step flex rd'}>
                    <p>Summary</p>
                </div>
            </section>
            <Outlet />
            <div className="btnHandler flex">
                <Link to={prevStep} className="a abutton">Back <FontAwesomeIcon icon={faStepBackward}/></Link>
                <Link to={nextStep} className="b abutton">Next <FontAwesomeIcon icon={faForwardStep}/></Link>
            </div>
        </section>
    )
}

export default OrderPage