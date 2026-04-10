'use client'
import { useEditContext } from "../edit";
import style from "./popup.module.css"

export default function Popup() {  
    const {isEdit , setEditing, saveData, reset} = useEditContext();

    if (!isEdit) return null;

    return (
        <>
            <div  className = {style.popupBar} onClick={() => setEditing(false)}>
                <div className = {style.popupContent} >
                    <button className = {style.resetButton} onClick={() => {setEditing(false); reset();}}>
                        Reset
                    </button>
                    <button className = {style.saveButton} onClick={() => {setEditing(false); saveData();}}>
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    )
}

