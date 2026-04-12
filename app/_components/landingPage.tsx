import styles from './landingPage.module.css';
import Link from 'next/link';

export function LandingPageNavbar() {
  return (
    <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
            <img src="/SkillAna.png" alt="SkillANA Logo"/>
        </Link>

        <ul className={styles.menu}>
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Badges</Link></li>
            <li><Link href="#">How it Works</Link></li>
            <li><Link href="#">About Us</Link></li>
        </ul>

        <ul className={styles.auth_box}>
            <li><Link href="/create-account" className={styles.sign_up}>Sign up</Link></li>
            <li>
                <Link href="/login"><button className={styles.login_btn}>Login</button></Link>
            </li>
        </ul>

    </nav>
  );
};

export function SkillSection() {
    return (
        <div className={styles.skillSection}>
            <h2 className={styles.mainText}>
                Discover new possibilities
            </h2>

            <div className={styles.subText}>
                Browse skills you're interested in and take a quiz to earn your digital badge.
            </div>
            
            <div className={styles.show}>

            </div>  {/*ไว้ใส่อนิเม*/}
        </div>
    );
};