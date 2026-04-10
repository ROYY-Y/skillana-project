'use client'
import InputComponent from "@/app/_global_components/authen_pages/login_input"
import Link from "next/link"
import { useRef, useState } from "react"
import style from "./login_form.module.css"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Form(){
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [emailMessage, setEmailMessage] = useState("")

    useEffect(()=>{
        localStorage.removeItem("token");
    }, []);

    async function handleSubmit(){
        setIsLoading(true);
        const email = emailRef.current?.value
        const pass = passRef.current?.value

        if(!email && !pass){
            setEmailMessage("Plase enter an email.")
            setIsEmailError(true);
            setIsPasswordError(true);
            setIsLoading(false);
            return;
        }
        else if(!email){setEmailMessage("Plase enter an email."); setIsEmailError(true); setIsLoading(false); return;}
        else if(!pass){ setIsPasswordError(true);  setIsLoading(false); return;}

        try{
            const res = await fetch("/api/auth/login",{
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password : pass}),
            })

            const data = await res.json();

            if(res.ok){
                localStorage.setItem("token", data.token);
                alert("Login สำเร็จ");
                router.push("/");
            }
        }
        catch(error){
            console.error(error)
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleEmailChange = (value: string) => {
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            setEmailMessage("Invalid email format.")
            setIsEmailError(true);
        }else setIsEmailError(false);
        
    };
    const handlePasswordChange = (value: string) =>{

        if(value) setIsPasswordError(false);
    }

    return(
        <>
            <div className={style.container}>
                <InputComponent ref={emailRef}  label="Email" placeholder="Enter your email" size= "medium" isPassword = {false}
                    onChange={handleEmailChange} isError = {isEmailError} message={emailMessage}
                ></InputComponent>
                <div>
                    <InputComponent ref={passRef} label="Password" placeholder="Enter your password"
                     size= "medium" isPassword = {true} isError = {isPasswordError} message={isPasswordError ? "Please enter a password." : ""}
                     onChange={handlePasswordChange}
                     ></InputComponent>
                    <Link href = "#" className = {style.link} >Forgot password?</Link>
                </div>

                <div style={{display: "flex", flexDirection : "column", gap : ".5em", width : "100%", alignItems : "center"}}>
                    <button className= {style.loginBtn} onClick={handleSubmit}>{isLoading ? <div className="spinner"></div> : "Login"}</button>
                    <p>Don't have an account? <Link href= "/create-account" className= {style.signUp}>Sign up</Link> </p>
                </div>
            </div>
        </>
    )
}