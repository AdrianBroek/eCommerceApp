import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "../actions/loginAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faWrench, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Login = () => {
    const dispatch = useDispatch()
    const {logged, userData} = useSelector(state => state.loggedStatus)

    const [data, setData] = useState({
        mail: "",
        password: "",
        id: ""
    })
    const [er,setEr] = useState({
        active: false,
    })

    useEffect(()=> {
        // console.log(data.id)
        if (data.id){
            dispatch(loginAction(data))
        }
        
    },[data.id])

    const storage = JSON.parse(window.localStorage.getItem('user'))

    function mailCheck(e){
        setData(prevState => ({
            ...prevState,
            mail:e.target.value
        })
        )
    }

    function passCheck(e){
        setData(prevState => ({
            ...prevState,
            password:e.target.value
        })
        )
    }

    function checkData(){
        let loggedUser
        if(storage) {
            loggedUser = storage.filter(item => 
                item.password == data.password
                &&
                item.email == data.mail
            )
            if (loggedUser.length > 0) {
                setData(prevState => ({
                    ...prevState,
                    id: loggedUser[0].id
                }))
            }else {
                setEr({active : true})
            }
        }else {
            setEr({active : true})
        }
        // console.log(storage)
       
    }

    // useEffect(()=> {
    //     console.log(er)
    // }, [er])

    function submitHandler(e){
        e.preventDefault()
        checkData()
    }

    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)

    return (
        <section id="loginPage">
        <form novalidate="novalidate" onSubmit={(e)=>submitHandler(e)}>
            <h2>Login to your Walmart account!</h2>
            <div className="email">
                <input required novalidate className={er.active ? 'er' : ''} type="text" onChange={mailCheck}/>
                <label for="email">Email</label>
            </div>
            <div className="password">
                <input type={passwordShown ? "text" : "password"} required novalidate className={er.active ? 'er' : ''} onChange={passCheck}/>
                <label for="password">Password</label>
                <div onClick={()=>setPasswordShown(!passwordShown)}>
                        {passwordShown ? 
                            <FontAwesomeIcon icon={faEyeSlash}/>
                            :
                            <FontAwesomeIcon icon={faEye}/>    
                        }
                    </div>
            </div>
            <motion.button whileTap={{scale: .95}} className="a" type="submit">Login</motion.button>
            <motion.button whileTap={{scale: .95}} className="abutton b">
                <Link to="/register">Register</Link>
            </motion.button>
        </form>
        {logged && (
            <div className="popup">
                <p>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </p>
                <p>You are <strong>logged</strong> in {userData.username}!</p>
                <Link className="abutton a" to='/my_account'>Got it!</Link>
            </div>
        )}
        {er.active ? (
            <div className="popup">
                <p>
                    <FontAwesomeIcon icon={faWrench} />
                </p>
                <p>User not found.<br /> Correct wrong inputs.</p>
                <button onClick={()=>setEr({active: false})} className="abutton a">Got it!</button>
            </div>
        )
        :
        ""
        }
        </section>
    )
}

export default Login



// po wpisaniu i zatwierdzeniu błędnytch danych do formularza
// aby wyskoczył komunikat o błędnych danych