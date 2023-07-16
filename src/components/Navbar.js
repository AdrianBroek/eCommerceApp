import React from "react";
import logo from '../images/walmartLogo.svg'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import popupAction from "../actions/popupAction";
import { motion } from "framer-motion";
import { glow } from "../animations";

const Navbar = () => {
    const dispatch = useDispatch()

    const {logged, userData} = useSelector(state => state.loggedStatus)

    function logout(){
        dispatch({type: "USER_LOGOUT"})
        dispatch(popupAction('success'))
    }

    return (
        <header id='navbar'>
            <div className="container">
                <div className="searchContainer">
                    <Search /> 
                </div>
                <Link className="logo" to='/'>
                    <img src={logo} />
                </Link>
                <div className="flex">
                    <Link className="link" to='/blog'>
                        Blog
                    </Link>
                    <Link className="link" to='/category'>
                        Categories
                    </Link>
                </div>

                <div className="userDiv flex">
                    {!logged ? (
                        <Link className="register" to='/register'>
                            <FontAwesomeIcon color="white" icon={faUserPlus} />
                        </Link>
                    ): (
                        <>
                            <Link className="my_account" to='/my_account'>
                                {userData.avatar ? 
                                    <>
                                    <div className="avatar-nav flex">
                                        <img src={userData.avatar} />
                                    </div>
                                    <motion.div
                                        variants={glow}
                                        animate="show"
                                        className="online-bubble">
                                    </motion.div>
                                    </>
                                : 
                                    <FontAwesomeIcon color="white" icon={faUser} />
                                }
                                
                            </Link>
                            <div className="logout" onClick={()=> logout()}>
                                <FontAwesomeIcon color="white" icon={faSignOut} />
                            </div>
                        </>
                    )}
                </div>
            <div className="empty"></div>
            </div>
            
        </header>
    )
}

export default Navbar