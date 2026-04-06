import imgstyle from './profile-img.module.css'


export default function ProfileImg() {
    return (
        <>
            <div id="profile-container" className={imgstyle.profileContainer}>
                <div id="profile-img-wrapper" className={imgstyle.imgWrapper}>
                    <img src="logo.png" alt="Profile Picture" id="profile-img" className={imgstyle.img} />
                </div>
                <div id="profile-name-wrapper" className={imgstyle.nameWrapper}>
                    <p id="profile-name" className={imgstyle.name}>John Doe</p>
                    <img src="edit.png" alt="Edit Profile" id="edit-profile" className={imgstyle.editIcon} />
                </div>
            </div>
        </>
    )
}