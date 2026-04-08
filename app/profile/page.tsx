'use client'
import AboutMe from "./_components/about-me";
import Contact from "./_components/contact"
import Education from "./_components/education";
import Exp from "./_components/experience";
import ProfileImg from "./_components/profile-img";
import Navbar from "../_global_components/authen_pages/login_nav";
import style from "./profile.module.css"
import Popup from "./_components/popup/popup";
import { EditProvider, useEditContext } from "./_components/edit";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";


const ProfileHeader = () => {
  const {isEdit , setEditing} = useEditContext();
  
    return (
      <>
        <div className={style.profileHeader}>
            <ProfileImg />
          
             <div className ={style.editButtonWrapper} style={{visibility : isEdit ? 'hidden' : 'visible' }}>
              <button className={style.editButton} onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          </div>
      </>
    )
}
export default function Profile() {
  
  const [data, setData] = useState<null | any>(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodeToken = token ? jwtDecode(token) : null;
    console.log("Token from localStorage:", token);
    const userId = decodeToken ? (decodeToken as {id : string}).id : null;

     /*if (!token) {
        window.location.href = "/login";
      }*/
    const fetchData = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`,
        }  
      })   
      const profileData  = await res.json();
      setData(profileData);

    }
    catch (error) {
      console.error("Error checking token:", error);
        }
    };
    fetchData();
  }, []);
if (!data) {
    return (
      <div className={style.loadingWrapper}>
        <h1>Loading Profile...</h1>
      </div>
    );
  }
  return (
    
    <>
     
    <EditProvider initialData={data}>
    <Navbar />
      <ProfileHeader />

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
      <Popup />
    </EditProvider>
    
  </>
  );
}