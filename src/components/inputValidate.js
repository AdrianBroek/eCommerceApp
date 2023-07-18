export  function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }
    
export  function checkMail(str) {
        if (/[@]/.test(str)){
            return /[.]/.test(str)
        }
    }
    
export function checkPassw(str) {
        if (/[123456789]/.test(str)){
            return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
        }
    }

// validate
export function inputsValidate(register){
    const inputs = document.querySelectorAll('form input')
    // console.log(inputs)
    inputs.forEach((element, index) => {
        if (element.value.length != 0){
        if (element.value.length >= 3){
            // if has more than 5 letters - start
            if (containsUppercase(element.value)){
                // if has 1 uppercase letter
                element.style.border="2px solid green"

            } else {
                element.style.border="2px solid red"
            }

            if (element.classList.contains("email")){
                // check mail
                // if register(registerPage) is true, check if mail is already existed as well
                if(register){
                    if (checkMail(element.value) && checkIfMailExist(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                    }else {
                        element.style.border="2px solid red"
                    }
                }else{
                    // console.log(element.value)
                    if (checkMail(element.value)){
                        element.classList.remove('wrong')
                        element.style.border="2px solid green"
                    }else {
                        element.style.border="2px solid red"
                    }
                }
                
            }
            if (element.classList.contains("password")){
                // check passw

                // console.log(element.value)
                if (checkPassw(element.value)){
                    element.style.border="2px solid green"
                } else {
                    element.style.border="2px solid red"
                }
            }
        } else {
                element.style.border="2px solid red"
            }

    }});
}

export function checkIfMailExist(mail){
    const storage = JSON.parse(window.localStorage.getItem('user'))
    let check
    // check if mail variable is in storage
    if(storage != null){
        const loggedUser = storage.filter(item => 
            item.email == mail
        )
        // if yes then email exists = put check variable to false
        if(loggedUser.length > 0){
    
            check = false
        }else {
            // if no then email is free to use
            // = put check variable to true
            check = true
        }
    }else {
        check = true
    }
    

    return check
}