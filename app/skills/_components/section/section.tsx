'use client'

import style from './_components/section.module.css'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ProfileData } from '@/app/profile/_components/edit'
interface Category {
    categoryId : string;
    name : string;
}
export interface BadgeData  {
       _id : string;
       badgeName : string;
       imgUrl : string;
       category : Category;
}


export default function Section() {
    const [badge, setBadge] = useState<BadgeData>();
    const [user, setUser] = useState<ProfileData>();
useEffect(() => {
    const token = localStorage.getItem("token");
        const decodeToken = token ? jwtDecode(token) : null;
        const userId = decodeToken ? (decodeToken as { id: string }).id : null;
    
        if (!token) {
          window.location.replace('/login');
          return;
        }
    try {
        const badgeData = async () => {
            const res = await fetch(`/api/badges`, {
                method : "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            if(res.ok){
                const data = await res.json();
                setBadge(data);
            }
        }
    const userData = async () => {
      if (!userId) return;
            const res = await fetch(`/api/users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (res.ok) {
            const data = await res.json();
                setUser(data);
            }
      
        };
        badgeData();
        userData();
    }
    catch(error){
        console.error(error)
        }
    }, [])

    if(!user || !badge){
        return (
      <div className={style.loadingWrapper}>
        <h1>Loading Profile...</h1>
      </div>
    );
    }
}