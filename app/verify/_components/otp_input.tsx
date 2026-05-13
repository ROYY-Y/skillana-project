"use client"
import { forwardRef, ComponentPropsWithoutRef } from "react"
import style from "./otp_input.module.css"

// สร้าง Interface ใหม่เพื่อรับ isError เพิ่มเติมจาก input ปกติ
interface OtpInputProps extends ComponentPropsWithoutRef<"input"> {
  isError?: boolean;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  ({ isError, className, ...props }, ref) => {
    return (
      <input 
        {...props} 
        ref={ref} 
        type="text" 
        className={`${style.otpBox} ${isError ? style.errorBorder : ""} `}
        maxLength={1} 
        inputMode="numeric" 
        pattern="[0-9]*"
      />
    )
  }
)

OtpInput.displayName = "OtpInput"

export default OtpInput;