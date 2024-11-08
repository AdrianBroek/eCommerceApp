import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import sendTotalData from "../actions/sendTotalData";
import { useLocation } from "react-router-dom";
import popupAction from "../actions/popupAction";
import { motion } from "framer-motion";

const InCartItem = ({props}) => {
    const {pathname} = useLocation()
    const {edit} = useSelector(state=> state.totalCart)
    const dispatch = useDispatch()
    
    // if pathname is /cart then edit buttons are on by default
    useEffect(()=> {
        const url = pathname.substring(pathname.lastIndexOf("/"));
        const urlDone = url.replace("/", '');

        // edit options only in a cart 
        if (urlDone == 'cart') {
            dispatch({
                type: "EDIT_TOTAL_DATA",
                payload: true
            })
        }else {
            dispatch({
                type: "EDIT_TOTAL_DATA",
                payload: false
            })
        }
    }, [pathname])

    
    const {item} = useSelector(state => state.cart)
    // single product
    let prodata = props.product
    // link for product page on product name click
    let link = "/product/" + prodata.id

    // deleting single item
    const deleteItem = () => {
        const newCartData = item.filter(items => prodata.id != items.product.id)
        
        dispatch({
            type: "UPDATE_CART",
            payload: {
                data: newCartData
            }
        })
        dispatch(popupAction('success'))
    }

    
    const getQuantityFromCartRedux = () => {
        const quantity = item.filter(items => prodata.id == items.product.id)
        return quantity[0].quantity
    }

    const [prodQty, setProdQty] = useState(getQuantityFromCartRedux())

    useEffect(()=> {
        setProdQty(getQuantityFromCartRedux())
    }, [item])

    function plusQuantity(){
        // take product id from redux
        const selectedProduct = item.filter(items => prodata.id == items.product.id)
        const prodId = selectedProduct[0].product.id

        // add quantity + 1 
        const addQuantity = selectedProduct[0].quantity + 1
        // make a copy od item in redux
        const newItem = item
        // map through all of the item in cart and if ID is the same in what i clicked to, change to quantity
        const newArray = newItem.map(obj => {
            if(obj.product.id == prodId){
                obj.quantity=addQuantity
            }
            return obj
        })
        // send new array to cart redux
        dispatch({
            type: "UPDATE_CART",
            payload: {
                data: newArray
            }
        })
    }

    function minusQuantity(){
        // if prodQty (which is just filtered product quantity form cart redux)
        // is bigger than 1, else dont work - basically dont go below 1 product quantity
        if (prodQty > 1){
            const selectedProduct = item.filter(items => prodata.id == items.product.id)
            const prodId = selectedProduct[0].product.id
            const addQuantity = selectedProduct[0].quantity - 1
            const newItem = item
            const newArray = newItem.map(obj => {
                if(obj.product.id == prodId){
                    obj.quantity=addQuantity
                }
                return obj
            })
            dispatch({
                type: "UPDATE_CART",
                payload: {
                    data: newArray
                }
            })
        }
    }
    
    // total cart price counter
    function countSum(){
        let tablicaCen = []
        // console.log(tablicaCen)
        item.forEach(element => {
            let sumka = element.product.price * element.quantity
            tablicaCen.push(sumka)
        });
        return tablicaCen
    }

    // sum counter and sending to redux store
    useEffect(()=> {
        let sumData = countSum()
        const totalSum = sumData.reduce((prevNm, nm) => prevNm + nm, 0)
        dispatch(sendTotalData(item, totalSum))
    }, [prodQty])

    return (
        <section className="product">
            <div className="quantity">
                {edit ? (<motion.button
                whileTap={{scale: .8}}
                onClick={ ()=> plusQuantity() } className="plus"><FontAwesomeIcon icon={faPlus} /></motion.button>):""}
                {getQuantityFromCartRedux()}
                {edit ? (<motion.button 
                whileTap={{scale: .8}}
                onClick={ ()=> minusQuantity() } className="minus"><FontAwesomeIcon icon={faMinus} /></motion.button>):""}
            </div>
            <div>
                <img src={prodata.thumbnail} height='auto' width='60px' loading="lazy"></img>
            </div>
            <div>
                <Link className="link" to={link}>
                {prodata.title}
                </Link>
            </div>
            <div>
                {prodata.price} $
            </div>
            <div className="del">
                <motion.button whileTap={{scale: .8}} className="a" onClick={()=> deleteItem()}>
                    <FontAwesomeIcon icon={faTrash} />
                </motion.button>
            </div>
        </section>
    )
}

export default InCartItem