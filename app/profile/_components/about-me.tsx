import astyle from "./about-me.module.css"
import pstyle from "../profile.module.css"

export default function AboutMe() {
    return (
        <>
    <div id = "AboutMe-container" className={pstyle.head}  >    
            <h1 >About Me</h1> 
        <div id = "AboutMe-content" className={astyle.aboutMeBox} >
            <div id = "About-Me" className={pstyle.profileSection} >
                
                    <div className={pstyle.Wrapper}>
                        <textarea id="about-me" className={astyle.aboutMe} placeholder="Tell us about yourself" />
                        <img src ="edit.png" alt="edit" className={astyle.aboutMeEdit} />
                    </div>  
            </div>
  
        </div>
    </div>
    </>
  );
}