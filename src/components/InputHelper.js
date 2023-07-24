import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";

const InputHelper = ({activeInput}) => {

    useEffect(()=> {
        // console.log(activeInput)
    },[activeInput])



    return (
        <section id='input-helper'>
           {activeInput == 'username' ? <p>User-name should have one <b>big letter</b> and <b>min. 3 letters</b></p> : ''}
           {activeInput == 'firstname' ? <p>Firstname should have one <b>big letter</b> and <b>min. 3 letters</b></p> : ''}
           {activeInput == 'lastname' ? <p>Lastname should have one <b>big letter</b> and <b>min. 3 letters</b></p> : ''}
           {activeInput == 'password' ? <p>Password should have one <b>big letter</b>, <b>min 3 letters</b> and <b>one special letter</b> and <b>one number</b></p> : ''}
           {activeInput == 'email' ? <p>Email should have <b>one big letter</b>, <b>min 3 letters</b>, <b>dot and monkey sign</b></p> : ''}
           {activeInput == 'address' ? <p>Address should have <b>one big letter</b>, <b>min 3 letters</b> and <b>one special letter</b></p> : ''}
        </section>
    )
}

export default InputHelper