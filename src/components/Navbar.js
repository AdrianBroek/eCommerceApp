import React from "react";
import logo from '../images/walmartLogo.svg'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";

const Navbar = () => {
    const dispatch = useDispatch()

    const {logged, userData} = useSelector(state => state.loggedStatus)

    return (
        <header id='navbar'>
            <div className="container">
                <div className="searchContainer">
                    <Search /> 
                </div>
                <Link to='/'>
                    <img src={logo} />
                </Link>
                <div className="userDiv flex">
                    {!logged ? (
                        <Link className="register" to='/register'>
                            <FontAwesomeIcon color="white" icon={faUserPlus} />
                        </Link>
                    ): (
                        <>
                            <Link className="my_account" to='/my_account'>
                                {/* <FontAwesomeIcon color="white" icon={faUser} /> */}
                                <div className="avatar-nav flex">
                                    <img width={20} src={userData.avatar} />
                                </div>
                            </Link>
                            <div className="logout" onClick={()=> dispatch({type: "USER_LOGOUT"})}>
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