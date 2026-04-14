"use client"
import { useRef, useEffect, useState } from "react"
import OtpInput from "./otp_input"
import style from "./otp_form.module.css"
import { useRouter } from "next/navigation";
export default function OtpForm(){
    
    const itemsRef = useRef<(HTMLInputElement | null)[]>([]); // รอทำงานเชื่อมกับ back-end
    const [email, setEmail] = useState("");
    const [method, setMethod] = useState("");
    const router = useRouter();
    useEffect(() => {
    // สั่งให้ช่องแรก (index 0) focus
        itemsRef.current[0]?.focus();
        const savedEmail = sessionStorage.getItem("pending_email");
        const savedMethod = sessionStorage.getItem("method");
        if(savedEmail && savedMethod){
            setEmail(savedEmail);
            setMethod(savedMethod)
        }else{
            router.replace('/login')
        }
    }, []);
    const handleFocusNext = (index: number) => {
        if (index < 5) {
            itemsRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // ถ้ากด Backspace และช่องปัจจุบันไม่มีค่า และไม่ใช่ช่องแรก
    if (e.key === "Backspace" && !itemsRef.current[index]?.value && index > 0) {
        // สั่งให้ช่องก่อนหน้า Focus
        itemsRef.current[index - 1]?.focus();
    }
    };

    const handleSubmit = async ()=>{
        const otpString = itemsRef.current
        .map((input) => input?.value || "") // ดึง value ออกมา ถ้าไม่มีให้เป็นค่าว่าง
        .join("");

        if (otpString.length != 6) {
            alert("Please enter all 6 digits");
            return;
        }

        const res = await fetch("http://localhost:3000/api/auth/otp/verify",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email: email, otp_code : otpString})
        })
        const data = await res.json();
        if(!res.ok){
            console.error(data.message)
            return;
        }else{
            if(method == "register"){
                const regis_res = await fetch("http://localhost:3000/api/auth/register",{
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({email: email})
                })
                const regis_data = await regis_res.json()
                if(!regis_res.ok){
                    console.error(regis_data.message)
                    return;
                }else{
                    const token = regis_data.token;
                    localStorage.setItem("token",token)
                    router.push("/home");
                }
            }else if(method == "login"){
                const token = localStorage.getItem("token")
                if(!token) router.replace("/login")
                else router.push("/home")
            }
        }
    }

    const resend = ()=>{

    }
    return (<>
        <section className={style.formBox}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <OtpInput
                    key={index}
                    // เก็บ Element ลงใน Array ตามลำดับ index
                    ref={(el) =>{
                        if (el) itemsRef.current[index] = el;
                    }}
                    onChange={(e: any) => {
                            if(!/^[0-9]*$/.test(e.target.value)){
                                e.target.value = "";
                                return;
                            }
                            if (e.target.value.length === 1) {
                            handleFocusNext(index);
                        }
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </section>
        <p style={{fontSize : "small"}}>Don’t received the verification codes? &nbsp;
        <button className= {style.resendBtn} onClick={resend}>Resend</button>
        </p>

        <button className= {style.verify} onClick={handleSubmit}>Verify</button>
    </>
    );
}