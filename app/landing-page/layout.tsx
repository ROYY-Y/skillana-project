import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "../globals.css";
import styles from "./page.module.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "SkillANA",
  description: "Website for collect Tech Badge and Create a Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
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

            <main>
                {children}
            </main>

            <footer>

            </footer>
        </body>
    </html>
  );
}