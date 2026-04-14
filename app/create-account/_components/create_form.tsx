"use client"

import Link from "next/link"
import style from "./create_form.module.css"
import InputComponent from "@/app/_global_components/authen_pages/login_input"
import { useRef, useState } from "react"
import { json } from "stream/consumers"
import { useRouter } from "next/navigation";

export default function CreateAccountForm(){
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const [errors, setErrors] = useState<{
        [key: string]: [boolean, string]
    }>({
        firstName: [false, ""],
        lastName: [false, ""],
        email: [false, ""],
        password: [false, ""],
        confirmPassword: [false, ""]
    });

    async function handleSubmit() {
        setIsLoading(true);
        
        const data = {
            firstName: firstNameRef.current?.value || "",
            lastName: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passRef.current?.value || "",
            confirmPassword: confirmPassRef.current?.value || ""
        };

        let hasEmptyField = false;

        Object.entries(data).forEach(([key, value]) => {
            if (!value.trim()) {
                let msg = `Please enter your ${key}.`;
                if (key === "firstName") msg = "Please enter your first name.";
                if (key === "lastName") msg = "Please enter your last name.";
                if (key === "confirmPassword") msg = "Please enter a confirm password.";
                else if (key === "email") msg = "Please enter an email.";
                
                handleError(key, true, msg);
                hasEmptyField = true;
            }
        });

        const hasExistingError = Object.values(errors).some(v => v[0] === true);

        if (hasEmptyField || hasExistingError) {
            setIsLoading(false);
            return;
        }

        // ---  API  ---
        // const res = await fetch("",{
        //     method : "POST",
        //     headers: {"Content-Type" : "application/json"},
        //     body : JSON.stringify({firstName : data.firstName, lastName : data.lastName, email: data.email, password: data.password})
        // })

        const otpRes = await fetch("http://localhost:3000/api/auth/otp",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email: data.email})
        })

        const otpData = await otpRes.json();

        if(!otpRes.ok){
            setIsLoading(false);
            console.error(otpData.message)
            return;
        }else{
            const pendingUserRes = await fetch("http://localhost:3000/api/auth/register/pending-users",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password})
            })
            const pendingData = await pendingUserRes.json()

            if(!pendingUserRes.ok){
                setIsLoading(false);
                console.error(pendingData.message)
                return;
            }else{
                sessionStorage.setItem("pending_email", data.email)
                sessionStorage.setItem("method","register")
                router.push("/verify")
            }
        }
        // ---------------------
        setIsLoading(false);
    }

    const handleError = (name: string, isError: boolean, message: string) => {
        setErrors(prev => ({
            ...prev,
            [name]: [isError, message] // ใช้ [] เพื่อดึงค่าจากตัวแปรมาเป็น Key
        }));
    };

    const handleOnchange = (name: string, value: string) => {
        if(value.trim()) handleError(name, false,"");
    };

    const handleEmailOnchange = (name: string, value: string) =>{
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            handleError(name, true,"Invalid email format.");
        }else handleError(name,false,"");
    }

    const validatePassword = (name: string, pass: string) => {
        const requirements = {
            length: pass.length >= 8,
            hasNumber: /[0-9]/.test(pass),
        };

        if (!requirements.length) return handleError(name, true ,"Password must be at least 8 characters long.");
        if (!requirements.hasNumber) return handleError(name, true ,"Password must contain at least one digit.");
        
        return handleError(name, false, ""); // ผ่านหมด
    };

    const handleConfirmPassword = (name: string, value : string) =>{
        if(value != passRef.current?.value) handleError(name, true, "Password is not match.")
        else handleError(name,false,"");
    }

    return (<>
        <section className = {style.subBox}>
            <div>
                <h3>Create your account!</h3>
                <h6>Create an account so you can explore the website</h6>
            </div>
            
            <div style={{display: "flex", gap : "1em"}}>
                <InputComponent ref = {firstNameRef} label="First Name" size="small" placeholder="Enter your first name" 
                isError={errors.firstName[0]} message={errors.firstName[1] } onChange={(value: string) => handleOnchange("firstName", value)}
                />
                <InputComponent ref = {lastNameRef} label="Last Name" size="small" placeholder="Enter your last name"
                isError={errors.lastName[0]} message={errors.lastName[1]} onChange={(value: string) => handleOnchange("lastName", value)}
                />
            </div>

            <InputComponent ref = {emailRef} label="Email" size="large" placeholder="Enter your email" isPassword = {false}
            isError={errors.email[0]} message={errors.email[1]} onChange={(value : string) => handleEmailOnchange("email",value)}
            />
            <InputComponent ref = {passRef} label="Password" size="large" placeholder="Enter your password" isPassword = {true}
            isError={errors.password[0]} message={errors.password[1]} onChange={(value : string) => validatePassword("password",value)}
            />
            <InputComponent ref = {confirmPassRef} label="Confirm Password" size="large" placeholder="Confirm your password" isPassword = {true}
            isError={errors.confirmPassword[0]} message={errors.confirmPassword[1]} onChange={(value: string)=> handleConfirmPassword("confirmPassword",value)}
            />
            <div style={{display : "flex", flexDirection : "column", gap : '.5em', alignItems : "center"}}>
                <button className= {style.createBtn} onClick={handleSubmit}>{isLoading ? <div className="spinner"></div> : "Sign up"}</button>
                <p>Already have an account? <Link href= "/login" className= {style.login}>Login</Link> </p>
            </div>
        </section>
    </>)
}