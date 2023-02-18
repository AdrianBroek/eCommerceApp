import React, {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import categoryProductsAction from "../actions/categoryProductsAction";
import { useLocation } from "react-router-dom";
import CategorySquare from '../components/CategorySquare'
import categoriesDataAction from '../actions/categoriesDataAction'
// dummyData
import dummyData from '../dummyProductsData'
import DummyProducts from '../components/DummyProducts'

const ProductsPage = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation()

    // console.log(pathname.substring(pathname.lastIndexOf("/")))

    useEffect(()=> {
        dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
        dispatch(categoriesDataAction())
    },[])

    const {data, isLoading} = useSelector(state => state.categoryProducts)
    const {dataCat, isLoadingCat} = useSelector(state => state.categories)

    // const [isDown, setIsDown] = useState(false)
    const [xStart, setXstart] = useState({
        pressed: false,
        xStartPos: 0
    })

    const slider = useRef()
    const innerSlider = useRef()

    // //slider
    function sliderFunction(e){
        
        if(xStart.pressed){
            let x = e.nativeEvent.offsetX
            innerSlider.current.style.left =  `${x - xStart.xStartPos}px`
        }

    }

    function mouseDown (e){
        setXstart({
            pressed: true,
            xStartPos: e.nativeEvent.offsetX - innerSlider.current.offsetLeft
        })
    }

    // window.addEventListener('mouseup', ()=> {
    //     setXstart(prevstate => ({
    //         ...prevstate,
    //         pressed: false,
    //     }))
    // })

    return (
        <section>
            <section className="categories-list">
                {/* <h2>Pick category:</h2> */}
                <div className="flex slider" ref={slider} 
                onMouseMove={sliderFunction} 
                onMouseDown={(e) => mouseDown(e)} 
                onMouseUp={() => setXstart(prevState => ({...prevState, pressed: false}))}>
                    <div ref={innerSlider} className="innerSlider flex">
                        {!isLoadingCat && dataCat.map((el, index) => (
                            <CategorySquare key={index} cat={el} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="product-list">
                {isLoading ? dummyData.map((el)=> (<DummyProducts key={el.id} props={el}/>)) : console.log()}

                {!isLoading && data.map((el) => (
                    <Products key={el.id} props={el}/>
                ))}
            </section>
        </section>
    )
}

export default ProductsPage