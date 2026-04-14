'use client'
import styles from './navbar.module.css';
import Link from 'next/link';

import { UploadButton } from '@/app/profile/_components/profileImg/upload';

import { useRouter } from 'next/navigation';

export function Navbar() {
  
  const router = useRouter();
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
                    
                    <UploadButton 
                    endpoint="profileImg"
                    onClientUploadComplete={(res) => {
                        router.refresh();
                    }}
                    onUploadError={(error : Error) => {
                          console.error(error);
                    }}
                    

                     />
                </div>
        </ul>

    </nav>
  );
};