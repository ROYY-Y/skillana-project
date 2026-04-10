'use client'
import { forwardRef, useState, ChangeEvent } from "react";
import style from "./login_input.module.css";
import "@/app/globals.css"
interface InputProps {
    label : string;
    placeholder : string;
    size : "small" | "medium" | "large"; //small (create account) mediam (login) large (create account)
    isPassword? : boolean;
    onChange?: (value: string) => void;
    isError? : boolean;
    message? : string;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, size, isPassword = false, onChange , isError = false, message}, ref) => {

    const [showPassword,setShowPassword] = useState(false);   
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // ส่งแค่ค่า string กลับไปให้แม่
    }
  };
    return (
      <div className= {style.container}>
            <label className= {style.label}>{label}</label>
        <div className = {`${style.inputWrapper} ${style[size]} ${style.inputBox}`}>
            <input ref={ref}
                placeholder={placeholder}
                type = {isPassword && !showPassword ? "password" : "text"}
                className= {`${style.inputBox} ${isError ? style.error : ""}`}
                onChange={handleChange}
            />
            <p className="errorP">{isError ? message : ""}</p>
            {isPassword && (
                <img className= {style.eye} src={showPassword ? "/eye.png" : "/eye_hidden.png"} onClick = {()=> setShowPassword(!showPassword)}></img>
            )}
        </div>
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;