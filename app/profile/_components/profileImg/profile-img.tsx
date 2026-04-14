import imgstyle from './profile-img.module.css';
import style from "../../profile.module.css"
import { useEditContext } from '../edit';
import { UploadButton } from "./upload";
import { useState } from 'react';


export default function ProfileImg() {

    const {isEdit, updateTempField, tempData} = useEditContext();
    const [isUploading, setIsUploading] = useState(false);
    
    return (
        <>
        
        <div id="profile-container" className={imgstyle.profileContainer}>

                <div id="profile-img-wrapper" className={imgstyle.imgWrapper}>
                    <img src={tempData.profileImg || "logo.png"} alt="Profile Picture" id="profile-img" className={imgstyle.img} />
                    <UploadButton 
                    endpoint="profileImg"
                    onUploadBegin={() => {
                        setIsUploading(true);
                    }}
                    appearance={{
                        button : imgstyle.uploadBtn,
                        allowedContent : style.hidden,
                    }}
                    content={{
                       button : <img src="edit.png" alt="upload" className={imgstyle.overlay}></img>
                    }}
                    onClientUploadComplete={(res) => {
                        const url = res?.[0]?.ufsUrl;
                        updateTempField("profileImg", url);
                        setIsUploading(false);
                    }}
                    onUploadError={() => {
                        setIsUploading(false);
                    }}
                     />
                </div>



    <div className={imgstyle.nameWrapper}> 
    {!isEdit ? (
        <>
        <div className={imgstyle.nameRow}>
            <p className={imgstyle.firstName}>
                {tempData.firstName || "First Name"}
            </p>
            <p className={imgstyle.lastName}>
                {tempData.lastName || "Last Name"}
            </p>
            </div>
        </>
    ) : (
        <>
            <input
                className={imgstyle.inputName}
                value={tempData.firstName|| ""}
                onChange={(e) => {  
                    const last = tempData.firstName || "";
                    updateTempField("firstName", e.target.value );
                }}
            />

            <input
                className={imgstyle.inputName}
                value={tempData.lastName || ""}
                onChange={(e) => {
                    const first = tempData.lastName || "";
                    updateTempField("lastName", e.target.value);
                }}
            />
        </>
    )}
</div>
            </div>
        </>
    )
}