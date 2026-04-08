import styles from './landingPage.module.css';
import Link from 'next/link';

export function LandingPageNavbar() {
  return (
    <nav className={styles.navbar}>
        <a href="" className={styles.logo}>
            <img src="/SkillAna.png" alt="SkillANA Logo"/>
        </a>

        <ul className={styles.menu}>
            <li><a href="#">Features</a></li>
            <li><a href="#">Badges</a></li>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">About Us</a></li>
        </ul>

        <ul className={styles.auth_box}>
            <li><Link href="/login" className={styles.sign_up}>Sign up</Link></li>
            <li>
                <Link href="/create-account"><button className={styles.login_btn}>Login</button></Link>
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