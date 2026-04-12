'use client';

import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();       //ดึง URL มาเก็บ

  const navLinks = [                    //หน้าเมนูทั้งหมด
    { name: 'Home', href: '/home' },
    { name: 'Skills', href: '/skills' },
    { name: 'Collection', href: '/collection' },
    { name: 'My Resume', href: '/my-resume' },
  ];

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
            
        </ul>

    </nav>
  );
};