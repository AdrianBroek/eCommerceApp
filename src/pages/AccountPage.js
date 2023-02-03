import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerAction from "../actions/registerAction";
import testAvatar from '../images/avatar/text_avatar.png'

const AccountPage = () => {

    const dispatch = useDispatch()

    const { logged, userData } = useSelector(state => state.loggedStatus)
    const [data, setData] = useState({
        username: userData ? userData.username : null,
        email: userData ? userData.email : null,
        password: userData ? userData.password : null,
        address: userData ? userData.address : null,
        id: userData.id
    })
    const [activePopup, setActivePopup] = useState({
        open: false,
        confirm: false,
        correctCheck: {
            name: false,
            email: false,
            address: false,
            password: false,
            valid: false,
        } 
    })

    useEffect(()=> {
        // console.log(JSON.parse(localStorage.getItem('user')))
    }, [data])



    function inputHandler(e){
        switch(e.target.id) {
            case "name" :
                setData((state) => ({...state, username: e.target.value}))
                break;
            case "email" :
                setData((state) => ({...state, email: e.target.value}))
                break;
            case "address" :
                setData((state) => ({...state, address: e.target.value}))
                break;
            case "password" :
                setData((state) => ({...state, password: e.target.value}))
                break;
        }
    }

    function submitHandler (e){
        e.preventDefault();
    }

    // validate
    useEffect(()=> {

        function containsUppercase(str) {
            return /[A-Z]/.test(str);
        }

        function checkMail(str) {
            if (/[@]/.test(str)){
                return /[.]/.test(str)
            }
        }

        function checkPassw(str) {
            if (/[123456789]/.test(str)){
                return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
            }
        }

        const inputs = document.querySelectorAll('input')
        inputs.forEach((element, index) => {
            if (element.value.length >= 6){
                // if has more that 5 letters - start

                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
                    element.style.border="2px solid green"
                    console.log(element.id)
                    // switch(element.id){
                    //     case "name" :
                    //         setActivePopup( prevState => ({
                    //             ...prevState,
                    //             name: true
                    //         }))
                    //         break;
                    //     case "email" :
                    //         setActivePopup( prevState => ({
                    //             ...prevState,
                    //             email: true
                    //         }))
                    //         break;
                    //     case "address" :
                    //         setActivePopup( prevState => ({
                    //             ...prevState,
                    //             address: true
                    //         }))
                    //         break;
                    //     case "password" :
                    //         setActivePopup( prevState => ({
                    //             ...prevState,
                    //             password: true
                    //         }))
                    //         break;
                    //     default :
                    //         return setActivePopup( prevState => ({
                    //             ...prevState
                    //         }))
                    //         break;
                    // }
                } else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }

                if (element.classList.contains("email")){
                    // check mail

                    // console.log(element.value)
                    if (checkMail(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                    }else {
                        element.style.border="2px solid red"
                        element.classList.add('wrong')
                        setTimeout(()=> {
                            element.classList.remove('wrong')
                        },[1000])
                    }
                }
                if (element.classList.contains("password")){
                    // check passw

                    // console.log(element.value)
                    if (checkPassw(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                    } else {
                        element.style.border="2px solid red"
                        element.classList.add('wrong')
                        setTimeout(()=> {
                            element.classList.remove('wrong')
                        },[1000])
                    }
                }
            } else {
                    element.style.border="2px solid red"
                    element.classList.add('wrong')
                    setTimeout(()=> {
                        element.classList.remove('wrong')
                    },[1000])
                }

        });
    }, [inputHandler])

    function confirm(){
        console.log('confirm')
        setActivePopup(state => ({
            ...state,
            open: true
        }))
    }

    useEffect(()=> {
        if(activePopup.confirm === true && activePopup.open === false && activePopup.correctCheck.valid === true) {
            dispatch(registerAction(data))
            .then(setActivePopup({
                open: false,
                confirm: false
            }))
        }
    }, [activePopup])

    return (
        <section id="acc_page">
            {logged ? (
                <div>
                    <form onSubmit={submitHandler}>
                        <img src={testAvatar} />
                        <h2>My account</h2>
                        <div className="name">
                            <input id="name" name="name" onChange={inputHandler} type="text" value={data.username} />
                            <label for="name">Name</label>
                        </div>
                        <div className="email">
                            <input className="email" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        <div className="password">
                            <input className="password" id="password" name="password" onChange={inputHandler} type="password" value={data.password} />
                            <label for="password">Password</label>
                        </div>
                        <button onClick={confirm} type="submit">Update</button>                
                    </form>
                    
                </div>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
            {activePopup.open ? 
            (
                <div className="confirmation">
                    Are you sure to change your account data?
                    <button onClick={() => setActivePopup(prevState => ({confirm: true, open: false}))}>Yes</button>
                    <button onClick={() => setActivePopup(prevState => ({confirm: false, open: false}))}>I'm not</button>
                </div>
            ) : (
                <></>
            )}
        </section>
    )
}

export default AccountPage