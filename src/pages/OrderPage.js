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
    const order = useSelector(state => state.order)
    const {pathname} = useLocation()
    const totalCart = useSelector(state => state.totalCart)

    const [activeBtn, setActiveBtn] = useState({
        next: false,
        prev: false
    })

    // if everything correct on delivery step
    useEffect(()=> {
        switch(order.orderStep){
            case "delivery" :
                if(totalCart.personalData && totalCart.delivery){
                    setActiveBtn(state => ({
                        prev: true,
                        next: true,
                    }))
                }else {
                    setActiveBtn(state => ({
                        prev: true,
                        next: false,
                    }))
                }
                break
            case "products" :
                setActiveBtn(state => ({
                    prev: false,
                    next: true,
                }))
                break
            case "summary" :
                setActiveBtn(state => ({
                    prev: true,
                    next: true,
                }))
                break
            case "default" :
                return (state => ({...state}))
        }
    }, [totalCart, order, orderStep])

    useEffect(()=> {
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch(stepAction(linkDone)) 
        // console.log(orderStep)
    }, [pathname])

    // next
    useEffect(()=> {
        dispatch(nextStepAction(orderStep))
    }, [orderStep])

    // prev
    useEffect(()=> {
        dispatch(prevStepAction(orderStep))
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
                {activeBtn.prev ? 
                    <Link to={prevStep} className="a abutton"><FontAwesomeIcon icon={faStepBackward}/> Back</Link>
                :
                    <button className="a off"><FontAwesomeIcon icon={faStepBackward}/> Back</button>
                }
                {activeBtn.next ? 
                    <Link to={nextStep} className="b abutton">Next <FontAwesomeIcon icon={faForwardStep}/></Link>
                    :
                    <button className="b off">Next <FontAwesomeIcon icon={faForwardStep}/></button>
                }
                
            </div>
        </section>
    )
}

export default OrderPage