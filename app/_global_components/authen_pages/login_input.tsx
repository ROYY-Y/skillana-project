'use client'
import { forwardRef, useState } from "react";
import style from "./login_input.module.css";


interface InputProps {
    label : string;
    placeholder : string;
    size : "small" | "medium" | "large"; //small (create account) mediam (login) large (create account)
    isPassword? : boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, size, isPassword = false }, ref) => {

    const [showPassword,setShowPassword] = useState(false);

    return (
      <div className= {style.container}>
            <label className= {style.label}>{label}</label>
        <div className = {`${style.inputWrapper} ${style[size]}`}>
            <input ref={ref}
                placeholder={placeholder}
                type = {isPassword && !showPassword ? "password" : "text"}
                className= {style.inputBox}
            />

            {isPassword && (
                <img className= {style.eye} src={showPassword ? "eye.png" : "/eye_hidden.png"} onClick = {()=> setShowPassword(!showPassword)}></img>
            )}
        </div>
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;