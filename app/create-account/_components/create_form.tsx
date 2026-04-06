"use client"

import Link from "next/link"
import style from "./create_form.module.css"
import InputComponent from "@/app/_global_components/authen_pages/login_input"

import { useRef } from "react"

export default function CreateAccountForm(){
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)

    function handleSubmit(){
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const pass = passRef.current?.value;
        const confirmPass = confirmPassRef.current?.value;

        console.log({firstName, lastName, email, pass, confirmPass})

    }

    return (<>
        <section className = {style.subBox}>
            <div>
                <h3>Create your account!</h3>
                <h6>Create an account so you can explore the website</h6>
            </div>
            
            <div style={{display: "flex", gap : "1em"}}>
                <InputComponent ref = {firstNameRef} label="First Name" size="small" placeholder="Enter your first name"></InputComponent>
                <InputComponent ref = {lastNameRef} label="Last Name" size="small" placeholder="Enter your last name"></InputComponent>
            </div>

            <InputComponent ref = {emailRef} label="Email" size="large" placeholder="Enter your email" isPassword = {false}></InputComponent>
            <InputComponent ref = {passRef} label="Password" size="large" placeholder="Enter your password" isPassword = {true}></InputComponent>
            <InputComponent ref = {confirmPassRef} label="Confirm Password" size="large" placeholder="Confirm your password" isPassword = {true}></InputComponent>
            <div style={{display : "flex", flexDirection : "column", gap : '.5em', alignItems : "center"}}>
                <button className= {style.createBtn} onClick={handleSubmit}>Sign up</button>
                <p>Already have an account? <Link href= "#" className= {style.login}>Login</Link> </p>
            </div>
        </section>
    </>)
}