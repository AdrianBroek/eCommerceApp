import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import InCartItem from '../components/InCartItem'
import { useDispatch } from "react-redux";
import sendTotalData from "../actions/sendTotalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faForwardStep, faPenToSquare, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useOutletContext , useLocation } from "react-router-dom";
import stepAction from "../actions/stepAction";
import nextStepAction from "../actions/nextStepAction";
import prevStepAction from "../actions/prevStepAction";

const OrderPage = () => {
    const dispatch = useDispatch()
    const {orderStep, nextStep, prevStep} = useSelector(state => state.order)
    const order = useSelector(state => state.order)
    const {pathname} = useLocation()
    const totalCart = useSelector(state => state.totalCart)
    const delivery = useSelector(state => state.delivery)

    const [activeBtn, setActiveBtn] = useState({
        next: false,
        prev: false
    })

    // data stored in inputs on deliveryPage
    const { logged, userData } = useSelector(state => state.loggedStatus)
    const [data, setData] = useState({
        username: logged ? userData.username : totalCart.personalData.username,
        email: logged ? userData.email : totalCart.personalData.email,
        firstname: logged ? userData.firstname : totalCart.personalData.firstname,
        lastname: logged ? userData.lastname : totalCart.personalData.lastname,
        password: logged ? userData.password : totalCart.personalData.password,
        address: logged ? userData.address : totalCart.personalData.address,
        id: userData.id
    })

    // if everything correct on delivery step
    useEffect(()=> {
        switch(order.orderStep){
            case "delivery" :
                if(totalCart.personalData && delivery.isSet){
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
                if(!totalCart.items.length > 0){
                    setActiveBtn(state => ({
                        prev: false,
                        next: false,
                    }))
                }
                break
            case "summary" :
                setActiveBtn(state => ({
                    prev: true,
                    next: false,
                }))
                if(totalCart.personalData && delivery.isSet && totalCart.items.length > 0){
                    setActiveBtn(state => ({
                        prev: true,
                        next: true,
                    }))
                }
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

    // prev
    useEffect(()=> {
        console.log(activeBtn)
    }, [orderStep])

    return (
        <section id="orderPage" className="flex">
            <section className="stepContainer flex">
                <div className={orderStep === 'products' ? 'step flex st active' : 'step flex st'}>
                    <div class="animated-border-box-glow"></div>
                        <div class="animated-border-box flex">
                            <p>Products</p>
                        </div>
                </div>
                <div className={orderStep === 'delivery' ? 'step flex nd active' : 'step flex nd'}>
                    <div class="animated-border-box-glow"></div>
                        <div class="animated-border-box flex">
                            <p>Delivery</p>
                        </div>
                </div>
                <div className={orderStep === 'summary' ? 'step flex rd active' : 'step flex rd'}>
                    <div class="animated-border-box-glow"></div>
                        <div class="animated-border-box flex">
                            <p>Summary</p>
                        </div>
                </div>
            </section>
            <Outlet context={[data, setData]}/>
            <div className="btnHandler flex">
                {activeBtn.prev ? 
                    <Link to={prevStep} className="a abutton"><FontAwesomeIcon icon={faStepBackward}/> Back</Link>
                :
                    <button className="a off"><FontAwesomeIcon icon={faStepBackward}/> Back</button>
                }
                {activeBtn.next ? 
                    <Link to={nextStep} className="b abutton">{nextStep == 'pay' ? 'Pay ' : 'Next '}<FontAwesomeIcon icon={faForwardStep}/></Link>
                    :
                    <button className="b off">{nextStep == 'pay' ? 'Pay ' : 'Next '}<FontAwesomeIcon icon={faForwardStep}/></button>
                }
            </div>
        </section>
    )
}

export default OrderPage