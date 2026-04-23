import { Slabo_13px } from "next/font/google"
import styles from "./dot.module.css"

interface InputProps{
    focus : boolean,
    done : boolean
}

export default function Dot({focus, done} : InputProps){
    return (
        <div className= {`${styles.dot} ${focus ? styles.dotFocus : " "} ${done ? styles.done : ""}`}></div>
    )
}