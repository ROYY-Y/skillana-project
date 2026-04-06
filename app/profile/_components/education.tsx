import style from "../profile.module.css"


export default function Education() {
  return (
    <>
    <div id = "contact-container" className={style.head}  >    
            <h1 >Education</h1> 
        <div id = "contact-content" className={style.profileBox} >
            <div id = "Education-Level" className={style.profileSection} >
                <h2>Education Level</h2>
                    <div className={style.Wrapper}>
                        <input type="text" id="education" className={style.profileContent} placeholder="Bachelor's Degree" />
                        <img src ="edit.png" alt="edit" className={style.editIcon} />
                    </div>  
            </div>
                

            <div id = "Major" className={style.profileSection} >
                <h2>Major</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="major" className={style.profileContent} placeholder="Computer Science" />
                    <img src ="edit.png" alt="edit" className={style.editIcon} />
                </div>
            </div>


            <div id = "School/University" className={style.profileSection} >
                <h2>School/University</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="school" className={style.profileContent} placeholder="Kmutt" />
                    <img src ="edit.png" alt="edit" className={style.editIcon} />
                </div>
            </div>
        </div>
    </div>
    </>
  );
}