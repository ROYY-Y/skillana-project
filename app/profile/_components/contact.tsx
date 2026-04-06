import style from "../profile.module.css"


export default function Contact() {
  return (
    <>
    <div id = "contact-container" className={style.head}  >    
            <h1 >Contact</h1> 
        <div id = "contact-content" className={style.profileBox} >
            <div id = "Email" className={style.profileSection} >
                <h2>Email</h2>
                    <div className={style.Wrapper}>
                        <input type="email" id="email" className={style.profileContent} placeholder="example@gmail.com" />
                        <img src ="edit.png" alt="edit" className={style.editIcon} />
                    </div>  
            </div>
                

            <div id = "Phone-Number" className={style.profileSection} >
                <h2>Phone Number</h2>
                <div className={style.Wrapper}>
                    <input type="tel" id="phone" className={style.profileContent} placeholder="123-456-7890" />
                    <img src ="edit.png" alt="edit" className={style.editIcon} />
                </div>
            </div>


            <div id = "Address" className={style.profileSection} >
                <h2>Address</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="address" className={style.profileContent} placeholder="123 Main St, City, State 12345" />
                    <img src ="edit.png" alt="edit" className={style.editIcon} />
                </div>
            </div>
        </div>
    </div>
    </>
  );
}