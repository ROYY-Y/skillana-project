import imgstyle from './profile-img.module.css'
import { useEditContext } from './edit'

export default function ProfileImg() {

    const {isEdit, updateTempField, tempData} = useEditContext();

    
    return (
        <>
            <div id="profile-container" className={imgstyle.profileContainer}>
                <div id="profile-img-wrapper" className={imgstyle.imgWrapper}>
                    <img src="logo.png" alt="Profile Picture" id="profile-img" className={imgstyle.img} />
                </div>
                <div className={imgstyle.nameWrapper}>
    
    {!isEdit ? (
        <>
            <p className={imgstyle.firstName}>
                {tempData.firstName || "First Name"}
            </p>
            <p className={imgstyle.lastName}>
                {tempData.lastName || "Last Name"}
            </p>
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