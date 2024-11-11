import React, {useState} from "react";
import { useForm } from "react-hook-form"
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { inputsValidate } from "../functions/inputValidate";
import registerAction from "../actions/registerAction";
import uuid from "react-uuid";
import { checkIfMailExist } from "../functions/inputValidate";
import popupAction from "../actions/popupAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { showError } from "../animations";
import { Errorfield } from "../components/Errorfield";

const schema = z
    .object({
    username: z.string().min(3, {message: "Username name must be at least 3 characters"})
    .refine((val)=> {
        return /^[A-ZŁĆŹŻĄĘ][a-ząęćżźół0-9]*$/.test(val);
    },{message: "Username must start with a big letter"})
    ,firstname: z.string().min(3, { message: 'First name must be at least 3 characters' })
        .refine((val)=> {
            inputsValidate(true);
            return /^[A-ZŁĆŹŻ][a-ząęćżźół]*$/.test(val);
        },{message: "First name must start with a big letter"}),
    lastname: z.string().min(3, { message: 'Last name must be at least 3 characters' })
        .refine((val)=> {
            inputsValidate(true);
            return /^[A-ZŁĆŹŻ][a-ząęćżźół]*$/.test(val);
        },{ message: 'Last name must start with a big letter' }),
    address: z.string().min(3, { message: 'Address must be at least 3 characters' })
        .refine((val)=> {
            inputsValidate(true);
            return /^[A-ZŁĆŹŻ][a-ząęćżźół0-9./-_><\s]*$/.test(val);
        },{ message: 'Address ma miec duza litere na poczatku' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email('Invalid email address')
        .refine((val) => {
        inputsValidate(true);
        return /^[A-Z]/.test(val);
        }, {
        message: "Email must start with a big letter"
        }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .refine((val) => {
            inputsValidate(true);
            return /[A-Z]/.test(val);
        }, { message: "Password must contain at least one big letter" })
        .refine((val) => {
            inputsValidate(true);
            return /[^\w\s]/.test(val);
        }, { message: "Password must contain at least one special symbol" }),
    confirmPassword: z
    .string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
    });

const RegisterPage = () => {
    // password input hide/show
    const [passwordShown, setPasswordShown] = useState(false)

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors , isSubmitting},
      } = useForm({
        resolver: zodResolver(schema),
      })

    const onSubmit = (data) => {
        const input = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            id: uuid(),
            address: data.address
        }
        const ensureEmailDoesNotExist = (email) => {
            if (!checkIfMailExist(email)) throw new Error("This email address already exist in our database");
        };        
        
        try {
            ensureEmailDoesNotExist(input.email);
            dispatch(registerAction(input));
            dispatch(popupAction('success',`User ${input.username} registered!`))
        } catch (error) {
            setError("root", {
                message: error.message
            })
        }
    }

    return (
        <section id="registerPage">
            <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
                <h2>Register a Walmart account!</h2>

                <div className="input-container">
                    <div className="name">
                        <input placeholder="username" {...register("username")} required id="username"/>
                        <label htmlFor="username">username</label>
                    </div>
                    <AnimatePresence>
                        {errors.username && (
                            <Errorfield key={errors.username.message} message={errors.username.message} />
                        )}
                    </AnimatePresence>
                </div>

                <div className="input-container">
                    <div className="name">
                        <input placeholder="first name" {...register("firstname")} required id="firstname"/>
                        <label htmlFor="firstname">firstname</label>
                    </div>
                    <AnimatePresence>
                        {errors.firstname && (
                            <Errorfield key={errors.firstname.message} message={errors.firstname.message} />
                        )}
                    </AnimatePresence>                
                </div>

                <div className="input-container">
                    <div className="name">
                        <input placeholder="last name" {...register("lastname")} required id="lastname"/>
                        <label htmlFor="lastname">lastname</label>
                    </div>
                    <AnimatePresence>
                        {errors.lastname && (
                            <Errorfield key={errors.lastname.message} message={errors.lastname.message} />
                        )}
                    </AnimatePresence>  
                </div>

                <div className="input-container">
                    <div className="address">
                        <input placeholder="address" {...register("address")} required id="address"/>
                        <label htmlFor="address">address</label>
                    </div>
                    <AnimatePresence>
                        {errors.address && (
                            <Errorfield key={errors.address.message} message={errors.address.message} />
                        )}
                    </AnimatePresence> 
                </div>

                <div className="input-container">
                    <div className="name">
                        <input className="email" {...register("email")} required placeholder="email" id="email"/>
                        <label htmlFor="email">email</label>
                    </div>
                    <AnimatePresence>
                        {errors.email && (
                            <Errorfield key={errors.email.message} message={errors.email.message} />
                        )}
                    </AnimatePresence> 
                </div>

                <div className="input-container">
                    <div className="password">
                        <input type={passwordShown ? "text" : "password"} required className="password" placeholder="password" {...register("password", {required: "password is required"})} id="password"/>
                        <label htmlFor="password">password</label>
                        <div onClick={()=>setPasswordShown(!passwordShown)}>
                            {passwordShown ? 
                                <FontAwesomeIcon icon={faEyeSlash}/>
                                :
                                <FontAwesomeIcon icon={faEye}/>    
                            }
                        </div>
                    </div>
                    <AnimatePresence>
                        {errors.password && (
                            <Errorfield key={errors.password.message} message={errors.password.message} />
                        )}
                    </AnimatePresence> 
                </div>

                <div className="input-container">
                    <div className="password">
                        <input type={passwordShown ? "text" : "password"} placeholder="confirm" className="password" required {...register("confirmPassword")} id="confirmpassw"/>
                        <label htmlFor="confirmpassw">confirm</label>
                        <div onClick={()=>setPasswordShown(!passwordShown)}>
                            {passwordShown ? 
                                <FontAwesomeIcon icon={faEyeSlash}/>
                                :
                                <FontAwesomeIcon icon={faEye}/>    
                            }
                        </div>
                    </div>
                    <AnimatePresence>
                        {errors.confirmPassword && (
                            <Errorfield key={errors.confirmPassword.message} message={errors.confirmPassword.message} />
                        )}
                    </AnimatePresence> 
                </div>

                <motion.button whileTap={{scale: .95}} className="abutton a" disabled={isSubmitting} type="submit"> 
                    {isSubmitting ? "Loading" : "Submit"}
                </motion.button>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                <div className="textfield-support-container">
                    <AnimatePresence>
                        {errors.root && (
                            <Errorfield key={errors.root.message} message={errors.root.message} />
                        )}
                    </AnimatePresence> 
                </div>
            </form>
        </section>
    )
}

export default RegisterPage;