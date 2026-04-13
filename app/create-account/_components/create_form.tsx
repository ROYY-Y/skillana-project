"use client"

import Link from "next/link"
import style from "./create_form.module.css"
import InputComponent from "@/app/_global_components/authen_pages/login_input"

import { useRef, useState } from "react"
import { error } from "console"

export default function CreateAccountForm(){
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)

    const [errors, setErrors] = useState<{
        [key: string]: [boolean, string]
    }>({
        firstName: [false, ""],
        lastName: [false, ""],
        email: [false, ""],
        password: [false, ""],
        confirmPassword: [false, ""]
    });

    function handleSubmit(){
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const pass = passRef.current?.value;
        const confirmPass = confirmPassRef.current?.value;

        const arr = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : pass,
            confirmPassword : confirmPass
        }
        
        Object.entries(arr).forEach(([key,value])=>{
            if(!value) {
                setErrors(prev => ({...prev, [key]: [true, `Please enter ${key == "email" ? "an" : "a"} ${key == "confirmPassword" ? "confirm password": key.toLowerCase()}.`]}));
            }
        })
        

    }

    return (<>
        <section className = {style.subBox}>
            <div>
                <h3>Create your account!</h3>
                <h6>Create an account so you can explore the website</h6>
            </div>
            
            <div style={{display: "flex", gap : "1em"}}>
                <InputComponent ref = {firstNameRef} label="First Name" size="small" placeholder="Enter your first name" 
                isError={errors.firstName[0]} message={errors.firstName[1]}
                />
                <InputComponent ref = {lastNameRef} label="Last Name" size="small" placeholder="Enter your last name"
                isError={errors.lastName[0]} message={errors.lastName[1]}
                />
            </div>

            <InputComponent ref = {emailRef} label="Email" size="large" placeholder="Enter your email" isPassword = {false}
            isError={errors.email[0]} message={errors.email[1]}
            />
            <InputComponent ref = {passRef} label="Password" size="large" placeholder="Enter your password" isPassword = {true}
            isError={errors.password[0]} message={errors.password[1]}
            />
            <InputComponent ref = {confirmPassRef} label="Confirm Password" size="large" placeholder="Confirm your password" isPassword = {true}
            isError={errors.confirmPassword[0]} message={errors.confirmPassword[1]}
            />
            <div style={{display : "flex", flexDirection : "column", gap : '.5em', alignItems : "center"}}>
                <button className= {style.createBtn} onClick={handleSubmit}>Sign up</button>
                <p>Already have an account? <Link href= "/login" className= {style.login}>Login</Link> </p>
            </div>
        </section>
    </>)
}