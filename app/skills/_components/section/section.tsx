'use client'

import style from './section.module.css'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

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

interface User {
    _id? : string;
    badges : BadgeData[];
}
type BadgeOwned = BadgeData & {owned : boolean}
type GroupedBadges = Record<
  string,
  {
    categoryName: string;
    badge: BadgeOwned[];
  }
>;



export default function Section() {
    const [badge, setBadge] = useState<(BadgeData & {owned : boolean})[]>([]);
    const [user, setUser] = useState<User>();
    const [group, setGroup] = useState<GroupedBadges>({});
    const [loading, setLoading] = useState<boolean>(true);
  
useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const decodeToken = token ? jwtDecode(token) : null;
        const userId = decodeToken ? (decodeToken as { id: string }).id : null;
    
        if (!token) {
          window.location.replace('/login');
          return;
        }
        if (!userId) return;
    try {
        const [badgeRes, userRes] = await Promise.all([
            fetch('api/badges', {
                method : "GET",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }),
            fetch(`/api/users/${userId}`, {
                method : "GET",
                headers : {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`,
                }
            }
          
        )])
         if (!badgeRes.ok || !userRes.ok){
                 throw new Error("Failed to fetch data");
         }
        const badgeData : BadgeData[] = await badgeRes.json();
        const userData : User = await userRes.json();

        const userBadgeSet = new Set(userData.badges.map(b => b._id))
        const mergeBadge : BadgeOwned[] = badgeData.map((badge : BadgeData ) => ({
                ...badge,
                owned : userBadgeSet.has(badge._id)                        
        }))
        setBadge(mergeBadge);
        setUser(userData);
        
        const groupBadge = mergeBadge.reduce<GroupedBadges>((acc, badge ) => {
                const id = badge.category.categoryId;

                if (!acc[id]) {
                    acc[id] = {
                        categoryName : badge.category.name,
                        badge : []
                    }
                }
                acc[id].badge.push(badge);
                return acc;
            }
            ,{}
        )
        setGroup(groupBadge);
        setLoading(false);
    }
    catch(error){
        console.error(error)
        }
    } 
    fetchData();
}, [])
      if (loading) return <div>Loading...</div>;
    return (
        <>
            {Object.entries(group).map(([id, groupItem]) => (
                <div key={id} className={style.container}>
                    <h2>{groupItem.categoryName}</h2>

                    <div className={style.grid}>
                    {groupItem.badge.map((b) => (
                        <div key={b._id}>
                        <img src={b.imgUrl} alt={b.badgeName} className={style.img} />
                        
                        </div>
                    ))}
                    </div>
                 </div>
            ))}
        </>
    )
  
}