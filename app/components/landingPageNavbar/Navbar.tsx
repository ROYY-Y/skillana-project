import styles from './Navbar.module.css';

export default function LandingPageNavbar() {
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
            <li><a href="" className={styles.sign_up}>Sign up</a></li>
            <li>
                <a href=""><button className={styles.login_btn}>Login</button></a>
            </li>
        </ul>

    </nav>
  );
}