"use client"
import { forwardRef, ComponentPropsWithoutRef } from "react"
import style from "./otp_input.module.css"

// ใช้ ComponentPropsWithoutRef<"input"> จะง่ายกว่ามาก
const OtpInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  (props, ref) => {
    return (
      <input 
        {...props} // มึงอย่าลืมใส่ตัวนี้ เพื่อให้ onChange จากไฟล์แม่ทำงาน!
        ref={ref} 
        type="text" 
        className={style.otpBox} 
        maxLength={1} 
        inputMode="numeric" 
        pattern="[0-9]*"
      />
    )
  }
)

OtpInput.displayName = "OtpInput"

export default OtpInput;