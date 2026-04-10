'use client'
import AboutMe from "./_components/aboutme/about-me";
import Contact from "./_components/genInfo/contact"
import Education from "./_components/genInfo/education";
import Exp from "./_components/experience/experience";
import ProfileImg from "./_components/profileImg/profile-img";
import Navbar from "../_global_components/authen_pages/login_nav";
import style from "./profile.module.css"
import Popup from "./_components/popup/popup";
import { EditProvider, useEditContext, ProfileData } from "./_components/edit";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";


const ProfileHeader = () => {
  const {isEdit , setEditing} = useEditContext();
  
    return (
      <>
        <div className={style.profileHeader}>
            <ProfileImg />
          
             <div className ={`${style.editButtonWrapper} ${isEdit ? style.hidden : style.visible}`}>
              <button className={style.editButton} onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          </div>
      </>
    )
}
export default function Profile() {
  
  const [data, setData] = useState<ProfileData | null>(null);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const decodeToken = token ? jwtDecode(token) : null;
    console.log("Token from localStorage:", token);
    const userId = decodeToken ? (decodeToken as {id : string}).id : null;
    
     if (!token) {
        window.location.replace('/login');
      }
    const fetchData = async () => {
      if (!userId) {
      console.warn("No valid user session found.");
      return; 
    }
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`,
        }  
      })   
      if (!res.ok) {
         const errorText = await res.text();
         console.error("API Error:", errorText);
         return;
      }
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
         <button className={style.logout} onClick={() => window.location.replace('/login')}>Log Out</button>
      </div>
      <Popup />
    </EditProvider>
    
  </>
  );
}