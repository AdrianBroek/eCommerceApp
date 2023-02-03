import React from "react";
import logo from '../images/walmartLogo.svg'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Navbar = () => {

    const {logged, userData} = useSelector(state => state.loggedStatus)

    return (
        <header id='navbar'>
            <div className="logoContainer">
                <Link to='/'>
                    <img src={logo} />
                </Link>
                {!logged ? (
                    <Link to='/register'>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Link>
                ): (
                    <Link to='/my_account'>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                )}

            </div>
        </header>
    )
}

export default Navbar