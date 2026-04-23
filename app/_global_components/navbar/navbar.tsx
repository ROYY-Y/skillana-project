'use client'
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';


export function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)
  const pathname = usePathname();       //ดึง URL มาเก็บ

  const navLinks = [                    //หน้าเมนูทั้งหมด
    { name: 'Home', href: '/home' },
    { name: 'Skills', href: '/skills' },
    { name: 'Collection', href: '/collections' },
    { name: 'My Resume', href: '/my-resume' },
  ];
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
          {navLinks.map((link) => {           //เปลี่ยน navLink มาแทก li
            const isActive = pathname.startsWith(link.href);    //เช็คURLเริ่มด้วยhrefที่ตรรงกัน

            return (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}    //เพิ่ม .activeตัวที่ทำงาน
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className={styles.proflie}>
             <div id="profile-img-wrapper" className={styles.imgWrapper}>
                <Link href="/profile" >
                   <img src={img || "user.png"} 
                   alt = "profile navbar"
                    className={styles.img}
                   />
            
                </Link>
               
            </div>
             <span className={styles.name} title={name || ""}>{name}</span>
        </ul>
          <footer>
            <footer>
              
            </footer>
          </footer>
    </nav>
  );
    }
