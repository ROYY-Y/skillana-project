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
            <li><Link href="#">How It Works</Link></li>
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

export function Hero_section() {
    return (
        <div className={styles.hero}>
                <h1 className={styles.mainText}>
                    Explore skills. Earn badges. Show your mastery.
                </h1>
            
            <div className={styles.subText}>
                Browse interesting skills, pass a quick test, and get a verified badge to prove your expertise.
            </div>

            <button className={styles.btn}>
                <a href='/create-account'>Start now →</a>
            </button>
        </div>
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

export function CloseSection() {
    return (
        <div className={styles.closeSection}>
            <h2 className={styles.mainText}>
                Ready to Level Up Your Profile?
            </h2>

            <div className={styles.subText}>
                Ready to build your profile? Join SkillANA and start showcasing your skills today.
            </div>
            
            <Link href='' className={styles.btn}>
                Get Started for Free →
            </Link>  {/*ไว้ใส่อนิเม*/}
        </div>
    );
};