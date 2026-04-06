'use client'
import InputComponent from "@/app/_global_components/authen_pages/login_input"
import Link from "next/link"
import { useRef } from "react"
import style from "./login_form.module.css"

export default function Form(){

    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    function handleSubmit(){
        const email = emailRef.current?.value
        const pass = passRef.current?.value

        console.log({ email, pass });
    }

    return(
        <>
            <div className={style.container}>
                <InputComponent ref={emailRef}  label="Email" placeholder="Enter your email" size= "medium" isPassword = {false}></InputComponent>
                <div>
                    <InputComponent ref={passRef} label="Password" placeholder="Enter your password" size= "medium" isPassword = {true}></InputComponent>
                    <Link href = "#" className = {style.link}>Forgot password?</Link>
                </div>

                <div style={{display: "flex", flexDirection : "column", gap : ".5em", width : "100%", alignItems : "center"}}>
                    <button className= {style.loginBtn} onClick={handleSubmit}>Login</button>
                    <p>Don't have an account? <Link href= "#" className= {style.signUp}>Sign up</Link> </p>
                </div>
            </div>
        </>
    )
}