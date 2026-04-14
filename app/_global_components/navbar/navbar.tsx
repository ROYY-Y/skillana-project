'use client'
import styles from './navbar.module.css';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';


export function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  const decoded = jwtDecode(token!) as { id: string };
   const userID = decoded.id
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userID}`, {
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
      });

      const data = await res.json();
      setImg(data.profileImg);
      setName(data.firstName)
    };

    fetchUser();
  }, []);
  
  return (
    
    <nav className={styles.navbar}>
        <Link href="/home" className={styles.logo}>
            <img src="/SkillAna.png" alt="SkillANA Logo"/>
        </Link>

        <ul className={styles.menu}>
            <li><Link href="/home">Home</Link></li>
            <li><Link href="/">Skills</Link></li>
            <li><Link href="/">My Badges</Link></li>
            <li><Link href="/">My Resume</Link></li>
        </ul>

        <ul className={styles.proflie}>
             <div id="profile-img-wrapper" className={styles.imgWrapper}>
                <Link href="/profile" className={styles.rightSide}>
                   <img src={img || " "} 
                   alt = "profile navbar"
                    className={styles.img}
                   />
                          
                </Link>
               
            </div>
             <span className={styles.name} title={name || ""}>{name}</span>
        </ul>

    </nav>
  );
};