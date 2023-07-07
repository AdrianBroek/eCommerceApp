import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerAction from "../actions/registerAction";
import noImgAvatar from '../images/avatar/no-pic-avatar.png';
import {
    inputsValidate,
    containsUppercase,
    checkMail,
    checkPassw
} from '../components/inputValidate'
import SuccesPopup from "../components/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarDeaf, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import popupAction from "../actions/popupAction";
import Order from "../components/Order";
import InputHelper from "../components/InputHelper";

const AccountPage = () => {

    const dispatch = useDispatch()

    const { logged, userData } = useSelector(state => state.loggedStatus)
    const [data, setData] = useState({
        username: userData ? userData.username : null,
        email: userData ? userData.email : null,
        firstname: userData ? userData.firstname : null,
        lastname: userData ? userData.lastname : null,
        password: userData ? userData.password : null,
        address: userData ? userData.address : null,
        id: userData.id,
        avatar: userData ? userData.avatar : null,
        order: userData ? userData.order : null,
    })
    const [activePopup, setActivePopup] = useState({
        open: false,
        confirm: false,
        valid: false
    })
    const [correctCheck, setCorrectCheck] = useState({
        username: false,
        firstname: false,
        lastname: false,
        email: false,
        address: false,
        password: false,
    })

    useEffect(()=> {
        if(correctCheck.username && correctCheck.firstname && correctCheck.lastname && correctCheck.email && correctCheck.address && correctCheck.password){
            setActivePopup(prevState => ({
                ...prevState,
                valid: true
            }))
        }

    }, [correctCheck])


    function inputHandler(e){
        switch(e.target.id) {
            case "username" :
                setData((state) => ({...state, username: e.target.value}))
                break;
            case "firstname" :
                setData((state) => ({...state, firstname: e.target.value}))
                break;
            case "lastname" :
                setData((state) => ({...state, lastname: e.target.value}))
                break;
            case "email" :
                setData((state) => ({...state, email: e.target.value}))
                break;
            case "address" :
                setData((state) => ({...state, address: e.target.value}))
                break;
            case "password" :
                setData(state => ({...state, password: e.target.value}))
                break;
        }
    }

    function submitHandler (e){
        e.preventDefault();

        const inputs = document.querySelectorAll('input')
        inputs.forEach((element, index) => {
            if (element.value.length >= 6){
                // if has more than 5 letters - start

                if (containsUppercase(element.value)){
                    // if has 1 uppercase letter
                    element.style.border="2px solid green"
                    // console.log(element.id)
                    switch(element.id){
                        case "username": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                username: true,
                            }))                            
                            break
                        }
                        case "firstname": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                firstname: true,
                            }))                            
                            break
                        }
                        case "lastname": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                lastname: true,
                            }))                            
                            break
                        }
                        case "email": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                email: true,
                            }))                           
                            break
                        }
                        case "address": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                address: true,
                            }))                             
                            break
                        }
                        case "password": {
                            setCorrectCheck(prevState => ({
                                ...prevState,         
                                password: true,
                            }))                            
                            break
                        }
                        default :
                            return setCorrectCheck(prevState => ({...prevState}))
                    }
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
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            email: true,
                        }))  
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
                        setCorrectCheck(prevState => ({
                            ...prevState,         
                            password: true,
                        })) 
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
    }

    // validate
    useEffect(()=> {
        inputsValidate()
    }, [inputHandler])

    function confirm(){
        // console.log('confirm')
        setActivePopup(state => ({
            ...state,
            open: true
        }))
    }

    useEffect(()=> {

        if(activePopup.confirm === true && activePopup.open === false && activePopup.valid === true) {
            dispatch(registerAction(data))
            .then(
                setActivePopup(prevState => ({
                ...prevState,
                open: false,
                confirm: false,
                valid: false
            }))
            )
            .then(
                setCorrectCheck(prevState => ({
                    username: false,
                    firstname: false,
                    lastname: false,
                    email: false,
                    address: false,
                    password: false,
                }))
            )
            dispatch(popupAction('success'))
        }else if (activePopup.confirm === false && activePopup.open === true && activePopup.valid === false)  {
            dispatch(popupAction('error'))
        }
    }, [activePopup])

    // Avatar 

    const [avatarName, setAvatarName] = useState('realease or click to upload file')

    const fileInput = useRef()

    function avatarHandler(e){
        // console.log(e.target.files[0].name)
        const file = new FileReader()
        setAvatarName(e.target.files[0].name)
        file.readAsDataURL(e.target.files[0])
        if(isImage(e.target.files[0].name)){
            file.addEventListener('load', (res) => {
                const url = file.result
                
                setData(state => ({
                    ...state,
                    avatar: url
                }))
                dispatch(popupAction('success'))
            })
        }else {
            dispatch(popupAction('error'))
        }
    }

    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    function isImage(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
            case 'webp':
            //etc
            return true;
        }
        return false;
    }

    const fileInputDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.current.style.opacity="0.95"
        setAvatarName('release or click to upload picture')
    };

    const fileInputDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.current.style.opacity="0.3"
        setAvatarName('')
    };

    const fileInputDragDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.current.style.opacity="0.3"
        // file name
        const fileData = e.dataTransfer.files[0];
        setAvatarName(fileData.name)

        
        if(isImage(fileData.name)){
            // file upload
            const file = new FileReader()
            file.readAsDataURL(e.dataTransfer.files[0])
            file.addEventListener('load', (res) => {
                const url = file.result
                // console.log(res)
                setData(state => ({
                    ...state,
                    avatar: url
                }))
                dispatch(popupAction('success'))
            })
        }else {
            dispatch(popupAction('error'))
        }
        
    };
    // Avatar ends

    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)

    //input helper
    const [finput, setFinput] = useState()

    function setFocusInput (e){
        setFinput(e.target.id)
        // console.log(finput)
    }
   

    return (
        <section id="acc_page">
            {logged ? (
                <div>
                    <form novalidate="novalidate" onSubmit={submitHandler}>
                        <div className="input-helper-container">
                            {finput ? 
                                <InputHelper activeInput={finput}/>
                            : "" }
                        </div>
                        <div className="avatar-container flex">
                            <img 
                            src={data.avatar ? data.avatar : userData.avatar} 
                            />
                            <div ref={fileInput} className="input-file-avatar">                            
                                <label className="flex" for="avatar_input">{avatarName ? avatarName : "Change avatar"}</label>
                                <input 
                                onChange={avatarHandler} 
                                onDragEnter={e => fileInputDragEnter(e)}
                                onDragLeave={e => fileInputDragLeave(e)}
                                onDrop={e => fileInputDragDrop(e)}
                                type="file" 
                                id="avatar_input"
                                />
                            </div>
                        </div>
                        <h2>My account</h2>
                        <div className="username">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate id="username" name="username" onChange={inputHandler} type="text" value={data.username} />
                            <label for="username">User name</label>
                        </div>
                        <div className="firstname">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate id="firstname" name="firstname" onChange={inputHandler} type="text" value={data.firstname} />
                            <label for="firstname">First name</label>
                        </div>
                        <div className="lastname">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate id="lastname" name="lastname" onChange={inputHandler} type="text" value={data.lastname} />
                            <label for="lastname">Last name</label>
                        </div>
                        <div className="email">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate className="email" id="email" name="email" onChange={inputHandler} type="text" value={data.email} />
                            <label for="email">Email</label>
                        </div>
                        <div className="address">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate id="address" name="address" onChange={inputHandler} type="text" value={data.address} />
                            <label for="address">Address</label>
                        </div>
                        <div className="password">
                            <input onBlur={()=>setFinput('')} onFocus={(e)=>setFocusInput(e)} required novalidate className="password" id="password" name="password" onChange={inputHandler} type={passwordShown ? "text" : "password"} value={data.password} />
                            <label for="password">Password</label>
                            <div onClick={()=>setPasswordShown(!passwordShown)}>
                                {passwordShown ? 
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    :
                                    <FontAwesomeIcon icon={faEye}/>    
                                }
                            </div>
                            
                        </div>
                        <button onClick={confirm} type="submit">Update</button>                
                    </form>
                </div>
            ) : (
                <button style={{marginTop: '1rem'}} className="buttona a flex">
                    <Link to="/login">
                        Login
                    </Link>
                </button>
            )}
            {activePopup.open ? 
            (
                <div className="confirmation">
                    Are you sure to change your account data?
                    <button disabled={activePopup.valid ? false : true} onClick={() => setActivePopup(prevState => ({...prevState, confirm: true, open: false}))}>Yes</button>
                    <button onClick={() => setActivePopup(prevState => ({...prevState, confirm: false, open: false}))}>I'm not</button>
                </div>
            ) : (
                <></>
            )}
            {logged && userData.order ? (
            <section id="order-acc">
                {userData.order && (
                    <div className="order-acc-container">
                        <h2 className="title">My orders:</h2>
                        {userData.order.map((order)=> (
                            <Order id={order}/>
                        ))}
                    </div>
                )}
                
            </section> 
            ) : ""
            }
        </section>
    )
}

export default AccountPage