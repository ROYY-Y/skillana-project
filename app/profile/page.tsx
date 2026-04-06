import AboutMe from "./_components/about-me";
import Contact from "./_components/contact"
import Education from "./_components/education";
import Exp from "./_components/experience";
import ProfileImg from "./_components/profile-img";
import Navbar from "../_global_components/authen_pages/login_nav";
import style from "./profile.module.css"

export default function Profile() {
  return (
    <>
    <Navbar />
      <div className={style.profileHeader}>
            <ProfileImg />
      </div>

      <div className={style.mainContainer}>
        <div className={style.generalInfo}>
            <Contact /> 
            <Education />
        </div>

        <div className={style.aboutMe}>
            <AboutMe />
        </div>

        <div className={style.experience}>
            <Exp />
        </div>
         <p className={style.divider}></p>
         <button className={style.logout}>Log Out</button>
      </div>

     
    </>
  );
}