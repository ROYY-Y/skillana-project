"use client"
import { useRef, useEffect } from "react"
import OtpInput from "./otp_input"
import style from "./otp_form.module.css"
export default function OtpForm(){
    
    const itemsRef = useRef<(HTMLInputElement | null)[]>([]); // รอทำงานเชื่อมกับ back-end
    useEffect(() => {
    // สั่งให้ช่องแรก (index 0) focus
        itemsRef.current[0]?.focus();
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

    const handleSubmit = ()=>{

    }

    const verify = ()=>{

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
        <button className= {style.resendBtn} onClick={verify}>Resend</button>
        </p>

        <button className= {style.verify} onClick={handleSubmit}>Verify</button>
    </>
    );
}