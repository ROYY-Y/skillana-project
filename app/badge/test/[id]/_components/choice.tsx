import styles from "./choice.module.css"

interface InputProps{
    text : String,
    isSelected : boolean,
}

export default function Choice({ text, isSelected }: InputProps){
    return(
        <>
            <div className={`${styles.choice} ${isSelected ? styles.selected : ""}`}>{text}</div> 
        </>
    )
}