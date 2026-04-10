import styles from './navbar.module.css';
import Link from 'next/link';

export function Navbar() {
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
            
        </ul>

    </nav>
  );
};