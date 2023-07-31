import React, {useState, useRef, useEffect, useLayoutEffect, useCallback} from "react";
import { motion } from "framer-motion";
// images
import second from '../images/tutorPage/second.png'
import third from '../images/tutorPage/third.png'
import third2 from '../images/tutorPage/third2.png'
import third3 from '../images/tutorPage/third3.png'
import fourth from '../images/tutorPage/fourth.png'
import fifth from '../images/tutorPage/fifth.png'
import sixth from '../images/tutorPage/sixth.png'
import sixth2 from '../images/tutorPage/sixth2.png'
import help from '../images/tutorPage/help.png'
import scroll from '../images/tutorPage/scroll.gif'
import {arrowAnim} from '../animations'

const TutorPage = () => {
    const [activePage, setActivePage] = useState('first')
    const [able, setAble] = useState(true)

    function prevHandler(){
        if(activePage == 'second') setActivePage('first')
        if(activePage == 'third') setActivePage('second')
        if(activePage == 'fourth') setActivePage('third')
        if(activePage == 'fifth') setActivePage('fourth')
        if(activePage == 'sixth') setActivePage('fifth')
        if(activePage == 'last') setActivePage('sixth')
    }

    function nextHandler(){
        if(activePage == 'first') setActivePage('second')
        if(activePage == 'second') setActivePage('third')
        if(activePage == 'third') setActivePage('fourth')
        if(activePage == 'fourth') setActivePage('fifth')
        if(activePage == 'fifth') setActivePage('sixth')
        if(activePage == 'sixth') setActivePage('last')
    }

    function lastBtnHandler(){
        setAble(!able)
        setActivePage('first')
    }

    const [isScroll, setIsScroll] = useState(false)

    const [item, setItem] = useState()

    const onRefChange = useCallback(node => {
        if (node === null) { 
            // DOM node referenced by ref has been unmounted
        } else {
            // DOM node referenced by ref has changed and exists
            setItem(node)
        }
    }, [activePage]);

    function imageLoadHandler(){
        if(item){
            const box2 = item.children[0].scrollHeight
            const box3 = item.children[0].clientHeight
            if(box2 > box3){
                setIsScroll(true)
            }else {
                setIsScroll(false)
            }
        }
    }

    useEffect(()=> {
        const pageItem = document.querySelector('.page img')
        if(!pageItem){
            setIsScroll(false)
        }
    }, [activePage])

    return (
        <>
        {able ?
            <section ref={onRefChange} id="tutor-page">
                <div className="content flex noSroll">
                <button onClick={()=>lastBtnHandler()} className="off-tutor close">X</button>
                {activePage == 'first' && (
                    <div id="first" className="page first flex">
                        <div className="h">
                            <h4>Hello and welcome to</h4>
                            <h1><span>e</span>Commerce<span>App</span></h1>
                            <h3>fully made by me- Adrian Brożek</h3>
                        </div>
                        <p>Tech stack used:</p>
                        <ul>
                            <li>React (functional components), Redux store with redux-thunk and applyMiddleware</li>
                            <li>scss, framer-motion, slick-slider</li>
                            <li>Axios</li>
                            <li>Api with products and blog from: dummyjson.com</li>
                            <li>Picsum.photos for random generated photos for blog, since api did have it</li>
                            <li>LocalStorage as database, because once I lost api- got deleted or something 
                                and whole app was destroyed, so now I just used products from API in case it will be deleted</li>
                        </ul>
                    </div>
                )}
                {activePage == 'second' && (
                    <div id="second" className="page second flex">
                        <p>You can pick products to cart</p>
                        <br />
                        <div><img
                        onLoad={()=>imageLoadHandler()}
                        className="image" src={second} /></div>
                    </div>
                )}
                {activePage == 'third' && (
                    <div id="third" className="page third flex">
                        <p>register account</p>
                        <div>
                            <img 
                            onLoad={()=>imageLoadHandler()}
                            className="image" src={third} />
                        </div>
                        <p>login</p>
                        <div>
                            <img onLoad={()=>imageLoadHandler()} className="image" src={third2} />
                        </div>
                        <p>Update your account data</p>
                        <div>
                            <img className="image" src={third3} />
                        </div>
                    </div>
                )}
                {activePage == 'fourth' && (
                    <div id="fourth" className="page fourth flex">
                        <p>make orders</p>
                        <div><img onLoad={()=>imageLoadHandler()}
                        className="image" src={fourth} /></div>
                    </div>
                )}
                {activePage == 'fifth' && (
                    <div id="fifth" className="page fifth flex">
                        <p>read and comment on blog posts</p>
                        <div><img onLoad={()=>imageLoadHandler()}
                         className="image" src={fifth} /></div>
                    </div>
                )}
                {activePage == 'sixth' && (
                    <div id="sixth" className="page sixth flex">
                        <p>search product.. </p>
                        <div><img className="image" src={sixth} /></div>
                        <p>..and categories!</p>
                        <div><img onLoad={()=>imageLoadHandler()} className="image" src={sixth2} /></div>
                    </div>
                )}   
                {activePage == 'last' && (
                    <div id="last" className="page last flex">
                        <h1>Thank you</h1> 
                        <p>have fun with this <span>project</span>!</p>
                        
                    </div>
                )}   
                </div>      
                <div className="btn options flex">
                    <button className={activePage == "first" ? "a prev off" : "a prev"} onClick={(e)=>prevHandler(e)}>Prev</button>
                    {activePage == "last" ? 
                        <button className="b next" onClick={()=>lastBtnHandler()}>DONE</button>
                    :
                        <button className="b next" onClick={()=>nextHandler()}>Next</button>
                    }
                    
                </div>
                {isScroll && (
                    <motion.div
                    variants={arrowAnim}
                    initial="hidden"
                    animate="show"
                    className="arrow">
                        <img className="image" src={scroll} />
                    </motion.div>
                )}
              
            </section>
        : 
        <div className="helper" onClick={()=>lastBtnHandler()}>
            <img className="image" src={help} />
        </div>}
        </>
    )
}

export default TutorPage